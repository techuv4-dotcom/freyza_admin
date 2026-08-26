import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        {/* Notification */}
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700" /> */}
          <img
            src="/logo.png" // Replace with your image path or URL
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
