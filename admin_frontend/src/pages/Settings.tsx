// import { Building2, Clock3, Bell, Shield, Save, LogOut } from "lucide-react";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Settings = () => {
//   const { setPermissions } = useAuth();
//   const navigate = useNavigate();
//   const onLogout = () => {
//     localStorage.clear();
//     setPermissions([]);

//     localStorage.removeItem("permissions");
//     navigate("/");
//   };
//   return (
//     <>
//       <Header title="Settings" />

//       <main className="p-6 space-y-6">
//         {/* Save Button */}
//         <div className="flex justify-end gap-3">
//           <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-6 py-3 text-white font-medium">
//             <Save size={18} />
//             Save Changes
//           </button>

//           <button
//             onClick={onLogout}
//             className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white font-medium hover:bg-red-600"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//         {/* Account */}
//       </main>
//     </>
//   );
// };

// export default Settings;

import {
  Building2,
  Clock3,
  Bell,
  Shield,
  Save,
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { setPermissions } = useAuth();
  const navigate = useNavigate();

  const name = localStorage.getItem("userName") || "Admin";
  const role = localStorage.getItem("userRole") || "Administrator";

  const onLogout = () => {
    localStorage.clear();
    setPermissions([]);

    localStorage.removeItem("permissions");
    navigate("/");
  };

  return (
    <>
      {/* <Header title="Settings" /> */}

      <main className="min-h-[calc(100vh-80px)] bg-[#f8f9fc] p-6">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your account and application preferences
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="
                flex items-center gap-2
                rounded-xl
                border border-red-200
                bg-white
                px-5 py-2.5
                text-sm font-medium
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              <LogOut size={17} />
              Logout
            </button>

            <button
              className="
                flex items-center gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#5A2D82]
                to-[#7C3AED]
                px-5 py-2.5
                text-sm font-medium
                text-white
                shadow-lg
                shadow-purple-200
                transition
                hover:shadow-xl
              "
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </div>

        {/* =====================================================
            SETTINGS GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
          {/* ===================================================
              LEFT PROFILE CARD
          =================================================== */}

          <div className="h-fit rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Profile header */}
            <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#3B1D54] to-[#5A2D82] px-5 pb-16 pt-6">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#C8A86B]/10 blur-2xl" />

              <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-purple-400/10 blur-2xl" />

              <p className="relative text-xs font-medium uppercase tracking-[2px] text-[#D8C8A2]">
                Account
              </p>

              <h2 className="relative mt-2 text-lg font-semibold text-white">
                Profile Settings
              </h2>
            </div>

            {/* Profile */}
            <div className="-mt-10 px-5 pb-5">
              <div className="relative mb-5 flex items-end justify-between">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gray-100 text-gray-500 shadow-md">
                  <User size={30} />
                </div>

                <span className="mb-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600">
                  Active
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

              <p className="mt-1 text-sm capitalize text-gray-500">{role}</p>

              <div className="my-5 h-px bg-gray-100" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <Mail size={15} />
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">Account</p>

                    <p className="text-sm font-medium text-gray-700">
                      Admin Account
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <Shield size={15} />
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">Access Level</p>

                    <p className="text-sm font-medium capitalize text-gray-700">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT SETTINGS
          =================================================== */}

          <div className="space-y-6">
            {/* =================================================
                BUSINESS INFORMATION
            ================================================= */}

            <SettingsCard
              icon={<Building2 size={19} />}
              title="Business Information"
              description="Manage your salon's basic business details."
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  label="Business Name"
                  value="Freyza"
                  placeholder="Enter business name"
                />

                <InputField
                  label="Business Email"
                  value="contact@freyza.com"
                  placeholder="Enter business email"
                  type="email"
                />

                <InputField
                  label="Phone Number"
                  value="+91 00000 00000"
                  placeholder="Enter phone number"
                />

                <InputField
                  label="Location"
                  value="Dehradun, India"
                  placeholder="Enter location"
                />
              </div>
            </SettingsCard>

            {/* =================================================
                BUSINESS HOURS
            ================================================= */}

            {/* <SettingsCard
              icon={<Clock3 size={19} />}
              title="Business Hours"
              description="Set your salon's operating hours."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <TimeField day="Monday" start="09:00 AM" end="08:00 PM" />

                <TimeField day="Tuesday" start="09:00 AM" end="08:00 PM" />

                <TimeField day="Wednesday" start="09:00 AM" end="08:00 PM" />

                <TimeField day="Thursday" start="09:00 AM" end="08:00 PM" />

                <TimeField day="Friday" start="09:00 AM" end="08:00 PM" />

                <TimeField day="Saturday" start="09:00 AM" end="08:00 PM" />
              </div>
            </SettingsCard> */}

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            {/* <SettingsCard
              icon={<Bell size={19} />}
              title="Notifications"
              description="Choose which notifications you want to receive."
            >
              <div className="space-y-1">
                <ToggleItem
                  title="New Booking"
                  description="Get notified whenever a new booking is created."
                  defaultChecked
                />

                <ToggleItem
                  title="Service Request"
                  description="Receive notifications for new service requests."
                  defaultChecked
                />

                <ToggleItem
                  title="Customer Query"
                  description="Get notified when a customer submits a query."
                  defaultChecked
                />

                <ToggleItem
                  title="New Subscriber"
                  description="Receive notifications when someone subscribes."
                />
              </div>
            </SettingsCard> */}

            {/* =================================================
                SECURITY
            ================================================= */}

            <SettingsCard
              icon={<Shield size={19} />}
              title="Security"
              description="Manage your account security preferences."
            >
              <div className="divide-y divide-gray-100">
                <SecurityItem
                  title="Change Password"
                  description="Update your account password."
                />

                <SecurityItem
                  title="Login Activity"
                  description="Review recent account login activity."
                />

                <SecurityItem
                  title="Two-Factor Authentication"
                  description="Add an extra layer of protection to your account."
                  badge="Coming Soon"
                />
              </div>
            </SettingsCard>

            {/* =================================================
                DANGER ZONE
            ================================================= */}

            <div className="rounded-2xl border border-red-100 bg-white shadow-sm">
              <div className="border-b border-red-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-red-600">
                  Account Actions
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Actions related to your current session.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Sign out from this account
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    You will need to login again to access the admin panel.
                  </p>
                </div>

                <button
                  onClick={onLogout}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border border-red-200
                    bg-red-50
                    px-5 py-2.5
                    text-sm font-medium
                    text-red-600
                    transition
                    hover:bg-red-100
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

/* =============================================================
   SETTINGS CARD
============================================================= */

interface SettingsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsCard = ({
  icon,
  title,
  description,
  children,
}: SettingsCardProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start gap-4 border-b border-gray-100 px-5 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#6D35A0]">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
        </div>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
};

/* =============================================================
   INPUT FIELD
============================================================= */

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
}

const InputField = ({
  label,
  value,
  placeholder,
  type = "text",
}: InputFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-600">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="
          h-11 w-full
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-4
          text-sm text-gray-700
          outline-none
          transition
          placeholder:text-gray-400
          hover:border-gray-300
          focus:border-[#7C3AED]
          focus:bg-white
          focus:ring-2
          focus:ring-purple-100
        "
      />
    </div>
  );
};

/* =============================================================
   TIME FIELD
============================================================= */

interface TimeFieldProps {
  day: string;
  start: string;
  end: string;
}

const TimeField = ({ day, start, end }: TimeFieldProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">{day}</p>

        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          defaultValue={start}
          className="h-9 min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-600 outline-none focus:border-purple-400"
        />

        <span className="text-xs text-gray-400">-</span>

        <input
          type="text"
          defaultValue={end}
          className="h-9 min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-600 outline-none focus:border-purple-400"
        />
      </div>
    </div>
  );
};

/* =============================================================
   TOGGLE ITEM
============================================================= */

interface ToggleItemProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

const ToggleItem = ({
  title,
  description,
  defaultChecked = false,
}: ToggleItemProps) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-xl px-3 py-4 transition hover:bg-gray-50">
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>

        <p className="mt-1 text-xs leading-5 text-gray-400">{description}</p>
      </div>

      <div className="relative shrink-0">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />

        <div className="h-6 w-11 rounded-full bg-gray-200 transition peer-checked:bg-[#6D35A0]" />

        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </div>
    </label>
  );
};

/* =============================================================
   SECURITY ITEM
============================================================= */

interface SecurityItemProps {
  title: string;
  description: string;
  badge?: string;
}

const SecurityItem = ({ title, description, badge }: SecurityItemProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left transition hover:bg-gray-50"
    >
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>

        <p className="mt-1 text-xs text-gray-400">{description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {badge && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
            {badge}
          </span>
        )}

        <ChevronRight size={17} className="text-gray-400" />
      </div>
    </button>
  );
};

export default Settings;
