import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api/client";
import RequireAuth from "../components/RequireAuth";
import { useConfirm } from "../components/ui/confirm-context";

function useQuery() { return new URLSearchParams(useLocation().search); }

export default function HotelDetails() {
  const { id } = useParams();
  const q = useQuery();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const confirm = useConfirm();

  useEffect(() => { (async () => {
    const h = await api.get(`/hotels/${id}`);
    setHotel(h.data.data);
    const r = await api.get(`/rooms`, { params: { hotelId: id } });
    setRooms(r.data.data);
  })(); }, [id]);

  async function book(roomId) {
    const ok = await confirm({ title: "Confirm Booking", message: "Do you want to book this room?" });
    if (!ok) return;

    const body = {
      roomId,
      checkIn: q.get("checkIn"),
      checkOut: q.get("checkOut"),
      guests: Number(q.get("guests") || 1)
    };
    const { data } = await api.post("/bookings", body);
    await confirm({ title: "Booking Created", message: `Status: ${data.data.status}` });
  }

  if (!hotel) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{hotel.name}</h1>
      <p className="mb-3">{hotel.address}</p>
      <div className="grid gap-3">
        {rooms.map(r => (
          <div key={r.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{r.type} — up to {r.capacity} guests</div>
              <div className="text-sm">Base: ${r.basePrice}</div>
            </div>
            <RequireAuth>
              <button onClick={() => book(r.id)} className="bg-black text-white px-3 py-1 rounded">
                Book
              </button>
            </RequireAuth>
          </div>
        ))}
      </div>
    </div>
  );
}
