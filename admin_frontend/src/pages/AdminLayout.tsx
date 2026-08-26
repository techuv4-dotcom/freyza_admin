import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-40 flex h-16 w-full items-center bg-white px-4 shadow-sm lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <h1 className="ml-3 text-xl font-semibold text-[#C8A86B]">FREYZA</h1>
      </div>

      <main className="min-h-screen pt-16 lg:ml-[280px] lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
