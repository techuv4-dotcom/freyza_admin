import { useEffect, useState } from "react";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import Header from "../components/Header";
import axiosInstance from "../utils/Axios.instance";

interface serviceData {
  id: number;
  email: string;
  service_name: string;
  status: string;
  created_at: string;
}

const ServiceRequestsPage = () => {
  const [search, setSearch] = useState("");
  const [request, setRequest] = useState<serviceData[]>([]);
  const fetchAll = async () => {
    const resp = await axiosInstance.get("/service-requests");
    setRequest(resp.data);
  };

  const filteredRequests = request.filter(
    (request) =>
      request.email.toLowerCase().includes(search.toLowerCase()) ||
      request.service_name.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <Header title="Service Requests" />

      <main className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800"></h2>
          <p className="mt-1 text-gray-500">
            Manage customer service requests.
          </p>
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
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* <select className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select> */}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Requested Service
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Request Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-700">{request.email}</td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {request.service_name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {request.created_at}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* <button className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50">
                          <Eye size={18} />
                        </button> */}

                        {/* <button className="rounded-lg p-2 text-green-600 hover:bg-green-50">
                          <CheckCircle size={18} />
                        </button>

                        <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                          <XCircle size={18} />
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

export default ServiceRequestsPage;
