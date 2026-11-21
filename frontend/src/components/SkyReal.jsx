import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, Compass, Heart, MapPin, Moon, Sun, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { hotelAPI, bookingAPI } from "../services/api";

function dateAfter(value, days = 1) {
  const date = new Date(value + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
function today() {
  const now = new Date();
  return new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function Checkout({ hotel, trip, update, close }) {
  const dialog = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);
  useEffect(() => { const node = dialog.current; node.showModal(); return () => node.close(); }, []);
  const nights = (Date.parse(trip.checkOut) - Date.parse(trip.checkIn)) / 86400000;
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const details = Object.fromEntries(new FormData(event.currentTarget));
      const { data } = await bookingAPI.createGuestBooking({ ...details, ...trip, hotelId: hotel.id });
      setReceipt(data.booking);
    } catch (err) { setError(err.response?.data?.error || "We couldn’t confirm your booking. Please try again."); }
    finally { setBusy(false); }
  }
  return <dialog ref={dialog} aria-labelledby="booking-title" onCancel={e => { e.preventDefault(); if (!busy) close(); }}>
    <button className="close" aria-label="Close booking" disabled={busy} onClick={close}><X/></button>
    <small>{receipt ? "RESERVATION" : hotel.location}</small>
    <h2 id="booking-title">{receipt ? "Your stay is confirmed." : hotel.name}</h2>
    {receipt ? <><p>{receipt.guestName}, your reservation at {receipt.hotelName} is confirmed.</p>
      <dl>{Object.entries({Reference: receipt.bookingId, Arrival: receipt.checkIn, Departure: receipt.checkOut, Guests: receipt.guests, Total: "$" + receipt.totalPrice}).map(([key,value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
      <button className="primary" onClick={close}>Back to stays <ArrowRight/></button></> :
      <form onSubmit={submit}><TripFields trip={trip} update={update}/>
      <label>Full name<input name="guestName" required autoComplete="name"/></label>
      <label>Email address<input name="email" required type="email" autoComplete="email"/></label>
      <label>Phone number<input name="phone" required type="tel" autoComplete="tel"/></label>
      <div className="total"><span>{nights} nights × ${hotel.price}</span><strong>${nights * hotel.price}</strong></div>
      {error && <p role="alert">{error}</p>}<button className="primary" disabled={busy}>{busy ? "Confirming…" : "Confirm reservation"} <Check/></button></form>}
  </dialog>;
}
function TripFields({ trip, update }) {
  return <><label>Check-in<input required type="date" min={today()} value={trip.checkIn} onChange={e => e.target.value && update("checkIn", e.target.value)}/></label>
  <label>Check-out<input required type="date" min={dateAfter(trip.checkIn)} value={trip.checkOut} onChange={e => e.target.value && update("checkOut", e.target.value)}/></label>
  <label>Guests<select value={trip.guests} onChange={e => update("guests", Number(e.target.value))}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}</select></label></>;
}

export default function SkyReal() {
  const [hotels, setHotels] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, retry] = useState(0);
  const [saved, setSaved] = useState(() => {
    try { const ids = JSON.parse(localStorage.getItem("skyreal.saved")); return Array.isArray(ids) ? ids : []; } catch { return []; }
  });
  const [savedOnly, setSavedOnly] = useState(false);
  const [query, search] = useState("");
  const [filters, showFilters] = useState(false);
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState(0);
  const [selected, select] = useState(null);
  const [trip, setTrip] = useState(() => ({ checkIn: dateAfter(today()), checkOut: dateAfter(today(), 2), guests: 2 }));
  const [featureIndex, setFeatureIndex] = useState(0);
  const feature = hotels[featureIndex];
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("skyreal.theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch { /* Use the device preference when storage is unavailable. */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("skyreal.theme", next); } catch { /* Session only. */ }
  }
  const list = useRef(null);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function toggleSaved(hotel) {
    const removing = saved.includes(hotel.id);
    setSaved(ids => ids.includes(hotel.id)
      ? ids.filter(id => id !== hotel.id)
      : [...ids, hotel.id]);
    setToast({ message: hotel.name + (removing
      ? " removed from your wishlist."
      : " added to your wishlist.") });
  }
  useEffect(() => {
    let active = true;
    hotelAPI.getHotels().then(({data}) => { if (active) { setHotels(data.hotels); setStatus("ready"); } })
      .catch(() => { if (active) setStatus("error"); });
    return () => { active = false; };
  }, [attempt]);
  useEffect(() => { try { localStorage.setItem("skyreal.saved", JSON.stringify(saved)); } catch { /* Session-only storage */ } }, [saved]);
  function update(key, value) {
    setTrip(prev => ({ ...prev, [key]: value, ...(key === "checkIn" && value >= prev.checkOut ? {checkOut: dateAfter(value)} : {}) }));
  }
  function changeView(only) { setSavedOnly(only); search(""); setPrice(1000); setRating(0); showFilters(false); window.scrollTo(0,0); }
  const results = hotels.filter(h => (!savedOnly || saved.includes(h.id)) && (h.name + " " + h.location).toLowerCase().includes(query.trim().toLowerCase()) && h.price <= price && h.rating >= rating);
  return <div className="site"><header><nav><button className="brand" onClick={() => changeView(false)}><Compass/> Sky Real</button>
    <div className="navlinks"><button aria-current={!savedOnly ? "page" : undefined} onClick={() => changeView(false)}>Explore stays</button><button aria-current={savedOnly ? "page" : undefined} onClick={() => changeView(true)}><Heart size={16}/> Saved ({saved.length})</button><button className="theme-toggle" aria-label="Dark mode" aria-pressed={theme === "dark"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button></div></nav></header>
    <main>{!savedOnly && <section className="hero">
      <div className="intro"><h1>A place <br/>to <em>stay.</em></h1>
      <p>Find a room by the water, a lodge in the mountains, or an address in the city.</p>
      <a href="#collection">Browse stays <ArrowDown size={16}/></a></div>
      <div className="cover">{feature && <><img src={feature.image} alt={feature.name}/>
        <div className="feature-caption"><button className="feature-book" onClick={() => select(feature)}><small>{feature.location}</small>{feature.name}</button>
        <button className="next" aria-label="Show next featured property" onClick={() => setFeatureIndex(i => (i+1)%hotels.length)}><ArrowRight size={20}/></button></div></>}</div></section>}
    <form className="searchbar" onSubmit={e => { e.preventDefault(); list.current.scrollIntoView({behavior:"smooth"}); }}>
      <label>Destination<input type="search" placeholder="City, country or property" value={query} onChange={e => search(e.target.value)}/></label>
      <TripFields trip={trip} update={update}/><button className="primary"><Search size={17}/> Search</button></form>
    <section id="collection" ref={list}><div className="collection-head"><div><small>{results.length} {results.length === 1 ? "PROPERTY" : "PROPERTIES"}</small><h2>{savedOnly ? "Your saved stays" : "Browse the stays"}</h2></div>
    <button className="filter" aria-expanded={filters} onClick={() => showFilters(!filters)}><SlidersHorizontal size={16}/> Filters{price < 1000 || rating > 0 ? " •" : ""}</button></div>
    {filters && <div className="filters"><label>Nightly budget · ${price}<input type="range" max="1000" min="0" value={price} onChange={e => setPrice(+e.target.value)}/></label>
    <label>Minimum rating<select value={rating} onChange={e => setRating(+e.target.value)}>{[0,4,4.5,4.8].map(n => <option key={n} value={n}>{n || "Any"}</option>)}</select></label></div>}
    {status === "loading" ? <p role="status">Loading stays…</p> : status === "error" ? <p role="alert">The directory couldn’t load. <button onClick={() => {setStatus("loading"); retry(attempt+1);}}>Try again</button></p> : !results.length ? <p>{savedOnly && !saved.length ? "Tap the heart on a property to save it here." : "No properties match your search. Try another destination or adjust your filters."}</p> : <div className="grid">{results.map(h => <article key={h.id}>
    <div className="photo"><img src={h.image} alt={h.name} loading="lazy"/><button aria-label={'Save '+h.name} aria-pressed={saved.includes(h.id)} onClick={() => toggleSaved(h)}><Heart size={17} fill={saved.includes(h.id) ? "currentColor" : "none"}/></button></div>
    <div className="meta"><span><MapPin size={13}/>{h.location}</span><span title={h.reviews + " reviews"}><Star size={13} fill="currentColor"/>{h.rating.toFixed(1)}</span></div>
    <h3>{h.name}</h3><p>{h.description}</p><div className="amenities">{h.amenities.join(" · ")}</div><div className="rate"><span><strong>${h.price}</strong> / night</span><button onClick={() => select(h)}>Book stay <ArrowRight size={16}/></button></div></article>)}</div>}</section></main>
    <div className="wishlist-toast" role="status">{toast?.message}</div>
    <a className="whatsapp-link" href="https://wa.me/917902360099" target="_blank" rel="noopener noreferrer" aria-label="Chat with Sky Real on WhatsApp" title="Chat on WhatsApp">
      <FaWhatsapp size={27} aria-hidden="true"/>
    </a>
    <footer><span className="brand"><Compass/> Sky Real</span><span>© {new Date().getFullYear()} Sky Real</span></footer>
    {selected && <Checkout hotel={selected} trip={trip} update={update} close={() => select(null)}/>}</div>;
}

