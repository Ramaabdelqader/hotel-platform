import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const [city,setCity] = useState("");
  const [checkIn,setCheckIn] = useState("");
  const [checkOut,setCheckOut] = useState("");
  const [guests,setGuests] = useState(2);
  const nav = useNavigate();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Find your stay</h1>
      <div className="grid gap-3 md:grid-cols-5">
        <input className="border p-2 rounded" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
        <input className="border p-2 rounded" type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
        <input className="border p-2 rounded" type="number" min={1} value={guests} onChange={e=>setGuests(e.target.value)} />
        <button onClick={()=>nav(`/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)} className="bg-black text-white rounded px-4">Search</button>
      </div>
    </div>
  );
}
