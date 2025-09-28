import { useEffect, useState } from "react";
import api from "../api/client";
import { useConfirm } from "../components/ui/confirm-context";

export default function MyBookings() {
  const [items, setItems] = useState([]);
  const confirm = useConfirm();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/bookings/mine");
        setItems(data.data || []);
      } catch {
        setItems([]);
      }
    })();
  }, []);

  async function cancelBooking(id) {
    const ok = await confirm(
      "Are you sure you want to cancel this booking?",
      "Cancel Booking"
    );
    if (!ok) return;

    await api.post(`/bookings/${id}/cancel`);
    setItems((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "CANCELLED" } : b
      )
    );
  }

  if (!items.length) {
    return (
      <p className="p-6 text-center text-gray-600">
        You don’t have any bookings yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-6">
        {items.map((b) => (
          <div
            key={b.id}
            className="border rounded-lg p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition"
          >
            <div>
              <div className="font-semibold text-lg">
                Booking #{b.id} — Room {b.roomId}
              </div>
              <div className="text-gray-600 mt-1">
                {b.checkIn} → {b.checkOut}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    b.status === "CONFIRMED"
                      ? "text-green-600"
                      : b.status === "CANCELLED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <div className="text-gray-700 mt-1">Total: ${b.totalPrice}</div>
            </div>

            {b.status === "PENDING" && (
              <button
                onClick={() => cancelBooking(b.id)}
                className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
