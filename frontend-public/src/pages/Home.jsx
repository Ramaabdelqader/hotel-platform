import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const nav = useNavigate();

  const handleSearch = () => {
    nav(
      `/hotels?city=${encodeURIComponent(city)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover the best hotels worldwide. Book easily and travel
            stress-free.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg grid gap-3 md:grid-cols-5 p-4 text-black max-w-4xl mx-auto">
            <input
              className="border p-2 rounded"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="border p-2 rounded"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              className="border p-2 rounded"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <input
              className="border p-2 rounded"
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-myColor text-white rounded px-4 hover:bg-hoverColor transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">Wide Selection</h3>
          <p className="text-gray-600">
            From luxury resorts to cozy stays, explore hotels across the globe.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
          <p className="text-gray-600">
            Seamless reservation process with instant confirmation.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
          <p className="text-gray-600">
            Enjoy competitive rates and exclusive offers for your trips.
          </p>
        </div>
      </div>
    </div>
  );
}
