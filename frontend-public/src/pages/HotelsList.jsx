import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api/client";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function HotelsList() {
  const q = useQuery();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/search/availability", {
          params: {
            city: q.get("city") || "",
            checkIn: q.get("checkIn"),
            checkOut: q.get("checkOut"),
            guests: q.get("guests"),
          },
        });
        setItems(data.data || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [q]);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading hotels...</p>;
  }

  if (!items.length) {
    return <p className="p-6 text-center text-gray-500">No results found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Hotels</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const hotel = it.hotel || it; // normalize structure
          return (
            <div
              key={hotel.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Hotel image (fallback placeholder) */}
              <img
                src={
                  hotel.coverImage ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                }
                alt={hotel.name}
                className="h-40 w-full object-cover"
              />

              {/* Hotel content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{hotel.city}</p>
                <p className="text-gray-700 text-sm flex-1">
                  {hotel.description?.slice(0, 100)}...
                </p>

                <Link
                  to={`/hotels/${hotel.id}${location.search}`}
                  className="mt-4 inline-block bg-myColor text-white text-sm font-medium px-4 py-2 rounded hover:bg-hoverColor transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
