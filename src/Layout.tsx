import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
        <Navbar />
      </header>

      <main className="flex-1 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
