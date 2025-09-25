import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { useConfirm } from "./ui/confirm-context";



export default function Nav() {
  const { user, logout } = useAuth();
  const confirm = useConfirm();

  async function handleLogout() {
    const ok = await confirm({
      title: "Logout",
      message: "Are you sure you want to log out?",
      confirmText: "Yes, Logout",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (ok) logout();
  }

  return (
    <nav className="w-full bg-gray-900 text-gray-200 shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        <Link to="/">StayEase</Link>
      </div>

      {/* Links */}
      <div className="space-x-6">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/hotels" className="hover:text-white transition">Hotels</Link>
        <Link to="/about" className="hover:text-white transition">About</Link>
        <Link to="/contact" className="hover:text-white transition">Contact</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-white transition">Login</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/my-bookings" className="hover:text-white transition">My Bookings</Link>
            {user.role !== "VIEWER" && (
              <Link to="/cms" className="hover:text-white transition">CMS</Link>
            )}
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
