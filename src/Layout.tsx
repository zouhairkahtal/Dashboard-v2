import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

export function Layout() {
  return (
    <div className="h-screen flex flex-col bg-no-repeat bg-center bg-cover ">
      <header className="relative z-50 mt-5 w-full">
        <Navbar />
      </header>

      <main className="flex-1 overflow-auto  flex items-center justify-center  ">
        <Outlet />
      </main>
    </div>
  );
}
