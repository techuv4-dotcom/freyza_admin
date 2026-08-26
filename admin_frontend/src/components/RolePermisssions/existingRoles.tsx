import { Plus, ShieldCheck } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";

interface permissionData {
  id: number;
  module: string;
  permission: string;
  key: string;
}

interface roleData {
  id: number;
  role: string;
  permissions: permissionData[];
}

interface Props {
  setShoeCreateRole: React.Dispatch<React.SetStateAction<boolean>>;
  setShowExistingRoles: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ExistingRoles({
  setShoeCreateRole,
  setShowExistingRoles,
}: Props) {
  const [permissions, setPermissions] = useState<permissionData[]>();
  const [roleId, setRoleId] = useState<number>(0);
  const [ids, setIds] = useState<number[]>([]);
  const [role, setRole] = useState<roleData[]>();
  const allPermissionIds = permissions?.map((p) => p.id) ?? [];
  const fetchAll = async () => {
    const roleResponse = await axiosInstance.get("/role");
    setRole(roleResponse.data.data);
    const permissionsResponse = await axiosInstance.get("/permissions");
    setPermissions(permissionsResponse.data.data);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const modules = [...new Set(permissions?.map((p) => p.module))];
  console.log(ids);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <ShieldCheck className="text-purple-600" />
              Role Permissions
            </h2>

            <p className="mt-2 text-gray-500">
              Manage permissions assigned to each role.
            </p>
          </div>

          <button
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
            onClick={() => {
              setShoeCreateRole(true);
              setShowExistingRoles(false);
            }}
          >
            <Plus size={18} />
            Create Role
          </button>
        </div>

        {/* Role Dropdow */}

        <div className="mb-8">
          <label className="mb-2 block font-medium">Select Role</label>

          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            value={roleId}
            onChange={(e) => {
              const currentRoleId = parseInt(e.target.value);
              console.log("current role id", currentRoleId);

              setRoleId(currentRoleId);

              const resp: number[] = [];
              console.log("aall ides", resp);
              if (!role) {
                setRole([]);
              }

              const rs = role?.filter((role) => role.id === currentRoleId);
              rs?.[0].permissions.map((p) => resp.push(p.id));
              setIds(resp);
            }}
          >
            <option value={0} disabled>
              Select Role
            </option>
            {role?.map((role) => (
              <option value={role.id} key={role.id}>
                {role.role}
              </option>
            ))}
          </select>
        </div>

        {/* Permission Cards */}
        <label className="flex items-center gap-3 mb-5">
          Select All
          <input
            type="checkbox"
            checked={
              allPermissionIds.length > 0 &&
              allPermissionIds.every((id) => ids.includes(id))
            }
            onChange={(e) => {
              if (e.target.checked) {
                setIds(allPermissionIds);
              } else {
                setIds([]);
              }
            }}
            className="h-4 w-4 accent-purple-600"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          {modules?.map((module) => (
            <div key={module} className="rounded-xl border border-gray-200 p-5">
              <h4 className="mb-4 text-lg font-semibold capitalize">
                {module}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {permissions
                  ?.filter((permission) => permission.module === module)
                  .map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        key={permission.id}
                        checked={ids.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setIds((prev) => [...prev, permission.id]);
                          } else {
                            setIds((prev) =>
                              prev.filter((id) => id !== permission.id),
                            );
                          }
                          console.log("updatet ides", ids);
                        }}
                        className="h-4 w-4 accent-purple-600"
                      />

                      <span className="capitalize">
                        {permission.permission}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}

        <div className="mt-10 flex justify-end gap-4">
          <button className="rounded-xl border border-gray-300 px-6 py-3">
            Cancel
          </button>

          <button
            className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
            onClick={async () => {
              console.log(`roleId = ${roleId},ids = ${ids}`);

              const resp = await axiosInstance.patch(`/role/${roleId}`, {
                permissions: ids,
              });
              toast.success("Permissions Updated");
              fetchAll();
            }}
          >
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
}
