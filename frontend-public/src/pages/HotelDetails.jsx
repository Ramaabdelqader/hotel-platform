import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api/client";
import RequireAuth from "../components/RequireAuth";
import { useConfirm } from "../components/ui/confirm-context";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function HotelDetails() {
  const { id } = useParams();
  const q = useQuery();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const confirm = useConfirm();

  useEffect(() => {
    (async () => {
      try {
        const h = await api.get(`/hotels/${id}`);
        setHotel(h.data.data);

        const r = await api.get(`/rooms`, { params: { hotelId: id } });
        setRooms(r.data.data);
      } catch {
        console.error("Failed to fetch hotel details");
      }
    })();
  }, [id]);

  async function book(roomId) {
    const ok = await confirm("Do you want to book this room?", "Confirm Booking");
    if (!ok) return;

    const body = {
      roomId,
      checkIn: q.get("checkIn"),
      checkOut: q.get("checkOut"),
      guests: Number(q.get("guests") || 1),
    };

    try {
      const { data } = await api.post("/bookings", body);
      await confirm(`Status: ${data.data.status}`, "Booking Created");
    } catch {
      await confirm("Something went wrong while booking. Please try again.", "Error");
    }
  }

  if (!hotel) {
    return <p className="p-6 text-center text-gray-500">Loading hotel details...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hotel Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        <p className="text-gray-600">{hotel.address}</p>
        <p className="text-gray-700 mt-4 leading-relaxed">{hotel.description}</p>
      </div>

      {/* Rooms */}
      <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
      <div className="grid gap-6">
        {rooms.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between shadow hover:shadow-lg transition"
          >
            <div>
              <div className="text-lg font-semibold">
                {r.type} — up to {r.capacity} guests
              </div>
              <div className="text-gray-600 mt-1">Base Price: ${r.basePrice}</div>
              {r.seasonalPrices && r.seasonalPrices.length > 0 && (
                <div className="text-sm text-gray-500 mt-2">
                  Seasonal Prices:{" "}
                  {r.seasonalPrices.map((sp, idx) => (
                    <span key={idx} className="mr-2">
                      {sp.season}: ${sp.price}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <RequireAuth>
              <button
                onClick={() => book(r.id)}
                className="mt-4 md:mt-0 bg-myColor hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Book Now
              </button>
            </RequireAuth>
          </div>
        ))}
      </div>
    </div>
  );
}
