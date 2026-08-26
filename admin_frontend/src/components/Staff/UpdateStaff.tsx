import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/Axios.instance";
import { uploadFile } from "../../utils/file.uploader";

interface StaffData {
  id: number;
  profileUrl: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: Date | string;
  designation: string;
  role: any;
  experience: string;
  joiningDate: Date | string;
  salary: string;
  status: boolean;
  address: string;
}

interface RoleData {
  id: number;
  role: string;
}

interface Props {
  staff: StaffData | null;
  role: RoleData | null;

  setShowAddStaff: React.Dispatch<
    React.SetStateAction<"view" | "add" | "edit" | "singleEdit">
  >;
}

const EditStaff = ({ staff, role, setShowAddStaff }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      profileUrl: staff?.profileUrl || "",
      name: staff?.name || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      gender: staff?.gender || "",

      dob: formatDate(staff?.dob),

      designation: staff?.designation || "",
      role: role?.id || staff?.role?.id || "",
      experience: staff?.experience || "",

      joiningDate: formatDate(staff?.joiningDate),

      salary: staff?.salary || "",
      status: staff?.status ?? true,
      address: staff?.address || "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),

      email: Yup.string().email("Invalid email").required("Email is required"),

      phone: Yup.string().required("Phone is required"),

      gender: Yup.string().required("Gender is required"),

      dob: Yup.string().required("Date of birth is required"),

      designation: Yup.string().required("Designation is required"),

      role: Yup.number().required("Role is required"),

      experience: Yup.string().required("Experience is required"),

      joiningDate: Yup.string().required("Joining date is required"),

      salary: Yup.string().required("Salary is required"),

      status: Yup.boolean().required(),

      address: Yup.string().required("Address is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
    }),

    onSubmit: async (values) => {
      try {
        const formData: any = {
          profileUrl: values.profileUrl,
          name: values.name,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          dob: values.dob,
          designation: values.designation,
          role: Number(values.role),
          experience: values.experience,
          joiningDate: values.joiningDate,
          salary: String(values.salary),
          status: values.status,
          address: values.address,
        };

        /*
         * Password tabhi send karenge
         * jab user actually new password dale.
         */
        if (values.password && values.password.trim() !== "") {
          formData.password = values.password;
        }

        console.log("Update Form Data:", formData);

        const resp = await axiosInstance.patch(`/staff/${staff?.id}`, formData);

        toast.success(resp.data.message || "Staff updated successfully");

        setShowAddStaff("view");
      } catch (error: any) {
        console.log("UPDATE ERROR:", error);

        console.log("STATUS:", error.response?.status);

        console.log("DATA:", error.response?.data);

        toast.error(error.response?.data?.message || "Unable to update staff");
      }
    },
  });

  return (
    <main className="space-y-6 p-6">
      {/* ================= HEADER ================= */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setShowAddStaff("view")}
          className="rounded-xl border border-gray-200 bg-white p-3 text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Edit Staff</h2>

          <p className="mt-1 text-sm text-gray-500">
            Update staff member information.
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* ================= PROFILE INFORMATION ================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Profile Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Update the staff member's basic information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* PROFILE IMAGE */}

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Profile Photo
              </label>

              <div className="flex flex-col items-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-purple-100 bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={formik.values.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User size={55} className="text-gray-400" />
                    </div>
                  )}
                </div>

                <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Upload size={16} />
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      // const imageUrl = URL.createObjectURL(file);
                      const resp = await uploadFile("staff", file);

                      formik.setFieldValue("profileUrl", resp.fileName);
                      setImageUrl(resp.imageUrl);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* BASIC INFORMATION */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-2">
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              {/* GENDER */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select Gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </select>

                {formik.touched.gender && formik.errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.gender}
                  </p>
                )}
              </div>

              {/* DOB */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="dob"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {formik.touched.dob && formik.errors.dob && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.dob}
                  </p>
                )}
              </div>

              {/* DESIGNATION */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Designation
                </label>

                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="designation"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                {formik.touched.designation && formik.errors.designation && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.designation}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= JOB INFORMATION ================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Job Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage role, experience, salary and employment details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* ROLE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="">Select Role</option>

                {role && <option value={role.id}>{role.role}</option>}
              </select>

              {formik.touched.role && formik.errors.role && (
                <p className="mt-1 text-sm text-red-500">
                  {/* {formik.errors.role} */}
                </p>
              )}
            </div>

            {/* EXPERIENCE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. 3 Years"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

              {formik.touched.experience && formik.errors.experience && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.experience}
                </p>
              )}
            </div>

            {/* JOINING DATE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={formik.values.joiningDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

              {formik.touched.joiningDate && formik.errors.joiningDate && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.joiningDate}
                </p>
              )}
            </div>

            {/* SALARY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter salary"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

              {formik.touched.salary && formik.errors.salary && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.salary}
                </p>
              )}
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formik.values.status ? "true" : "false"}
                onChange={(e) => {
                  formik.setFieldValue("status", e.target.value === "true");
                }}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="true">Active</option>

                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= ADDRESS ================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>

            <p className="mt-1 text-sm text-gray-500">
              Update the staff member's address.
            </p>
          </div>

          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-4 text-gray-400" />

            <textarea
              rows={4}
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full resize-none rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {formik.touched.address && formik.errors.address && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
          )}
        </div>

        {/* ================= LOGIN DETAILS ================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Login Details
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Update login credentials if required.
            </p>
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {/* PASSWORD */}

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
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl bg-purple-50 p-4">
            <ShieldCheck size={20} className="mt-0.5 text-purple-600" />

            <p className="text-sm text-purple-700">
              Leave the password field empty if you don't want to change the
              existing password.
            </p>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowAddStaff("view")}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-7 py-3 font-medium text-white shadow-sm hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formik.isSubmitting ? "Updating..." : "Update Staff"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditStaff;
