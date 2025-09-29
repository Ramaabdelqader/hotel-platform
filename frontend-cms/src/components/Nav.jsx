import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">CMS Panel</div>
      <div className="space-x-6">
        <Link to="/">Dashboard</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/bookings">Bookings</Link>
        {user?.role === "ADMIN" && <Link to="/users">Users</Link>}
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
