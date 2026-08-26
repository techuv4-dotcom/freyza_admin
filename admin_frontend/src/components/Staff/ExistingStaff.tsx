import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  UserRound,
  Eye,
  Crown,
  UsersRound,
  Activity,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import Header from "../Header";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

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

// interface roleData {
//   id: number;
//   role: string;
// }

interface roleData {
  id: number;
  role: string;
  // users: staffData[];
}

interface roleData2 {
  id: number;
  role: string;
}

interface Props {
  setShowAddStaff: React.Dispatch<
    React.SetStateAction<"view" | "add" | "edit" | "singleEdit">
  >;
  setRole: React.Dispatch<React.SetStateAction<roleData | null>>;
  setStaff: React.Dispatch<React.SetStateAction<staffData | null>>;
}

const ExistingStaff = ({ setShowAddStaff, setStaff, setRole }: Props) => {
  const { hasPermission } = useAuth();
  const [allUsers, setAllUsers] = useState<staffData[]>([]);
  const [search, setSearch] = useState("");
  const [allRoles, setAllRoles] = useState<roleData[]>([]);
  const [id, setId] = useState(0);
  const [data, setData] = useState<staffData[]>([]);

  // const fetchAll = async () => {
  //   try {
  //     const resp = await axiosInstance.get("/role/roles");
  //     setAllRoles(resp.data.data);
  //   } catch (error) {
  //     toast.error("Failed to load roles");
  //   }
  // };

  const fetchAll = async () => {
    try {
      const resp = await axiosInstance.get("/role/roles");
      const allUsers = await axiosInstance.get("/staff");
      setAllUsers(allUsers.data.data);

      const roles = resp.data.data || [];

      setAllRoles(roles);

      // Find Super Admin role
      // const superAdminRole = roles.find(
      //   (role: roleData) => role.role?.toLowerCase() === "super admin",
      // );

      const superAdminRole = roles.find((role: roleData) => {
        const roleName = role.role?.toLowerCase().replace(/\s+/g, "");

        return roleName === "superadmin";
      });

      if (superAdminRole) {
        // Select Super Admin by default
        setId(superAdminRole.id);

        // Set selected role
        setRole({
          id: superAdminRole.id,
          role: superAdminRole.role,
        });

        // Fetch Super Admin users
        const response = await axiosInstance.get(`/role/${superAdminRole.id}`);

        setData(response.data.data.users || []);
      }
    } catch (error) {
      toast.error("Failed to load roles");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* -----------------------------
     Statistics
  ----------------------------- */

  const totalUsers = allUsers.length;

  const activeUsers = allUsers.filter((user) => user.status === true).length;

  const managerCount = allUsers.filter(
    (user) => user.role.role.toLowerCase() === "manager",
  ).length;

  /* -----------------------------
     Search
  ----------------------------- */

  const filteredUsers = useMemo(() => {
    if (!search.trim()) {
      return data;
    }

    const searchValue = search.toLowerCase();

    return data.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchValue) ||
        member.email?.toLowerCase().includes(searchValue) ||
        member.phone?.toLowerCase().includes(searchValue),
    );
  }, [data, search]);

  /* -----------------------------
     Status style
  ----------------------------- */

  const getStatusStyle = (status: boolean) => {
    return status
      ? "bg-green-50 text-green-700 border border-green-100"
      : "bg-red-50 text-red-600 border border-red-100";
  };

  /* -----------------------------
     Role selection
  ----------------------------- */

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const currentRoleId = Number(e.target.value);

      setId(currentRoleId);
      setSearch("");

      if (!currentRoleId) {
        setData([]);
        setRole(null);
        return;
      }

      const selectedRole = allRoles.find((role) => role.id === currentRoleId);

      if (selectedRole) {
        setRole({
          id: selectedRole.id,
          role: selectedRole.role,
        });
      }

      const response = await axiosInstance.get(`/role/${currentRoleId}`);

      setData(response.data.data.users || []);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  /* -----------------------------
     Delete User
  ----------------------------- */

  const handleDelete = async (member: staffData) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`,
    );

    if (!confirmed) return;

    try {
      const response = await axiosInstance.delete(`/staff/${member.id}`);

      if (response.data.statusCode === 200) {
        toast.success(response.data.message);

        if (id) {
          const response2 = await axiosInstance.get(`/role/${id}`);

          setData(response2.data.data.users || []);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <>
      {/* <Header title="Users Management" /> */}

      <main className="min-h-screen bg-gray-50/50 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* =====================================
              PAGE HEADER
          ====================================== */}

          <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50">
                <UsersRound size={28} className="text-purple-700" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  Users Management
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Manage salon team members and their roles.
                </p>
              </div>
            </div>

            {hasPermission("users", "create") && (
              <button
                onClick={() => setShowAddStaff("add")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <Plus size={18} />
                Add User
              </button>
            )}
          </div>

          {/* =====================================
              BREADCRUMB
          ====================================== */}

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Dashboard</span>

            <ChevronRight size={16} className="text-gray-400" />

            <span className="font-medium text-purple-700">
              Users Management
            </span>
          </div>

          {/* =====================================
              STATISTICS
          ====================================== */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Total Users */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                  <UsersRound size={24} className="text-purple-700" />
                </div>

                <UsersRound size={20} className="text-gray-400" />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-gray-500">Total Users</p>

                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {totalUsers}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  All registered users
                </p>
              </div>
            </div>

            {/* Managers */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                  <Crown size={24} className="text-gray-700" />
                </div>

                <Crown size={20} className="text-gray-400" />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-gray-500">Managers</p>

                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {managerCount}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Users with manager role
                </p>
              </div>
            </div>

            {/* Active Users */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                  <Activity size={24} className="text-gray-700" />
                </div>

                <Activity size={20} className="text-gray-400" />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-gray-500">
                  Active Users
                </p>

                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {activeUsers}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Currently active users
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
              SEARCH + ROLE FILTER
          ====================================== */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Search */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Search Users
                </label>

                <div className="relative">
                  <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>

              {/* Role */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Filter by Role
                </label>

                {/* <select
                  value={id}
                  onChange={handleRoleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value={0}>All Roles</option>

                  {allRoles.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select> */}
                {/* <select
                  value={id}
                  onChange={handleRoleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value={0}>All Roles</option>

                  {allRoles.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select> */}

                <select
                  value={id}
                  onChange={handleRoleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  {allRoles.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* =====================================
              USERS TABLE
          ====================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {/* Table Header */}

                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="w-16 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((member, index) => (
                      <tr
                        key={member.id}
                        className="transition hover:bg-gray-50/70"
                      >
                        {/* Number */}

                        <td className="px-6 py-5 text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>

                        {/* User */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            {member.profileUrl ? (
                              <img
                                src={`${import.meta.env.VITE_APP_URL}${member.profileUrl}`}
                                alt={member.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <UserRound
                                  size={19}
                                  className="text-gray-500"
                                />
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-gray-900">
                                {member.name}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-500">
                                {member.role?.role}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {member.email}
                        </td>

                        {/* Phone */}

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {member.phone}
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                              member.status,
                            )}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                member.status ? "bg-green-500" : "bg-red-500"
                              }`}
                            />

                            {member.status ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-2">
                            {/* View */}

                            <button
                              title="View User"
                              onClick={() => {
                                setShowAddStaff("edit");
                                setStaff(member);
                              }}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                            >
                              <Eye size={18} />
                            </button>

                            {/* Edit */}

                            {hasPermission("users", "update") && (
                              <button
                                title="Edit User"
                                onClick={() => {
                                  setShowAddStaff("singleEdit");
                                  setStaff(member);
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                              >
                                <Pencil size={17} />
                              </button>
                            )}

                            {/* Delete */}

                            {hasPermission("users", "delete") && (
                              <button
                                title="Delete User"
                                onClick={() => handleDelete(member)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 transition hover:bg-red-50"
                              >
                                <Trash2 size={17} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                            <UsersRound size={25} className="text-gray-400" />
                          </div>

                          <h3 className="mt-4 text-sm font-semibold text-gray-800">
                            No users found
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Try selecting another role or changing your search.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* =====================================
                TABLE FOOTER
            ====================================== */}

            <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {filteredUsers.length}
                </span>{" "}
                users
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={17} />
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-700 text-sm font-medium text-white">
                  1
                </button>

                <button
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* =====================================
              ROLE BASED ACCESS INFO
          ====================================== */}

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-700">
                <ShieldCheck size={22} className="text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Role Based Access
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Manage user roles and permissions to control access to
                  different modules in the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExistingStaff;
