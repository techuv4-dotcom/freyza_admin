import { ImagePlus, Trash2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
import { uploadFile } from "../../utils/file.uploader";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export interface TeamMember {
  // id: number;
  name: string;
  position: string;
  experience: string;
  about: string;
  imageUrl: string;
}

interface imageProps {
  images: string[];
  id: number;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  setMembers2: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

const AboutSliderImages = ({
  images,
  id,
  setImages,
  setMembers,
  setMembers2,
}: imageProps) => {
  const { hasPermission } = useAuth();
  const [img, setImg] = useState<string[]>([]);
  const handleDeleteImage = async (index: number) => {
    try {
      // Remove the image from the array
      const updatedImg = img.filter((_, i) => i !== index);
      const updatedImages = images.filter((_, i) => i !== index);

      // Update state
      setImages(updatedImages);

      // Update backend
      await axiosInstance.patch(`/about/${id}`, {
        sliderImagesUrl: updatedImg,
      });

      // console.log(updatedImages);

      toast.success("Image deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete image");
    }
  };
  const fetchAll = async () => {
    // console.log("images are there", images);
    const resp = await axiosInstance.get("/about/images");
    // console.log("resp data slider", resp.data.sliderImagesUrl);
    // console.log(resp.data.teamMembers);

    setImg(resp.data.sliderImagesUrl);
    setMembers2(resp.data.teamMembers);
    // setImg(resp.data.sliderImagesUrl);
    // console.log(
    //   "full response resp.data.sliderImagesUrl",
    //   setImg(resp.data?.[0]?.sliderImagesUrl),
    // );
    // console.log("img data", img);
  };

  useEffect(() => {
    fetchAll();
  }, [img]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            About Slider Images
          </h2>

          <p className="text-sm text-gray-500">Add or remove slider images.</p>
        </div>

        {hasPermission("about", "create") && (
          <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90">
            <ImagePlus size={18} />
            Add Image
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const resp = await uploadFile("about", file);
                // console.log(resp);

                setImages((prev) => [...prev, resp.imageUrl]);
                // const update = setImg(img.push(resp.fileName));

                const response = await axiosInstance.patch(`/about/${id}`, {
                  sliderImagesUrl: [...img, resp.fileName],
                });
                // console.log(response);

                toast.success("Image Added");
                // console.log(response);
              }}
              accept="image/*"
              className="hidden"
            />
          </label>
        )}
      </div>

      {img.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
          No slider images found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image || index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={`${import.meta.env.VITE_APP_URL}${image}`}
                alt={`Slider ${index + 1}`}
                className="h-60 w-full object-cover"
              />

              <div className="flex justify-end border-t p-3">
                {hasPermission("about", "delete") && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteImage(index);
                    }}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutSliderImages;
