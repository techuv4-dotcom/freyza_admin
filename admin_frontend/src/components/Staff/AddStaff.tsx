import { ArrowLeft, UploadCloud } from "lucide-react";
// import Header from "../components/Header";
import Header from "../Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadFile } from "../../utils/file.uploader";
import React, { useState } from "react";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";

interface staffData {
  profileUrl: string;

  name: string;

  email: string;

  phone: string;

  gender: string;

  dob: string;

  designation: string;

  // role: string;

  experience: string;

  password: string;

  joiningDate: string;

  salary: string;

  status: boolean;

  address: string;
}

interface roleData {
  id: number;
  role: string;
}

interface Props {
  setShowAddStaff: React.Dispatch<
    React.SetStateAction<"view" | "add" | "edit" | "singleEdit">
  >;
  role: roleData | null;
}

const AddStaff = ({ setShowAddStaff, role }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const initialValues: staffData = {
    profileUrl: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    designation: "",
    // role: "",
    password: "",
    experience: "",
    joiningDate: "",
    salary: "",
    status: true,
    address: "",
  };

  const validationSchema = Yup.object({
    // profileUrl: Yup.string()
    //   .url("Enter a valid URL")
    //   .required("Profile image is required"),

    name: Yup.string().trim().required("Name is required"),

    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),

    gender: Yup.string().oneOf(
      ["Male", "Female", "Other"],
      "Select a valid gender",
    ),
    // .required("Gender is required"),

    dob: Yup.date(),

    password: Yup.string()
      // .password("Enter a valid email")
      .required("Password is required"),

    designation: Yup.string().trim().required("Designation is required"),

    experience: Yup.string().trim(),

    joiningDate: Yup.date(),

    salary: Yup.number()
      .typeError("Salary must be a number")
      .positive("Salary must be greater than 0"),

    status: Yup.boolean().required("Status is required"),

    address: Yup.string().trim(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (v) => {
      console.log("form submitted");
      console.log("values", formik.values);
      console.log("error", formik.errors);

      const formData = {
        profileUrl: v.profileUrl,
        name: v.name,
        email: v.email,
        phone: v.phone,
        gender: v.gender,
        password: v.password,
        // role:role?.id,
        dob: v.dob || undefined,
        designation: v.designation,
        role: Number(role?.id),
        experience: v.experience,
        joiningDate: v.joiningDate || undefined,
        salary: String(v.salary),
        status: v.status,
        address: v.address,
      };
      try {
        const resp = await axiosInstance.post("/staff", formData);
        toast.success(resp.data.message);
        console.log(resp.data);
        console.log(formData);
      } catch (error: any) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("MESSAGE:", error.response?.data?.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      {/* <Header title="Add Staff" /> */}

      <main className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              // className="mb-3 flex items-center gap-2 text-sm text-gray-500 hover:text-black"
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-purple-100 hover:text-purple-600"
              onClick={() => setShowAddStaff("view")}
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Back
            </button>

            <h2 className="text-3xl font-bold text-gray-800">Add New User</h2>

            <p className="mt-2 text-gray-500">
              Fill the details below to add a new {role?.role} member.
            </p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]"> */}
              {/* Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Profile Image
                </label>

                <label className="flex h-60 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-purple-500 hover:bg-purple-50">
                  <UploadCloud size={42} className="mb-3 text-purple-600" />
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-full w-full rounded-2xl object-cover"
                  />
                  <input
                    type="file"
                    name="profileUrl"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const resp = await uploadFile("staff", file);
                      setImageUrl(resp.imageUrl);
                      formik.setFieldValue("profileUrl", resp.fileName);
                    }}
                  />

                  <p className="font-medium text-gray-700">Upload Image</p>

                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG (Max 2MB)
                  </p>
                </label>
              </div>

              {/* Inputs */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                    placeholder="Enter full name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number *
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                    placeholder="+91"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Gender
                  </label>

                  <select
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.gender}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.dob}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Job Information
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Designation *
                </label>

                <input
                  type="text"
                  name="designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Hair Stylist"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                />
                {formik.touched.designation && formik.errors.designation && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.designation}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Role *</label>

                <select
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                  name="role"
                  // value={formik.values.role}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                >
                  <option value="">{role?.role}</option>
                </select>
                {/* {formik.touched.role && formik.errors.role && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.role}
                  </p>
                )} */}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="5 Years"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                />
                {formik.touched.experience && formik.errors.experience && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.experience}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  value={formik.values.joiningDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                />
                {formik.touched.joiningDate && formik.errors.joiningDate && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.joiningDate}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Salary</label>

                <input
                  type="number"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="₹ 30,000"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                />
                {formik.touched.salary && formik.errors.salary && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.salary}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>

                <select
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                  name="status"
                  value={formik.values.status ? "true" : "false"}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.value === "true")
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.status}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Address
            </h3>

            <textarea
              rows={4}
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter full address..."
              className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-purple-500"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors.address}
              </p>
            )}
          </div>

          {/* Login details */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Login Credentials
            </h3>

            <p className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
              These credentials will be used by the staff member to log in to
              the admin panel. Share them securely with the user.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500"
                  placeholder="Enter email address"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </label>

                <input
                  // type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500"
                  placeholder="Enter temporary password"
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-red-800">
              Login Details
            </h3>
            <h5>you are creating login credentials</h5>
            <br />
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>

              <input
                type="email"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500"
                placeholder="Enter email"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div> */}

          {/* Footer */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={() => console.log("Button clicked")}
              className="rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-8 py-3 font-medium text-white shadow-md transition hover:opacity-90"
            >
              Save Staff
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddStaff;
