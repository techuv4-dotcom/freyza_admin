import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const categories = [
  {
    id: 1,
    image: "https://via.placeholder.com/80",
    name: "Hair",
    title: "Professional Hair Care",
    status: "Active",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80",
    name: "Skin",
    title: "Luxury Skin Treatments",
    status: "Active",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80",
    name: "Makeup",
    title: "Professional Makeup Services",
    status: "Inactive",
  },
];

interface ExistingServiceCategoriesProps {
  onAdd: () => void;
  onEdit: (id: number) => void;
}

const ExistingServiceCategories = ({
  onAdd,
  onEdit,
}: ExistingServiceCategoriesProps) => {
  const { hasPermission } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const findAll = async () => {
      try {
        const response = await axiosInstance.get("service-category");
        toast.success("success");
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    findAll();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Service Category Management
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage all service categories from here.
              </p>
            </div>
            {hasPermission("category", "create") && (
              <button
                type="button"
                onClick={onAdd}
                className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
              >
                <Plus size={18} />
                Add New Category
              </button>
            )}
          </div>
        </div>

        {/* Categories */}

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="text-lg font-semibold">
                Existing Service Categories
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View, edit or delete categories.
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
              {categories.length} Categories
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((category: any) => (
                  <tr
                    key={category.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="h-16 w-16 rounded-lg border object-cover"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <h3 className="font-semibold text-gray-800">
                        {category.name}
                      </h3>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {category.title}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          category.activeStatus === true
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {category.activeStatus ? "active" : "inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        {hasPermission("category", "update") && (
                          <button
                            type="button"
                            onClick={() => onEdit(category.id)}
                            className="flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-indigo-600 transition hover:bg-indigo-50"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>
                        )}

                        {hasPermission("category", "read") && (
                          <button
                            type="button"
                            onClick={() => onEdit(category.id)}
                            className="flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-indigo-600 transition hover:bg-indigo-50"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        )}

                        {/* <button className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50">
                          <Trash2 size={16} />
                          Delete
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingServiceCategories;
