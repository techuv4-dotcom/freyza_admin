// import { ShieldCheck } from "lucide-react";
// import axiosInstance from "../../utils/Axios.instance";
// import { useEffect, useState } from "react";

// interface permissionData {
//   id: number;
//   module: string;
//   permission: string;
//   key: string;
// }

// interface Props {
//   setShowExistingRoles: React.Dispatch<React.SetStateAction<boolean>>;
//   setShoeCreateRole: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const actions = ["View", "Create", "Update", "Delete"];

// export default function CreateRole({
//   setShowExistingRoles,
//   setShoeCreateRole,
// }: Props) {
//   const [permissions, setPermissions] = useState<permissionData[]>();
//   const fetchAll = async () => {
//     const roleResponse = await axiosInstance.get("/role");
//     const permissionsResponse = await axiosInstance.get("/permissions");
//     setPermissions(permissionsResponse.data.data);
//   };
//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const modules = [...new Set(permissions?.map((p) => p.module))];
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow">
//         {/* Header */}
//         <div className="mb-8 flex items-center gap-3">
//           <div className="rounded-xl bg-purple-100 p-3">
//             <ShieldCheck className="text-purple-600" />
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold">Create New Role</h2>
//             <p className="text-gray-500">
//               Create a role and assign permissions.
//             </p>
//           </div>
//         </div>

//         {/* Role Name */}
//         <div className="mb-8">
//           <label className="mb-2 block text-sm font-semibold">Role Name</label>

//           <input
//             type="text"
//             placeholder="Enter role name"
//             className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
//           />
//         </div>

//         {/* Permissions */}

//         <h3 className="mb-5 text-xl font-semibold">Assign Permissions</h3>

//         <div className="grid gap-6 md:grid-cols-2">
//           {/* {modules?.map((module) => (
//             <div
//               //   key={module.key}
//               className="rounded-xl border border-gray-200 p-5"
//             >
//               <h4 className="mb-4 text-lg font-semibold">{module}</h4>

//               <div className="grid grid-cols-2 gap-3">
//                 {permissions?.map((action) => (
//                   <label key={action.id} className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 accent-purple-600"
//                     />

//                     {action.permission}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))} */}
//           {modules?.map((module) => (
//             <div key={module} className="rounded-xl border border-gray-200 p-5">
//               <h4 className="mb-4 text-lg font-semibold capitalize">
//                 {module}
//               </h4>

//               <div className="grid grid-cols-2 gap-3">
//                 {permissions
//                   ?.filter((permission) => permission.module === module)
//                   .map((permission) => (
//                     <label
//                       key={permission.id}
//                       className="flex items-center gap-3"
//                     >
//                       <input
//                         type="checkbox"
//                         className="h-4 w-4 accent-purple-600"
//                       />

//                       <span className="capitalize">
//                         {permission.permission}
//                       </span>
//                     </label>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}

//         <div className="mt-10 flex justify-end gap-4">
//           <button
//             className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100"
//             onClick={() => {
//               setShoeCreateRole(false);
//               setShowExistingRoles(true);
//             }}
//           >
//             Cancel
//           </button>

//           <button className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700">
//             Create Role
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { ShieldCheck } from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PermissionData {
  id: number;
  module: string;
  permission: string;
  key: string;
}

interface Props {
  setShowExistingRoles: React.Dispatch<React.SetStateAction<boolean>>;
  setShoeCreateRole: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRole({
  setShowExistingRoles,
  setShoeCreateRole,
}: Props) {
  const [permissions, setPermissions] = useState<PermissionData[]>([]);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPermissions, setFetchingPermissions] = useState(true);

  // Fetch all permissions
  const fetchAll = async () => {
    try {
      setFetchingPermissions(true);

      const permissionsResponse = await axiosInstance.get("/permissions");

      setPermissions(permissionsResponse.data.data);
    } catch (error: any) {
      console.error("Error fetching permissions:", error);

      toast.error(
        error.response?.data?.message || "Failed to fetch permissions",
      );
    } finally {
      setFetchingPermissions(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Get unique modules
  const modules = [...new Set(permissions.map((p) => p.module))];

  // --------------------------------
  // Individual permission selection
  // --------------------------------

  const handlePermissionChange = (permissionId: number) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      }

      return [...prev, permissionId];
    });
  };

  // --------------------------------
  // Select / Unselect entire module
  // --------------------------------

  const handleModuleSelectAll = (module: string) => {
    const modulePermissions = permissions
      .filter((permission) => permission.module === module)
      .map((permission) => permission.id);

    const allSelected = modulePermissions.every((id) =>
      selectedPermissions.includes(id),
    );

    if (allSelected) {
      // Remove all permissions of this module
      setSelectedPermissions((prev) =>
        prev.filter((id) => !modulePermissions.includes(id)),
      );
    } else {
      // Add all permissions of this module
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...modulePermissions]),
      ]);
    }
  };

  // --------------------------------
  // Check whether all module permissions are selected
  // --------------------------------

  const isModuleFullySelected = (module: string) => {
    const modulePermissions = permissions
      .filter((permission) => permission.module === module)
      .map((permission) => permission.id);

    return (
      modulePermissions.length > 0 &&
      modulePermissions.every((id) => selectedPermissions.includes(id))
    );
  };

  // --------------------------------
  // Check whether some module permissions are selected
  // --------------------------------

  const isModulePartiallySelected = (module: string) => {
    const modulePermissions = permissions
      .filter((permission) => permission.module === module)
      .map((permission) => permission.id);

    const selectedCount = modulePermissions.filter((id) =>
      selectedPermissions.includes(id),
    ).length;

    return selectedCount > 0 && selectedCount < modulePermissions.length;
  };

  // --------------------------------
  // Select all permissions
  // --------------------------------

  const handleSelectAllPermissions = () => {
    const allPermissionIds = permissions.map((permission) => permission.id);

    const allSelected =
      allPermissionIds.length > 0 &&
      allPermissionIds.every((id) => selectedPermissions.includes(id));

    if (allSelected) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissionIds);
    }
  };

  // --------------------------------
  // Check if all permissions selected
  // --------------------------------

  const isAllPermissionsSelected =
    permissions.length > 0 &&
    permissions.every((permission) =>
      selectedPermissions.includes(permission.id),
    );

  // --------------------------------
  // Create Role
  // --------------------------------

  const handleCreateRole = async () => {
    const trimmedRoleName = roleName.trim();

    if (!trimmedRoleName) {
      toast.error("Please enter role name");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        role: trimmedRoleName,
        permissions: selectedPermissions,
      };

      console.log("Create Role Payload:", payload);

      const response = await axiosInstance.post("/role", payload);

      console.log("Create Role Response:", response.data);

      toast.success("Role created successfully");

      // Reset form
      setRoleName("");
      setSelectedPermissions([]);

      // Go back to existing roles
      setShoeCreateRole(false);
      setShowExistingRoles(true);
    } catch (error: any) {
      console.error("Create role error:", error);

      toast.error(error.response?.data?.message || "Failed to create role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3">
            <ShieldCheck className="text-purple-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Create New Role</h2>

            <p className="text-gray-500">
              Create a role and assign permissions.
            </p>
          </div>
        </div>

        {/* Role Name */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold">Role Name</label>

          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter role name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* Permissions Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Assign Permissions</h3>

            <p className="mt-1 text-sm text-gray-500">
              {selectedPermissions.length} of {permissions.length} permissions
              selected
            </p>
          </div>

          {/* Select All */}
          <label className="flex cursor-pointer items-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isAllPermissionsSelected}
              onChange={handleSelectAllPermissions}
              className="h-4 w-4 accent-purple-600"
            />
            Select All
          </label>
        </div>

        {/* Loading */}
        {fetchingPermissions && (
          <div className="py-10 text-center text-gray-500">
            Loading permissions...
          </div>
        )}

        {/* No permissions */}
        {!fetchingPermissions && permissions.length === 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-600">
            No permissions available.
          </div>
        )}

        {/* Permission Modules */}
        {!fetchingPermissions && permissions.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((module) => {
              const modulePermissions = permissions.filter(
                (permission) => permission.module === module,
              );

              const moduleFullySelected = isModuleFullySelected(module);

              const modulePartiallySelected = isModulePartiallySelected(module);

              return (
                <div
                  key={module}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  {/* Module Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold capitalize">
                      {module}
                    </h4>

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={moduleFullySelected}
                        ref={(input) => {
                          if (input) {
                            input.indeterminate = modulePartiallySelected;
                          }
                        }}
                        onChange={() => handleModuleSelectAll(module)}
                        className="h-4 w-4 accent-purple-600"
                      />
                      All
                    </label>
                  </div>

                  {/* Individual Permissions */}
                  <div className="grid grid-cols-2 gap-3">
                    {modulePermissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="h-4 w-4 accent-purple-600"
                        />

                        <span className="capitalize">
                          {permission.permission}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            disabled={loading}
            className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setShoeCreateRole(false);
              setShowExistingRoles(true);
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading || fetchingPermissions}
            onClick={handleCreateRole}
            className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
