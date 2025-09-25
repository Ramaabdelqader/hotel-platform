import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api/client";

function useQuery(){ return new URLSearchParams(useLocation().search); }

export default function HotelDetails(){
  const { id } = useParams();
  const q = useQuery();
  const [hotel,setHotel] = useState(null);
  const [rooms,setRooms] = useState([]);

  useEffect(()=>{ (async()=>{
    const h = await api.get(`/hotels/${id}`);
    setHotel(h.data.data);
    const r = await api.get(`/rooms`, { params:{ hotelId:id }});
    setRooms(r.data.data);
  })(); },[id]);

  async function book(roomId){
    const body = {
      roomId,
      checkIn: q.get("checkIn"),
      checkOut: q.get("checkOut"),
      guests: Number(q.get("guests") || 1)
    };
    const { data } = await api.post("/bookings", body);
    alert("Booking created (status " + data.data.status + ")");
  }

  if(!hotel) return null;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{hotel.name}</h1>
      <p className="mb-3">{hotel.address}</p>
      <div className="grid gap-3">
        {rooms.map(r=>(
          <div key={r.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{r.type} — up to {r.capacity} guests</div>
              <div className="text-sm">Base: ${r.basePrice}</div>
            </div>
            <button onClick={()=>book(r.id)} className="bg-black text-white px-3 py-1 rounded">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}
