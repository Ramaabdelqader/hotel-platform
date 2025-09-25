import { useEffect, useState } from "react";
import api from "../api/client";
import { useConfirm } from "../components/ui/confirm-context";

export default function MyBookings() {
  const [items, setItems] = useState([]);
  const confirm = useConfirm();

  useEffect(() => { (async () => {
    const { data } = await api.get("/bookings/mine");
    setItems(data.data);
  })(); }, []);

  async function cancelBooking(id) {
    const ok = await confirm({ title: "Cancel Booking", message: "Are you sure you want to cancel this booking?", variant: "danger" });
    if (!ok) return;
    await api.post(`/bookings/${id}/cancel`);
    setItems(items.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b));
  }

  if (!items.length) return <p className="p-6">You don’t have any bookings yet.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      <div className="grid gap-3">
        {items.map(b => (
          <div key={b.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <div>Booking #{b.id} — Room {b.roomId}</div>
              <div>{b.checkIn} → {b.checkOut} — {b.status} — ${b.totalPrice}</div>
            </div>
            {b.status === "PENDING" && (
              <button onClick={() => cancelBooking(b.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
