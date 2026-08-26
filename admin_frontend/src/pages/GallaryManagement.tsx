import { ImagePlus, Upload, Trash2 } from "lucide-react";
// import { useFormik } from "formik";
import { uploadFile } from "../utils/file.uploader";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/Axios.instance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

interface responseData {
  id: number;
  imageUrl: string;
  type: string;
}

const GalleryManagement = () => {
  const { hasPermission } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [response, setResponse] = useState<responseData[]>([]);
  const fatchAll = async () => {
    const response = await axiosInstance.get("/gallery");
    setResponse(response.data);
    const data = response.data;
    const banner = data.at(0);
    setImageUrl(banner.imageUrl);
    // console.log(data);
  };
  useEffect(() => {
    fatchAll();
    // if (!response.length) return;
    // const set = async () => {
    //   await console.log(setImageUrl(response.at(0)!.imageUrl));
    // };
    // set();
  }, []);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <p className="mt-1 text-gray-500">
          Manage gallery banner and gallery images.
        </p>
      </div>

      {/* Banner Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Gallery Banner</h2>

          <p className="text-gray-500 text-sm">
            Upload or replace the gallery page banner.
          </p>
        </div>

        <div className="h-72 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">No Banner Selected</span>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <label className="cursor-pointer rounded-lg border px-5 py-3 hover:bg-gray-100 flex items-center gap-2">
            <Upload size={18} />
            Choose Banner
            {hasPermission("gallary", "update") && (
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const resp = await uploadFile("gallery", file);
                  setImageName(resp.fileName);
                  setImageUrl(resp.imageUrl);
                }}
              />
            )}
          </label>

          {hasPermission("gallary", "update") && (
            <button
              className="rounded-lg bg-black px-6 py-3 text-white hover:opacity-90"
              onClick={async () => {
                const data = {
                  imageUrl: imageName,
                  type: "banner",
                };
                await axiosInstance.patch(`/gallery/${2}`, data);
                toast.success("Banner Uploaded");
              }}
            >
              Update Banner
            </button>
          )}
        </div>
      </div>

      {/* Gallery Images */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Gallery Images
            </h2>

            <p className="text-sm text-gray-500">
              Add or remove gallery images.
            </p>
          </div>

          {hasPermission("gallary", "create") && (
            <label className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90">
              <ImagePlus size={18} />
              Add Image
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const response = await uploadFile("gallery", file);

                  const data = {
                    imageUrl: response.fileName,
                    type: "other",
                  };
                  await axiosInstance.post("/gallery/", data);
                  toast.success("File Uploaded");
                  fatchAll();
                }}
              />
            </label>
          )}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {response.slice(1).map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              {/* Image Preview */}
              <div className="flex h-52 items-center justify-center bg-gray-100">
                {/* <span className="text-gray-500">Gallery Image</span> */}
                <img src={item.imageUrl} alt="" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4">
                {/* <span className="text-sm text-gray-500">Image {item}</span> */}

                {hasPermission("gallary", "delete") && (
                  <button
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    // onClick={async () => {
                    //   toast.warn("")
                    //   const response = await axiosInstance.delete(
                    //     `/gallery/${item.id}`,
                    //   );
                    //   fatchAll();
                    //   // fatch;
                    // }}
                    onClick={async () => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this image?",
                      );

                      if (!confirmed) return;

                      await axiosInstance.delete(`/gallery/${item.id}`);

                      toast.success("Image deleted successfully.");
                      fatchAll();
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;
