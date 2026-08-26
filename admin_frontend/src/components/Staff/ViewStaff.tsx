import { ArrowLeft, UploadCloud } from "lucide-react";
// import Header from "../components/Header";
import Header from "../Header";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { uploadFile } from "../../utils/file.uploader";
import { useState } from "react";
// import axiosInstance from "../../utils/Axios.instance";
// import { toast } from "react-toastify";

interface staffData {
  id: number;
  profileUrl: string;

  name: string;

  email: string;

  phone: string;

  gender: string;

  dob: Date;

  designation: string;

  role: roleData;

  experience: string;

  joiningDate: Date;

  salary: string;

  status: boolean;

  address: string;
}

interface roleData {
  id: number;
  role: string;
  // users:staffData[]
}

interface Props {
  staff: staffData | null;
  setShowAddStaff: React.Dispatch<
    React.SetStateAction<"view" | "add" | "edit" | "singleEdit">
  >;
  role: roleData | null;
}

const ViewStaff = ({ setShowAddStaff, staff, role }: Props) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      {/* <Header title="Staff Details" /> */}

      <main className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            {/* <button
              type="button"
              className="mb-3 flex items-center gap-2 text-sm text-gray-500 hover:text-black"
              onClick={() => setShowAddStaff("view")}
            >
              <ArrowLeft size={18} />
              Back
            </button> */}

            <button
              type="button"
              onClick={() => setShowAddStaff("view")}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-purple-100 hover:text-purple-600"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Back
            </button>

            <h2 className="text-3xl font-bold text-gray-800">User Details</h2>

            <p className="mt-2 text-gray-500">
              View complete information about this staff member.
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <img
              src={
                staff?.profileUrl
                  ? `${import.meta.env.VITE_APP_URL}${staff.profileUrl}`
                  : "https://placehold.co/200x200"
              }
              alt={staff?.name}
              className="h-44 w-44 rounded-2xl border object-cover"
            />

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">
                {staff?.name}
              </h2>

              <p className="mt-2 text-lg text-gray-500">{staff?.designation}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                  {role?.role}
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    staff?.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {staff?.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold text-gray-800">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-2 font-semibold text-gray-800">{staff?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-2 font-semibold text-gray-800">{staff?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-2 font-semibold text-gray-800">{staff?.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="mt-2 font-semibold text-gray-800">
                {staff?.gender}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="mt-2 font-semibold text-gray-800">
                {staff?.dob ? new Date(staff.dob).toLocaleDateString() : "-"}
              </p>
            </div>
          </div>
        </div>
        {/* Job Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold text-gray-800">
            Job Information
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="mt-2 font-semibold text-gray-800">
                {staff?.designation || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-2 font-semibold text-gray-800">
                {role?.role || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="mt-2 font-semibold text-gray-800">
                {staff?.experience || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joining Date</p>
              <p className="mt-2 font-semibold text-gray-800">
                {staff?.joiningDate
                  ? new Date(staff.joiningDate).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="mt-2 font-semibold text-gray-800">
                {staff?.salary ? `₹ ${staff.salary}` : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>

              <div className="mt-2">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    staff?.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {staff?.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-semibold text-gray-800">Address</h3>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="leading-7 text-gray-700 whitespace-pre-line">
              {staff?.address || "No address available"}
            </p>
          </div>
        </div>

        {/* ================= LOGIN DETAILS ================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Login Details
            </h3>

            {/* <p className="mt-1 text-sm text-gray-500">
              Update login credentials if required.
            </p> */}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Login Email
              </label>

              <input
                type="email"
                name="email"
                value={staff?.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* PASSWORD */}
            {/* 
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Leave blank to keep current password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div> */}
          </div>

          {/* <div className="mt-5 flex items-start gap-3 rounded-xl bg-purple-50 p-4">
            <ShieldCheck size={20} className="mt-0.5 text-purple-600" />

            <p className="text-sm text-purple-700">
              Leave the password field empty if you don't want to change the
              existing password.
            </p>
          </div> */}
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowAddStaff("view")}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
          >
            Back
          </button>

          {/* <button
            type="button"
            onClick={() => setShowAddStaff("edit")}
            className="rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-8 py-3 font-medium text-white shadow-md transition hover:opacity-90"
          >
            Edit Staff
          </button> */}
        </div>
      </main>
    </>
  );
};

export default ViewStaff;
