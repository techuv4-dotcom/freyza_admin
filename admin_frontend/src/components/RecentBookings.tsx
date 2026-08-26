import { useEffect, useState } from "react";
import axiosInstance from "../utils/Axios.instance";
import { useNavigate } from "react-router-dom";

interface Props {
  recentBookings: Appointment[];
}

interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  service_id: number;
  service_name: string;
  date: string;
  time: string;
  notes: string;
  booked_at: string;
}

const RecentBookings = ({ recentBookings }: Props) => {
  const [bookings, setBookings] = useState<Appointment[]>([]);

  // const fetchAll = async () => {
  //   const resp = await axiosInstance.get("/appointment/today");
  //   setBookings(resp.data);
  //   console.log("appointment serponse", resp);
  // };
  const navigate = useNavigate();
  useEffect(() => {
    setBookings(recentBookings);
  }, [recentBookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>

        <button
          className="text-purple-600 font-medium hover:text-purple-700"
          onClick={() => {
            navigate("/serviceReqests");
          }}
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-4 text-sm font-semibold text-gray-500">
                Customer Name
              </th>
              <th className="pb-4 text-sm font-semibold text-gray-500">
                Service
              </th>
              <th className="pb-4 text-sm font-semibold text-gray-500">Date</th>
              <th className="pb-4 text-sm font-semibold text-gray-500">Time</th>
              <th className="pb-4 text-sm font-semibold text-gray-500">
                ServiceId
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 font-medium text-gray-800">
                  {booking.name}
                </td>

                <td className="py-4 text-gray-600">{booking.service_name}</td>

                <td className="py-4 text-gray-600">{booking.date}</td>

                <td className="py-4 text-gray-600">{booking.time}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.phone,
                    )}`}
                  >
                    {booking.service_id}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentBookings;
