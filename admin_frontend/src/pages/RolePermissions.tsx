import { useState } from "react";
// import CreateRole from "../components/RolePermisssions/createRole";
import ExistingSoles from "../components/RolePermisssions/existingRoles";
import CreateRole from "../components/RolePermisssions/createRole";
// import CreateRole from "../components/RolePermisssions/createRole";

const RolePermissions = () => {
  const [showExistingRoles, setShowExistingRoles] = useState(true);
  const [showCreateRole, setShoeCreateRole] = useState(false);

  return (
    <>
      {showExistingRoles && (
        <ExistingSoles
          setShoeCreateRole={setShoeCreateRole}
          setShowExistingRoles={setShowExistingRoles}
        />
      )}

      {showCreateRole && (
        <CreateRole
          setShowExistingRoles={setShowExistingRoles}
          setShoeCreateRole={setShoeCreateRole}
        />
      )}
    </>
  );
};

export default RolePermissions;
