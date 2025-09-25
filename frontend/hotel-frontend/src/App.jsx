// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/footer";
import ConfirmProvider from "./components/ui/confirmProvider";
import Home from "./pages/Home.jsx";
import HotelsList from "./pages/HotelsList.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Dashboard from "./pages/cms/Dashboard.jsx";
import useAuth from "./hooks/useAuth";



export default function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      {/* FULL-HEIGHT PAGE LAYOUT */}
      <div className="min-h-screen flex flex-col">
        <Nav user={user} onLogout={logout} />

        {/* MAIN CONTENT GROWS TO PUSH FOOTER DOWN */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelsList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user && <Route path="/my-bookings" element={<MyBookings />} />}
            {user && user.role !== "VIEWER" && (
              <Route path="/cms" element={<Dashboard />} />
            )}
          </Routes>
        </main>

        {/* FOOTER ALWAYS AT BOTTOM */}
        <Footer />
      </div>
    </Router>
  );
}
