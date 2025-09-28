import Nav from "./nav";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { ConfirmProvider } from "./ui/confirmProvider";

export default function Layout() {
  return (
    <ConfirmProvider>
      <div className="flex flex-col min-h-screen">
        <header>
          <Nav />
        </header>
        <main className="flex-1" role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ConfirmProvider>
  );
}
