import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/cms/Dashboard";
import Hotels from "./pages/cms/Hotels";
import Rooms from "./pages/cms/Rooms";
import Login from "./pages/Login";
import RequireAuth from "./components/ui/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />


        <Route 
          path="/dashboard" 
          element={
            <RequireAuth roles={["ADMIN","MANAGER"]}>
              <Dashboard />
            </RequireAuth>
          } 
        />
        <Route 
          path="/hotels" 
          element={
            <RequireAuth roles={["ADMIN","MANAGER"]}>
              <Hotels />
            </RequireAuth>
          } 
        />
        <Route 
          path="/rooms" 
          element={
            <RequireAuth roles={["ADMIN","MANAGER"]}>
              <Rooms />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
