import { useFormik } from "formik";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { useState } from "react";

interface permissionData {
  module: string;
  permission: string;
  key: string;
}

const action = ["create", "read", "update", "delete"];

const CreatePermission = () => {
  const [data, setData] = useState<permissionData[]>([]);

  const initialValues: permissionData = {
    module: "",
    permission: "",
    key: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async () => {
      await Promise.all(
        data.map((item) => axiosInstance.post("/permissions", item)),
      );
      toast.success("Permission Added");
      console.log(data);
      setData([]);
      formik.resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Permission
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Add a new permission for your application modules.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Module */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Module
            </label>

            <input
              type="text"
              name="module"
              value={formik.values.module}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Example: Staff"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>
          <div className="rounded-xl border border-gray-300 p-4">
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Select Actions
            </label>

            <div className="grid grid-cols-4 gap-3">
              {action.map((action) => (
                <label key={action} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-purple-600"
                    onChange={async (e) => {
                      if (e.target.checked) {
                        const permission = {
                          module: formik.values.module,
                          permission: action,
                          key: `${formik.values.module}.${action}`,
                        };
                        setData((prev) => [...prev, permission]);
                      } else {
                        const dataIndex = data.findIndex(
                          (item) => item.permission === action,
                        );
                        data.splice(dataIndex, 1);
                      }
                    }}
                  />

                  <span className="capitalize">{action}</span>
                </label>
              ))}
            </div>
          </div>

          {/* <div className="rounded-xl border border-gray-300 p-4">
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Select Actions
            </label>

            <div className="grid grid-cols-4 gap-3">
              {action.map((action) => (
                <label key={action} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-purple-600"
                  />
                  <span className="capitalize">{action}</span>
                </label
              ))}
            </div>
          </div> */}

          {/* <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Permission
            </label>

            <input
              type="text"
              name="permission"
              value={formik.values.permission}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Example: create"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div> */}

          {/* Permission */}
          {/* <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              key
            </label>

            <input
              type="text"
              name="permission"
              value={formik.values.key}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Example: staff.create"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Use a readable format like
              <span className="font-semibold"> module.action</span> (e.g.
              staff.create, booking.update).
            </p>
          </div> */}

          {/* Preview */}
          <div className="rounded-xl border border-dashed border-purple-300 bg-purple-50 p-4">
            <h3 className="mb-2 font-semibold text-purple-700">
              Permission Preview
            </h3>

            <div className="flex flex-wrap gap-3">
              {data.map((data) => (
                <span
                  className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white"
                  key={data.key}
                >
                  {data.key}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              type="button"
            >
              Cancel
            </button>

            <button
              className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
              type="submit"
            >
              Save Permission
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePermission;
