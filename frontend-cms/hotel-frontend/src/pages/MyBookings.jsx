import { useEffect, useState } from "react";
import api from "../api/client";

export default function MyBookings(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ (async()=>{
    const { data } = await api.get("/bookings/mine");
    setItems(data.data);
  })(); },[]);
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      <div className="grid gap-3">
        {items.map(b=>(
          <div key={b.id} className="border rounded p-3">
            <div>Booking #{b.id} — Room {b.roomId}</div>
            <div>{b.checkIn} → {b.checkOut} — {b.status} — ${b.totalPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
