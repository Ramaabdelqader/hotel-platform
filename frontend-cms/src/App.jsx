import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth roles={["ADMIN", "MANAGER"]}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="hotels"
            element={
              <RequireAuth roles={["ADMIN", "MANAGER"]}>
                <Hotels />
              </RequireAuth>
            }
          />
          <Route
            path="rooms"
            element={
              <RequireAuth roles={["ADMIN", "MANAGER"]}>
                <Rooms />
              </RequireAuth>
            }
          />
          <Route
            path="bookings"
            element={
              <RequireAuth roles={["ADMIN", "MANAGER"]}>
                <Bookings />
              </RequireAuth>
            }
          />
          <Route
            path="users"
            element={
              <RequireAuth roles={["ADMIN"]}>
                <Users />
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
