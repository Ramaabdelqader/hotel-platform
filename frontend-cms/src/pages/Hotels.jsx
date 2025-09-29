import { useEffect, useState } from "react";
import api from "../api/client";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", city: "", description: "" });

  useEffect(() => {
    loadHotels();
  }, []);

  async function loadHotels() {
    setLoading(true);
    try {
      const { data } = await api.get("/hotels");
      setHotels(data.data);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      await api.put(`/hotels/${editing.id}`, form);
    } else {
      await api.post("/hotels", form);
    }
    setForm({ name: "", city: "", description: "" });
    setEditing(null);
    loadHotels();
  }

  function startEdit(hotel) {
    setEditing(hotel);
    setForm({ name: hotel.name, city: hotel.city, description: hotel.description });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this hotel?")) return;
    await api.delete(`/hotels/${id}`);
    setHotels(hotels.filter((h) => h.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Hotels</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow grid gap-3 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editing ? "Update Hotel" : "Add Hotel"}
        </button>
      </form>

      {/* Hotels list */}
      {loading ? (
        <p>Loading...</p>
      ) : hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <div className="grid gap-3">
          {hotels.map((h) => (
            <div key={h.id} className="border p-4 rounded bg-white shadow flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{h.name}</h2>
                <p className="text-gray-600">{h.city}</p>
                <p className="text-sm text-gray-500">{h.description}</p>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => startEdit(h)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(h.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
