import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Mail,
  Phone,
  CalendarDays,
  X,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
// import axiosInstance from "../../api/axiosInstance";

interface Query {
  name: string;
  email: string;
  number: string;
  course: string;
  price: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const QueryManagement = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [search, setSearch] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const resp = await axiosInstance.get("/query");

      console.log("Query API Response:", resp.data);

      setQueries(resp.data.data);
    } catch (error) {
      console.error("Failed to fetch queries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredQueries = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return queries;
    }

    return queries.filter((query) => {
      return (
        query.name.toLowerCase().includes(searchText) ||
        query.email.toLowerCase().includes(searchText) ||
        query.number.toLowerCase().includes(searchText) ||
        query.course.toLowerCase().includes(searchText) ||
        query.message.toLowerCase().includes(searchText)
      );
    });
  }, [queries, search]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // formatDate.

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Queries</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer enquiries submitted from the website
        </p>
      </div>

      {/* Summary Card */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Queries</p>

          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            {queries.length}
          </h2>

          <p className="mt-1 text-xs text-gray-400">Total customer enquiries</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Showing</p>

          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            {filteredQueries.length}
          </h2>

          <p className="mt-1 text-xs text-gray-400">Matching queries</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Latest Query</p>

          <h2 className="mt-2 text-sm font-semibold text-gray-900">
            {queries.length > 0
              ? formatDate(queries[queries.length - 1].createdAt)
              : "No queries"}
          </h2>

          <p className="mt-1 text-xs text-gray-400">Most recent submission</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Customer Queries
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View all enquiries received from the website
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, email, course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-gray-500">Loading queries...</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contact
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Course
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Message
                    </th>

                    {/* <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Price
                    </th> */}

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Created At
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredQueries.length > 0 ? (
                    filteredQueries.map((query, index) => (
                      <tr
                        key={`${query.email}-${query.createdAt}-${index}`}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition"
                      >
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                              {query.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {query.name}
                              </p>

                              <p className="text-xs text-gray-400">
                                Query #{index + 1}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Mail size={13} />
                              {query.email}
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Phone size={13} />
                              {query.number}
                            </div>
                          </div>
                        </td>

                        {/* Course */}
                        <td className="px-5 py-4">
                          <span className="text-sm font-medium text-gray-700">
                            {query.course.trim()}
                          </span>
                        </td>

                        {/* Message */}
                        <td className="max-w-[280px] px-5 py-4">
                          <p
                            className="truncate text-sm text-gray-500"
                            title={query.message}
                          >
                            {query.message}
                          </p>
                        </td>

                        {/* Created */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CalendarDays size={15} className="text-gray-400" />

                            <span>{formatDate(query.createdAt)}</span>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => setSelectedQuery(query)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                            title="View Query"
                          >
                            <Eye size={17} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-5 py-16 text-center">
                        <p className="text-sm font-medium text-gray-700">
                          No queries found
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {search
                            ? "Try a different search term."
                            : "No customer queries have been submitted yet."}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {filteredQueries.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {queries.length}
                </span>{" "}
                queries
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-300"
                >
                  <ChevronLeft size={16} />
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm text-white">
                  1
                </button>

                <button
                  disabled
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Details Drawer */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="h-full w-full max-w-md bg-white shadow-xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Query Details
                </h2>

                <p className="mt-1 text-xs text-gray-400">Customer enquiry</p>
              </div>

              <button
                onClick={() => setSelectedQuery(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={19} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="h-[calc(100%-76px)] overflow-y-auto p-6">
              {/* Customer */}
              <div className="mb-7 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-600">
                  {selectedQuery.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedQuery.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">Customer Query</p>
                </div>
              </div>

              {/* Email */}
              <DetailItem
                label="Email"
                value={selectedQuery.email}
                icon={<Mail size={16} />}
              />

              {/* Number */}
              <DetailItem
                label="Mobile Number"
                value={selectedQuery.number}
                icon={<Phone size={16} />}
              />

              {/* Number */}
              <DetailItem
                label="Price"
                value={String(selectedQuery.price)}
                icon={<IndianRupee size={16} />}
              />

              {/* Course */}
              <DetailItem label="Course" value={selectedQuery.course.trim()} />

              {/* Message */}
              <div className="mb-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Message
                </p>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm leading-6 text-gray-600">
                    {selectedQuery.message}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-gray-200 pt-5">
                <div className="mb-5 flex items-start gap-3">
                  <CalendarDays size={17} className="mt-0.5 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400">Submitted</p>

                    <p className="mt-1 text-sm text-gray-700">
                      {formatDate(selectedQuery.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays size={17} className="mt-0.5 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400">Last Updated</p>

                    <p className="mt-1 text-sm text-gray-700">
                      {formatDate(selectedQuery.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface DetailItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const DetailItem = ({ label, value, icon }: DetailItemProps) => {
  return (
    <div className="mb-5">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
        {icon && <span className="text-gray-400">{icon}</span>}

        {value}
      </div>
    </div>
  );
};

export default QueryManagement;
