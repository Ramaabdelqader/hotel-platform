import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import HotelsList from "./pages/HotelsList";
import HotelDetails from "./pages/HotelDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/register";
import MyBookings from "./pages/MyBookings";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<HotelsList />} />
          <Route path="hotels/:id" element={<HotelDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="my-bookings"
            element={
              <RequireAuth>
                <MyBookings />
              </RequireAuth>
            }
          />
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
