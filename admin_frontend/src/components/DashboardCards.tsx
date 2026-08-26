import { CalendarDays, Users, ClipboardList, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  totalServices: number;
  totalSubscribers: number;
  totalBookings: number;
  totalServiceRequest: number;
}

const DashboardCards = ({
  totalServices,
  totalSubscribers,
  totalBookings,
  totalServiceRequest,
}: Props) => {
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: CalendarDays,
      link: "/bookings",
    },
    {
      title: "Subscribers",
      value: totalSubscribers,
      icon: Users,
      link: "/subscribers",
    },
    {
      title: "Service Requests",
      value: totalServiceRequest,
      icon: ClipboardList,
      link: "/serviceReqests",
    },
    {
      title: "Services",
      value: totalServices,
      icon: Scissors,
      link: "/services",
    },
  ];

  const canAccessDashboard = hasPermission("dashboard", "read");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            onClick={() => {
              navigate(item.link);
            }}
            className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 ${
              canAccessDashboard
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-70"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {item.value}
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center">
                <Icon size={26} className="text-white" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+12%</span>

              <span className="text-gray-500 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
