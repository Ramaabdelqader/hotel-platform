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
          guests: q.get("guests")
        }
      });
      setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  })();
}, [q]);


  if (loading) return <p className="p-6">Loading...</p>;
  if (!items.length) return <p className="p-6">No results found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Hotels</h2>
      <div className="grid gap-4">
        {items.map((it) => (
          <div
            key={it.id || it.hotel?.id}
            className="border rounded p-4"
          >
            <h3 className="font-bold">
              {it.name || it.hotel?.name} — {it.city || it.hotel?.city}
            </h3>
            <p className="text-sm">
              {it.description || it.hotel?.description}
            </p>
            <Link
              className="text-blue-600 underline"
              to={`/hotels/${it.id || it.hotel?.id}${location.search}`}
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
