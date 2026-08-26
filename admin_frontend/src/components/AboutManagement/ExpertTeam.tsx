import { Pencil, Trash2, Users, Eye } from "lucide-react";
import React, { useState } from "react";
import TeamMemberForm from "./TeamMemberForm";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export interface TeamMember {
  // id: number;
  name: string;
  position: string;
  experience: string;
  about: string;
  imageUrl: string;
}

interface MembersProps {
  id: number;
  members: TeamMember[];
  members2: TeamMember[];
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}
const ExpertTeam = ({ id, members, members2, setMembers }: MembersProps) => {
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { hasPermission } = useAuth();

  const handleDeleteMember = async (index: number) => {
    try {
      // Remove the image from the array
      const updatedImg = members.filter((_, i) => i !== index);
      const updatedMembers = members2
        .filter((_, i) => i !== index)
        .map((member) => ({
          ...member,
          imageUrl: member.imageUrl.replace(import.meta.env.VITE_APP_URL, ""),
        }));

      // console.log("updated members", updatedMembers);

      // Update state

      // Update backend
      await axiosInstance.patch(`/about/${id}`, {
        teamMembers: updatedMembers,
      });
      setMembers(updatedImg);

      // console.log(updatedImages);

      toast.success("Image deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete image");
    }
  };
  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setView("edit");
  };

  // console.log("members of expert tea ", members);

  // Render Add Form
  if (view === "add") {
    return (
      <TeamMemberForm
        id={id}
        title="Add Team Member"
        membermain={members2}
        member={null}
        onBack={() => setView("list")}
      />
    );
  }

  // Render Edit Form
  if (view === "edit") {
    return (
      <TeamMemberForm
        id={id}
        membermain={members2}
        title="Edit Team Member"
        member={selectedMember}
        onBack={() => {
          setSelectedMember(null);
          setView("list");
        }}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Expert Team</h2>

          <p className="text-sm text-gray-500">Manage team members.</p>
        </div>

        {hasPermission("about", "update") && (
          <button
            onClick={() => setView("add")}
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
          >
            <Users size={18} />
            Add Member
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">Photo</th>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Position</th>
              <th className="px-5 py-4 text-left">Experience</th>
              {/* <th className="px-5 py-4 text-left">About</th> */}

              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="px-5 py-4">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                  )}
                </td>

                <td className="px-5 py-4 font-medium">{member.name}</td>

                <td className="px-5 py-4 text-gray-600">{member.position}</td>

                <td className="px-5 py-4 text-gray-600">{member.experience}</td>
                {/* <td className="px-5 py-4 text-gray-600">{member.about}</td> */}

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    {hasPermission("about", "update") && (
                      <button
                        onClick={() => handleEdit(member)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>
                    )}

                    {hasPermission("about", "read") && (
                      <button
                        onClick={() => handleEdit(member)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={18} />
                      </button>
                    )}

                    {hasPermission("about", "delete") && (
                      <button
                        onClick={() => handleDeleteMember(1)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpertTeam;
