// import {
//   LayoutDashboard,
//   CalendarDays,
//   Scissors,
//   ClipboardList,
//   Users,
//   UserCog,
//   Settings,
//   Image,
//   Info,
//   ChevronDown,
//   ChevronRight,
//   Globe,
//   Contact,
//   TvMinimalPlay,
//   Layers3,
//   HomeIcon,
//   KeyRound,
//   ShieldCheck,
//   User,
//   GraduationCap,
//   NotebookPen,
//   Menu,
//   X,
//   MessageSquareText,
// } from "lucide-react";

// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface SidebarProps {
//   mobileOpen: boolean;
//   setMobileOpen: (value: boolean) => void;
// }

// const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
//   const [websiteOpen, setWebsiteOpen] = useState(false);
//   const [collageOpen, setCollageOpen] = useState(false);
//   const [customerOpen, setCustomerOpen] = useState(false);
//   const [rolePermisions, setRolePermissions] = useState(false);

//   // const [mobileOpen, setMobileOpen] = useState(false);

//   const { hasPermission } = useAuth();

//   const name = localStorage.getItem("userName");
//   const role = localStorage.getItem("userRole");

//   // Close sidebar on mobile after navigation
//   const handleMobileNavigation = () => {
//     setMobileOpen(false);
//   };

//   return (
//     <>
//       {/* ================= MOBILE HEADER ================= */}
//       <div className="fixed left-0 top-0 z-[60] flex h-16 w-full items-center bg-white px-4 shadow-sm lg:hidden">
//         <button
//           type="button"
//           onClick={() => setMobileOpen(true)}
//           className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
//         >
//           <Menu size={24} />
//         </button>

//         <div className="ml-3">
//           <h1 className="text-xl font-serif font-semibold text-[#C8A86B]">
//             FREYZA
//           </h1>

//           <p className="text-[8px] tracking-[3px] text-gray-500">
//             Luxury salon
//           </p>
//         </div>
//       </div>

//       {/* ================= MOBILE OVERLAY ================= */}
//       {/* {mobileOpen && (
//         <div
//           onClick={() => setMobileOpen(false)}
//           className="fixed inset-0 z-40 bg-black/50 lg:hidden"
//         />
//       )} */}

//       {mobileOpen && (
//         <div
//           onClick={() => setMobileOpen(false)}
//           className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/50 lg:hidden"
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}
//       {/* <aside
//         className={`
//           fixed left-0 top-0 z-50
//           flex h-screen w-[280px] flex-col
//           bg-[#0B0E1C] text-white
//           transition-transform duration-300 ease-in-out

//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0
//         `}
//       > */}

//       <aside
//         className={`
//     fixed left-0
//     z-50
//     w-[280px]
//     bg-[#0B0E1C] text-white
//     flex flex-col
//     transition-transform duration-300 ease-in-out

//     top-16 h-[calc(100vh-4rem)]

//     lg:top-0
//     lg:h-screen
//     lg:translate-x-0

//     ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//   `}
//       >
//         {/* ================= LOGO ================= */}
//         <div className="flex items-start justify-between border-b border-white/10 px-8 pb-6 pt-8">
//           <div>
//             <h1
//               className="text-5xl text-[#C8A86B]"
//               style={{
//                 fontFamily: "serif",
//               }}
//             >
//               FREYZA
//             </h1>

//             <p className="mt-2 text-xs tracking-[4px] text-[#D8C8A2]">
//               Luxury salon
//             </p>
//           </div>

//           {/* Mobile Close Button */}
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* ================= MENU ================= */}
//         <nav className="hide-scrollbar flex-1 min-h-0 overflow-y-auto">
//           <ul className="space-y-3 px-4 py-6">
//             {/* ================= DASHBOARD ================= */}
//             {hasPermission("dashboard", "read") && (
//               <li>
//                 <NavLink
//                   to="/dashboard"
//                   onClick={handleMobileNavigation}
//                   className={({ isActive }) =>
//                     `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                       isActive
//                         ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                         : "text-[#E7D4A2] hover:bg-white/5"
//                     }`
//                   }
//                 >
//                   <LayoutDashboard size={18} />
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}

//             {/* ================= ROLE PERMISSIONS ================= */}
//             <li>
//               <div>
//                 {(hasPermission("permissions", "read") ||
//                   hasPermission("role", "read")) && (
//                   <button
//                     onClick={() => setRolePermissions(!rolePermisions)}
//                     className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#E7D4A2] hover:bg-white/5"
//                   >
//                     <KeyRound size={18} />

//                     <span className="flex-1 text-left">Role Permissions</span>

//                     {rolePermisions ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}
//                   </button>
//                 )}

//                 {rolePermisions && (
//                   <div className="ml-3 space-y-1">
//                     {hasPermission("permissions", "read") && (
//                       <NavLink
//                         to="/permissions"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <ShieldCheck size={18} />
//                         Permissions
//                       </NavLink>
//                     )}

//                     {hasPermission("role", "read") && (
//                       <NavLink
//                         to="/role"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <User size={18} />
//                         Role
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>

//             {/* ================= USERS ================= */}
//             <li>
//               {hasPermission("users", "read") && (
//                 <NavLink
//                   to="/staff"
//                   onClick={handleMobileNavigation}
//                   className={({ isActive }) =>
//                     `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                       isActive
//                         ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                         : "text-[#E7D4A2] hover:bg-white/5"
//                     }`
//                   }
//                 >
//                   <UserCog size={18} />
//                   Users
//                 </NavLink>
//               )}
//             </li>

//             {/* ================= COLLAGE ================= */}
//             <li>
//               <div>
//                 {hasPermission("course", "read") && (
//                   <button
//                     onClick={() => setCollageOpen(!collageOpen)}
//                     className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#E7D4A2] hover:bg-white/5"
//                   >
//                     <GraduationCap size={18} />

//                     <span className="flex-1 text-left">Collage</span>

//                     {collageOpen ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}
//                   </button>
//                 )}

//                 {collageOpen && (
//                   <div className="ml-3 space-y-1">
//                     {hasPermission("course", "read") && (
//                       <NavLink
//                         to="/course"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <NotebookPen size={18} />
//                         Course
//                       </NavLink>
//                     )}
//                   </div>
//                 )}

//                 {collageOpen && (
//                   <div className="ml-3 space-y-1">
//                     {hasPermission("quary", "read") && (
//                       <NavLink
//                         to="/Querys"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <MessageSquareText size={18} />
//                         Querys
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>

//             {/* ================= WEBSITE MANAGEMENT ================= */}
//             <li>
//               <div>
//                 {(hasPermission("home", "read") ||
//                   hasPermission("about", "read") ||
//                   hasPermission("category", "read") ||
//                   hasPermission("services", "read") ||
//                   hasPermission("gallary", "read") ||
//                   hasPermission("blog", "read") ||
//                   hasPermission("contactus", "read")) && (
//                   <button
//                     onClick={() => setWebsiteOpen(!websiteOpen)}
//                     className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#E7D4A2] hover:bg-white/5"
//                   >
//                     <Globe size={18} />

//                     <span className="flex-1 text-left">Website Management</span>

//                     {websiteOpen ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}
//                   </button>
//                 )}

//                 {websiteOpen && (
//                   <div className="ml-3 space-y-1">
//                     {hasPermission("home", "read") && (
//                       <NavLink
//                         to="/home"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <HomeIcon size={18} />
//                         Home
//                       </NavLink>
//                     )}

//                     {hasPermission("about", "read") && (
//                       <NavLink
//                         to="/about"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <Info size={18} />
//                         About
//                       </NavLink>
//                     )}

//                     {hasPermission("category", "read") && (
//                       <NavLink
//                         to="/servicesCategory"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <Layers3 size={20} />
//                         Category
//                       </NavLink>
//                     )}

//                     {hasPermission("services", "read") && (
//                       <NavLink
//                         to="/services"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <Scissors size={18} />
//                         Services
//                       </NavLink>
//                     )}

//                     {hasPermission("gallary", "read") && (
//                       <NavLink
//                         to="/gallary"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <Image size={18} />
//                         Gallary
//                       </NavLink>
//                     )}

//                     {hasPermission("blog", "read") && (
//                       <NavLink
//                         to="/blogpage"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <TvMinimalPlay size={18} />
//                         Blog
//                       </NavLink>
//                     )}

//                     {hasPermission("contactus", "read") && (
//                       <NavLink
//                         to="/contactUs"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <Contact size={18} />
//                         ContactUs
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>

//             {/* ================= CUSTOMER MANAGEMENT ================= */}
//             <li>
//               <div>
//                 {(hasPermission("servicerequest", "read") ||
//                   hasPermission("bookings", "read") ||
//                   hasPermission("subscribers", "read")) && (
//                   <button
//                     onClick={() => setCustomerOpen(!customerOpen)}
//                     className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#E7D4A2] hover:bg-white/5"
//                   >
//                     <Users size={18} />

//                     <span className="flex-1 text-left">
//                       Customer management
//                     </span>

//                     {customerOpen ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}
//                   </button>
//                 )}

//                 {customerOpen && (
//                   <div className="ml-3 space-y-1">
//                     {hasPermission("servicerequest", "read") && (
//                       <NavLink
//                         to="/serviceReqests"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <ClipboardList size={18} />
//                         Service Requests
//                       </NavLink>
//                     )}

//                     {hasPermission("bookings", "read") && (
//                       <NavLink
//                         to="/bookings"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <CalendarDays size={18} />
//                         Bookings
//                       </NavLink>
//                     )}

//                     {hasPermission("subscribers", "read") && (
//                       <NavLink
//                         to="/subscribers"
//                         onClick={handleMobileNavigation}
//                         className={({ isActive }) =>
//                           `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                               : "text-[#E7D4A2] hover:bg-white/5"
//                           }`
//                         }
//                       >
//                         <Users size={18} />
//                         Subscribers
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>

//             {/* ================= SETTINGS ================= */}
//             <li>
//               <NavLink
//                 to="/settings"
//                 onClick={handleMobileNavigation}
//                 className={({ isActive }) =>
//                   `flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
//                     isActive
//                       ? "bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] text-white"
//                       : "text-[#E7D4A2] hover:bg-white/5"
//                   }`
//                 }
//               >
//                 <Settings size={18} />
//                 Settings
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         {/* ================= ADMIN PROFILE ================= */}
//         <div className="p-4">
//           <div className="flex items-center gap-3 rounded-2xl border border-white/10 p-4">
//             <img
//               src="/logoOrg.jpeg"
//               alt="Profile"
//               className="h-12 w-12 rounded-full object-cover"
//             />

//             <div className="min-w-0">
//               <h4 className="truncate font-medium">{name}</h4>

//               <p className="truncate text-xs text-gray-400">{role}</p>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  ClipboardList,
  Users,
  UserCog,
  Settings,
  Image,
  Info,
  ChevronDown,
  ChevronRight,
  Globe,
  Contact,
  TvMinimalPlay,
  Layers3,
  HomeIcon,
  KeyRound,
  ShieldCheck,
  User,
  GraduationCap,
  NotebookPen,
  Menu,
  X,
  MessageSquareText,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [collageOpen, setCollageOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [rolePermisions, setRolePermissions] = useState(false);

  const { hasPermission } = useAuth();

  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  const handleMobileNavigation = () => {
    setMobileOpen(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Main Navigation Style
  |--------------------------------------------------------------------------
  */

  const navItemClass = ({ isActive }: { isActive: boolean }) => `
    group relative flex w-full items-center gap-3
    rounded-xl px-4 py-3.5
    text-[16px] font-medium
    tracking-[0.1px]
    transition-all duration-200

    ${
      isActive
        ? `
          bg-gradient-to-r
          from-[#5A2D82]
          to-[#7C3AED]
          text-white
          shadow-[0_6px_18px_rgba(124,58,237,0.20)]
        `
        : `
          text-[#F1E7D0]
          hover:bg-white/[0.06]
          hover:text-white
          hover:translate-x-[1px]
        `
    }
  `;

  /*
  |--------------------------------------------------------------------------
  | Parent Dropdown Style
  |--------------------------------------------------------------------------
  */

  const parentClass = (isOpen: boolean) => `
    group flex w-full items-center gap-3
    rounded-xl px-4 py-3.5
    text-[16px] font-medium
    tracking-[0.1px]
    transition-all duration-200

    ${
      isOpen
        ? `
          bg-white/[0.08]
          text-white
          shadow-inner
        `
        : `
          text-[#F1E7D0]
          hover:bg-white/[0.06]
          hover:text-white
          hover:translate-x-[1px]
        `
    }
  `;

  /*
  |--------------------------------------------------------------------------
  | Submenu Style
  |--------------------------------------------------------------------------
  */

  const subNavClass = ({ isActive }: { isActive: boolean }) => `
    group relative flex w-full items-center gap-3
    rounded-lg px-3.5 py-3
    text-[15px] font-medium
    transition-all duration-200

    ${
      isActive
        ? `
          bg-gradient-to-r
          from-[#5A2D82]
          to-[#7C3AED]
          text-white
          shadow-[0_4px_14px_rgba(124,58,237,0.18)]

          before:absolute
          before:-left-[17px]
          before:h-6
          before:w-[3px]
          before:rounded-full
          before:bg-[#D8B978]
        `
        : `
          text-[#D8CDB9]
          hover:bg-white/[0.05]
          hover:text-[#FFF8E9]
          hover:translate-x-1
        `
    }
  `;

  /*
  |--------------------------------------------------------------------------
  | Icon Container
  |--------------------------------------------------------------------------
  */

  const iconClass = `
    flex h-8 w-8 shrink-0
    items-center justify-center
    rounded-lg
    bg-[#C8A86B]/[0.08]
    text-[#D8B978]
    transition-all duration-200
    group-hover:bg-[#C8A86B]/[0.14]
    group-hover:text-[#E7CF9A]
  `;

  return (
    <>
      {/* =========================================================
          MOBILE HEADER
      ========================================================= */}

      <div className="fixed left-0 top-0 z-[60] flex h-16 w-full items-center border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            text-gray-700
            transition
            hover:bg-gray-100
          "
        >
          <Menu size={24} />
        </button>

        <div className="ml-3">
          <h1 className="font-serif text-xl font-semibold text-[#C8A86B]">
            FREYZA
          </h1>

          <p className="text-[8px] tracking-[3px] text-gray-500">
            Luxury salon
          </p>
        </div>
      </div>

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed inset-x-0 bottom-0 top-16
            z-40
            bg-black/50
            backdrop-blur-[1px]
            lg:hidden
          "
        />
      )}

      {/* =========================================================
          SIDEBAR
      ========================================================= */}

      <aside
        className={`
          fixed left-0
          z-50
          flex w-[280px] flex-col
          bg-gradient-to-b
          from-[#0C0F1D]
          via-[#0B0E1C]
          to-[#080A14]
          text-white
          shadow-2xl
          transition-transform duration-300 ease-in-out

          top-16
          h-[calc(100vh-4rem)]

          lg:top-0
          lg:h-screen
          lg:translate-x-0

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =======================================================
            LOGO
        ======================================================= */}

        <div className="relative flex items-start justify-between border-b border-white/[0.08] px-8 pb-6 pt-8">
          {/* Gold glow */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#C8A86B]/10 blur-3xl" />

          {/* Purple glow */}
          <div className="pointer-events-none absolute right-0 top-16 h-24 w-24 rounded-full bg-[#7C3AED]/10 blur-3xl" />

          <div className="relative">
            <h1
              className="text-5xl text-[#C8A86B]"
              style={{
                fontFamily: "serif",
              }}
            >
              FREYZA
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#C8A86B]/50" />

              <p className="text-[10px] font-medium uppercase tracking-[3px] text-[#E3D5B8]">
                Luxury salon
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="
              relative
              flex h-9 w-9 items-center justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
          >
            <X size={21} />
          </button>
        </div>

        {/* =======================================================
            MENU
        ======================================================= */}

        <nav className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">
          <ul className="space-y-2 px-3 py-6">
            {/* =================================================
                DASHBOARD
            ================================================= */}

            {hasPermission("dashboard", "read") && (
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={handleMobileNavigation}
                  className={navItemClass}
                >
                  <div className={iconClass}>
                    <LayoutDashboard size={18} />
                  </div>

                  <span>Dashboard</span>
                </NavLink>
              </li>
            )}

            {/* =================================================
                ROLE PERMISSIONS
            ================================================= */}

            <li>
              {(hasPermission("permissions", "read") ||
                hasPermission("role", "read")) && (
                <button
                  onClick={() => setRolePermissions(!rolePermisions)}
                  className={parentClass(rolePermisions)}
                >
                  <div className={iconClass}>
                    <KeyRound size={18} />
                  </div>

                  <span className="flex-1 text-left">Role Permissions</span>

                  <div
                    className={`
                      flex h-7 w-7 items-center justify-center
                      rounded-lg
                      transition
                      ${
                        rolePermisions
                          ? "bg-white/10 text-[#E7CF9A]"
                          : "text-[#C8BDAA]"
                      }
                    `}
                  >
                    {rolePermisions ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    )}
                  </div>
                </button>
              )}

              {rolePermisions && (
                <div className="relative ml-7 mt-1.5 space-y-1 border-l border-[#C8A86B]/20 pl-3">
                  {hasPermission("permissions", "read") && (
                    <NavLink
                      to="/permissions"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <ShieldCheck size={17} />
                      <span>Permissions</span>
                    </NavLink>
                  )}

                  {hasPermission("role", "read") && (
                    <NavLink
                      to="/role"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <User size={17} />
                      <span>Role</span>
                    </NavLink>
                  )}
                </div>
              )}
            </li>

            {/* =================================================
                USERS
            ================================================= */}

            {hasPermission("users", "read") && (
              <li>
                <NavLink
                  to="/staff"
                  onClick={handleMobileNavigation}
                  className={navItemClass}
                >
                  <div className={iconClass}>
                    <UserCog size={18} />
                  </div>

                  <span>Users</span>
                </NavLink>
              </li>
            )}

            {/* =================================================
                COLLAGE
            ================================================= */}

            <li>
              {hasPermission("course", "read") && (
                <button
                  onClick={() => setCollageOpen(!collageOpen)}
                  className={parentClass(collageOpen)}
                >
                  <div className={iconClass}>
                    <GraduationCap size={18} />
                  </div>

                  <span className="flex-1 text-left">Collage</span>

                  <div
                    className={`
                      flex h-7 w-7 items-center justify-center
                      rounded-lg
                      transition
                      ${
                        collageOpen
                          ? "bg-white/10 text-[#E7CF9A]"
                          : "text-[#C8BDAA]"
                      }
                    `}
                  >
                    {collageOpen ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    )}
                  </div>
                </button>
              )}

              {collageOpen && (
                <div className="relative ml-7 mt-1.5 space-y-1 border-l border-[#C8A86B]/20 pl-3">
                  {hasPermission("course", "read") && (
                    <NavLink
                      to="/course"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <NotebookPen size={17} />
                      <span>Course</span>
                    </NavLink>
                  )}

                  {hasPermission("quary", "read") && (
                    <NavLink
                      to="/Querys"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <MessageSquareText size={17} />
                      <span>Queries</span>
                    </NavLink>
                  )}
                </div>
              )}
            </li>

            {/* =================================================
                WEBSITE MANAGEMENT
            ================================================= */}

            <li>
              {(hasPermission("home", "read") ||
                hasPermission("about", "read") ||
                hasPermission("category", "read") ||
                hasPermission("services", "read") ||
                hasPermission("gallary", "read") ||
                hasPermission("blog", "read") ||
                hasPermission("contactus", "read")) && (
                <button
                  onClick={() => setWebsiteOpen(!websiteOpen)}
                  className={parentClass(websiteOpen)}
                >
                  <div className={iconClass}>
                    <Globe size={18} />
                  </div>

                  <span className="flex-1 text-left">Website Management</span>

                  <div
                    className={`
                      flex h-7 w-7 items-center justify-center
                      rounded-lg
                      transition
                      ${
                        websiteOpen
                          ? "bg-white/10 text-[#E7CF9A]"
                          : "text-[#C8BDAA]"
                      }
                    `}
                  >
                    {websiteOpen ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    )}
                  </div>
                </button>
              )}

              {websiteOpen && (
                <div className="relative ml-7 mt-1.5 space-y-1 border-l border-[#C8A86B]/20 pl-3">
                  {hasPermission("home", "read") && (
                    <NavLink
                      to="/home"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <HomeIcon size={17} />
                      <span>Home</span>
                    </NavLink>
                  )}

                  {hasPermission("about", "read") && (
                    <NavLink
                      to="/about"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <Info size={17} />
                      <span>About</span>
                    </NavLink>
                  )}

                  {hasPermission("category", "read") && (
                    <NavLink
                      to="/servicesCategory"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <Layers3 size={17} />
                      <span>Category</span>
                    </NavLink>
                  )}

                  {hasPermission("services", "read") && (
                    <NavLink
                      to="/services"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <Scissors size={17} />
                      <span>Services</span>
                    </NavLink>
                  )}

                  {hasPermission("gallary", "read") && (
                    <NavLink
                      to="/gallary"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <Image size={17} />
                      <span>Gallery</span>
                    </NavLink>
                  )}

                  {hasPermission("blog", "read") && (
                    <NavLink
                      to="/blogpage"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <TvMinimalPlay size={17} />
                      <span>Blog</span>
                    </NavLink>
                  )}

                  {hasPermission("contactus", "read") && (
                    <NavLink
                      to="/contactUs"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <Contact size={17} />
                      <span>Contact Us</span>
                    </NavLink>
                  )}
                </div>
              )}
            </li>

            {/* =================================================
                CUSTOMER MANAGEMENT
            ================================================= */}

            <li>
              {(hasPermission("servicerequest", "read") ||
                hasPermission("bookings", "read") ||
                hasPermission("subscribers", "read")) && (
                <button
                  onClick={() => setCustomerOpen(!customerOpen)}
                  className={parentClass(customerOpen)}
                >
                  <div className={iconClass}>
                    <Users size={18} />
                  </div>

                  <span className="flex-1 text-left">Customer Management</span>

                  <div
                    className={`
                      flex h-7 w-7 items-center justify-center
                      rounded-lg
                      transition
                      ${
                        customerOpen
                          ? "bg-white/10 text-[#E7CF9A]"
                          : "text-[#C8BDAA]"
                      }
                    `}
                  >
                    {customerOpen ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    )}
                  </div>
                </button>
              )}

              {customerOpen && (
                <div className="relative ml-7 mt-1.5 space-y-1 border-l border-[#C8A86B]/20 pl-3">
                  {hasPermission("servicerequest", "read") && (
                    <NavLink
                      to="/serviceReqests"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <ClipboardList size={17} />
                      <span>Service Requests</span>
                    </NavLink>
                  )}

                  {hasPermission("bookings", "read") && (
                    <NavLink
                      to="/bookings"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <CalendarDays size={17} />
                      <span>Bookings</span>
                    </NavLink>
                  )}

                  {hasPermission("subscribers", "read") && (
                    <NavLink
                      to="/subscribers"
                      onClick={handleMobileNavigation}
                      className={subNavClass}
                    >
                      <Users size={17} />
                      <span>Subscribers</span>
                    </NavLink>
                  )}
                </div>
              )}
            </li>

            <li>
              {/* <div className="relative ml-7 mt-1.5 space-y-1 border-l border-[#C8A86B]/20 pl-3"> */}
              <NavLink
                to="/FAQ"
                onClick={handleMobileNavigation}
                className={subNavClass}
              >
                FAQ
              </NavLink>
              {/* </div> */}
            </li>

            {/* =================================================
                SETTINGS
            ================================================= */}

            <li className="pt-2">
              <div className="mb-2 px-4">
                <p className="text-[10px] font-semibold uppercase tracking-[2.5px] text-[#9D927E]">
                  System
                </p>
              </div>

              <NavLink
                to="/settings"
                onClick={handleMobileNavigation}
                className={navItemClass}
              >
                <div className={iconClass}>
                  <Settings size={18} />
                </div>

                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* =======================================================
            ADMIN PROFILE
        ======================================================= */}

        <div className="border-t border-white/[0.08] p-4">
          <div
            className="
              group flex items-center gap-3
              rounded-2xl
              border border-[#C8A86B]/10
              bg-white/[0.035]
              p-3.5
              transition
              hover:border-[#C8A86B]/20
              hover:bg-white/[0.055]
            "
          >
            {/* Profile Image */}
            <div className="relative shrink-0">
              <img
                src="/logoOrg.jpeg"
                alt="Profile"
                className="
                  h-12 w-12
                  rounded-xl
                  object-cover
                  ring-1
                  ring-[#C8A86B]/20
                "
              />

              {/* Online indicator */}
              <span
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-[#0B0E1C]
                  bg-emerald-500
                "
              />
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-[15px] font-semibold text-[#FFF8E9]">
                {name || "Admin"}
              </h4>

              <p className="mt-0.5 truncate text-xs capitalize text-[#BEB4A4]">
                {role || "Administrator"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
