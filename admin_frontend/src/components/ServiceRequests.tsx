import { useEffect, useState } from "react";
import axiosInstance from "../utils/Axios.instance";

interface serviceData {
  id: number;
  email: string;
  service_name: string;
  status: string;
  created_at: string;
}

const ServiceRequests = () => {
  const [requests, setRequests] = useState<serviceData[]>([]);
  const fetchAll = async () => {
    const resp = await axiosInstance.get("/service-requests");
    console.log(resp);
    setRequests(resp.data);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-5">Service Requests</h2>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between border-b border-gray-100 pb-3"
          >
            <div>
              <p className="font-medium text-gray-800">
                {request.service_name}
              </p>

              <p className="text-sm text-gray-500">{request.email}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceRequests;
