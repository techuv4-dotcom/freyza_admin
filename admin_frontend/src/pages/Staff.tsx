import { useState } from "react";
import AddStaff from "../components/Staff/AddStaff";
import ExistingStaff from "../components/Staff/ExistingStaff";
import ViewStaff from "../components/Staff/ViewStaff";
import EditStaff from "../components/Staff/UpdateStaff";

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
  // users: staffData[];
}

// interface roleData {
//   id: number;
//   role: string;
//   // users:staffData[]
// }

const Staff = () => {
  const [view, setView] = useState<"view" | "add" | "edit" | "singleEdit">(
    "view",
  );
  const [staff, setStaff] = useState<staffData | null>(null);
  const [role, setRole] = useState<roleData | null>(null);

  return (
    <>
      {view == "add" && <AddStaff setShowAddStaff={setView} role={role} />}
      {view == "view" && (
        <ExistingStaff
          setShowAddStaff={setView}
          setStaff={setStaff}
          setRole={setRole}
        />
      )}
      {view == "edit" && (
        <ViewStaff setShowAddStaff={setView} staff={staff} role={role} />
      )}
      {view == "singleEdit" && (
        <EditStaff staff={staff} role={role} setShowAddStaff={setView} />
      )}
    </>
  );
};

export default Staff;
