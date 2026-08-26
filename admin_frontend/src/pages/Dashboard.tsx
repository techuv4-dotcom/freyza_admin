import Header from "../components/Header";
import DashboardCards from "../components/DashboardCards";
import RecentBookings from "../components/RecentBookings";
import ServiceRequests from "../components/ServiceRequests";
import LatestSubscribers from "../components/LatestSubscribers";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/Axios.instance";
import { useAuth } from "../context/AuthContext";

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

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const Dashboard = () => {
  const [totalServices, setTotalServices] = useState<number>(0);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalServiceRequest, setTotalServiceRequest] = useState<number>(0);
  const [recentBookings, setRecentBookings] = useState<Appointment[]>([]);
  const [latestSubscribers, setLatestSubscribers] = useState<Subscriber[]>([]);
  const { hasPermission } = useAuth();

  const fetchAll = async () => {
    const resp = await axiosInstance.get("/home/dashboard");
    (setTotalSubscribers(resp.data.TotalSubscribers),
      setLatestSubscribers(resp.data.LatestSubscribers),
      setRecentBookings(resp.data.RecentBookings),
      setTotalBookings(resp.data.TotalBookings),
      setTotalServices(resp.data.TotalServices),
      setTotalServiceRequest(resp.data.TotalServiceRequest));
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <Header title="Dashboard" />

      <main className="p-6 space-y-6">
        {hasPermission("dashboard", "read") && (
          <DashboardCards
            totalServices={totalServices}
            totalSubscribers={totalSubscribers}
            totalBookings={totalBookings}
            totalServiceRequest={totalServiceRequest}
          />
        )}
        <RecentBookings recentBookings={recentBookings} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ServiceRequests />
          <LatestSubscribers latestSubscribers={latestSubscribers} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
