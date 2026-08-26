import { ArrowLeft, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios.instance";
import { uploadFile } from "../../utils/file.uploader";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface TeamMember {
  // id: number;
  name: string;
  position: string;
  experience: string;
  about: string;
  imageUrl: string;
}

interface Props {
  membermain: TeamMember[];
  id: number;
  title: string;
  member: TeamMember | null;
  onBack: () => void;
}

const TeamMemberForm = ({ id, title, membermain, member, onBack }: Props) => {
  const { hasPermission } = useAuth();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrlll, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (member) {
      setName(member.name);
      setPosition(member.position);
      setExperience(member.experience);
      setAbout(member.about);
      setPreview(member.imageUrl || null);
    }
  }, [member]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const resp = await uploadFile("about", file);
      setPreview(resp.imageUrl);
      setImageUrl(resp.fileName);
    }
    console.log("resp.filename", imageUrlll);
  };

  const handleSubmit = async () => {
    const data = {
      name,
      position,
      experience,
      about,
      imageUrl: imageUrlll,
    };
    await axiosInstance.patch(`/about/${id}`, {
      teamMembers: [...membermain, data],
    });
    toast.success("Team Member Added Please Refresh");
    onBack();
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          <p className="mt-1 text-gray-500">Fill in the team member details.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="space-y-6">
          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Member Image
            </label>

            <div className="flex items-center gap-6">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-28 w-28 rounded-full border object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-100">
                  <ImagePlus size={28} />
                </div>
              )}

              {hasPermission("about", "update") && (
                <label className="cursor-pointer rounded-lg bg-black px-5 py-3 text-white hover:opacity-90">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Position */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Position
            </label>

            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Years of Experience
            </label>

            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Example: 5 Years"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
          {/* about */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              About
            </label>

            <input
              type="longtext"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About member"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {hasPermission("about", "update") && (
              <button
                onClick={handleSubmit}
                className="rounded-lg bg-black px-6 py-3 text-white hover:opacity-90"
              >
                Save Member
              </button>
            )}

            <button
              onClick={onBack}
              className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberForm;
