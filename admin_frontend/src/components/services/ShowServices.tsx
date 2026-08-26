import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Eye } from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
import { useAuth } from "../../context/AuthContext";

interface ServicesProps {
  setService: React.Dispatch<React.SetStateAction<number>>;
  onAddService?: (setService: any) => void;
  setEditServices: React.Dispatch<React.SetStateAction<boolean>>;
}

const Services = ({
  setEditServices,
  setService,
  onAddService,
}: ServicesProps) => {
  const { hasPermission } = useAuth();
  const [mockServices, setMockServices] = useState<any>();
  const [search, setSearch] = useState("");

  const findAllServices = async () => {
    const resp = await axiosInstance.get("services");
    console.log(resp);

    setMockServices(resp.data);
  };

  const filteredServices =
    mockServices?.filter((service: any) => {
      const keyword = search.toLowerCase();

      return (
        service.name?.toLowerCase().includes(keyword) ||
        service.serviceCategoryName?.toLowerCase().includes(keyword) ||
        service.duration?.toLowerCase().includes(keyword) ||
        service.price?.toString().includes(keyword) ||
        (service.activeStatus ? "active" : "inactive").includes(keyword)
      );
    }) || [];

  useEffect(() => {
    findAllServices();
  }, []);

  // const filteredServices = mockServices.filter(
  //   (service) =>
  //     service.name.toLowerCase().includes(search.toLowerCase()) ||
  //     service.category.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Services Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all salon services from one place.
          </p>
        </div>

        {hasPermission("services", "create") && (
          <button
            onClick={onAddService}
            className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Service
          </button>
        )}
      </div>

      {/* Search */}

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by service,category,Price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-black"
          />
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Service Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Duration
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredServices?.map((service: any) => (
                <tr
                  key={service.id}
                  className="border-t border-gray-200 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {service.name}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      {service.serviceCategoryName}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {service.duration}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-700">
                    ₹{service.price}
                  </td>

                  <td className="px-6 py-4">
                    {/* <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        service.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.status}
                    </span> */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        service.activeStatus
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.activeStatus ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {hasPermission("services", "update") && (
                        <button
                          onClick={() => {
                            setService(service.id);
                            setEditServices(true);
                          }}
                          // onClick={() => onAddService?.(setService(service.id))}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Pencil size={18} />
                        </button>
                      )}

                      {hasPermission("services", "read") && (
                        <button
                          onClick={() => {
                            setService(service.id);
                            setEditServices(true);
                          }}
                          // onClick={() => onAddService?.(setService(service.id))}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </button>
                      )}

                      {hasPermission("services", "delete") && (
                        <button
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          onClick={async () => {
                            const confirmed = window.confirm(
                              "Are you sure you want to delete this Service?",
                            );

                            if (!confirmed) return;
                            console.log("gose request");

                            await axiosInstance.delete(
                              `/services/${service.id}`,
                            );
                            findAllServices();
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredServices?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Services;
