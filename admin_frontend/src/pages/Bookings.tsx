import { useEffect, useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import Header from "../components/Header";
import axiosInstance from "../utils/Axios.instance";

const mockBookings = [
  {
    id: 1,
    customer: "John Doe",
    phone: "+91 9876543210",
    service: "Hair Cut",
    date: "22 Jun 2026",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sarah Khan",
    phone: "+91 9876543211",
    service: "Facial",
    date: "22 Jun 2026",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Michael",
    phone: "+91 9876543212",
    service: "Hair Spa",
    date: "22 Jun 2026",
    time: "02:00 PM",
    status: "Completed",
  },
  {
    id: 4,
    customer: "Emma",
    phone: "+91 9876543213",
    service: "Beard Trim",
    date: "23 Jun 2026",
    time: "04:00 PM",
    status: "Cancelled",
  },
];

interface bookingData {
  id: number;
  name: string;
  phone: string;
  email: string;
  service_id: number;
  service_name: string;
  date: string;
  time: string;
  notes: string;
  booked_at: Date;
}

const Bookings = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<bookingData[]>([]);

  const fetchAll = async () => {
    const resp = await axiosInstance.get("/appointment");
    setData(resp.data);
  };

  const filteredBookings = data?.filter(
    (booking) =>
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.service_name.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <Header title="Bookings Management" />

      <main className="p-6 space-y-6">
        {/* Top Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* <h2 className="text-2xl font-bold text-gray-800">
              Bookings Management
            </h2> */}
            <p className="text-gray-500 mt-1">
              Manage customer appointments and bookings.
            </p>
          </div>

          {/* <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-5 py-3 text-white font-medium">
            <Plus size={18} />
            Add Booking
          </button> */}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Time
                  </th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th> */}
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {booking.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{booking.phone}</td>

                    <td className="px-6 py-4 text-gray-600">
                      {booking.service_name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{booking.date}</td>

                    <td className="px-6 py-4 text-gray-600">{booking.time}</td>

                    {/* <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td> */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* <button className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50">
                          <Eye size={18} />
                        </button> */}

                        {/* <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                          <Pencil size={18} />
                        </button> */}

                        {/* <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Bookings;
