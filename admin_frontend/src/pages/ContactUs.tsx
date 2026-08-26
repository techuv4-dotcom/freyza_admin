import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { useFormik } from "formik";
// import type { string } from "yup";
import axiosInstance from "../utils/Axios.instance";
import { useEffect, useState } from "react";
import { uploadFile } from "../utils/file.uploader";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

interface contactData {
  id: number;
  imageUrl: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  openingHours: openingHourse[];
  links: links[];
}

interface openingHourse {
  day: string;
  openingTime: string;
  closingTime: string;
  closed: boolean;
}

interface links {
  platform: string;
  url: string;
}

export default function ContactPageManagement() {
  const { hasPermission } = useAuth();
  const [data, setData] = useState<contactData | null>(null);
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [newField, setNewField] = useState(false);
  const [image, setImage] = useState("");
  const fatchAll = async () => {
    const response = await axiosInstance.get("/contact");
    const contact = response.data[0];
    setData(contact);
    setImage(contact.imageUrl);
  };

  useEffect(() => {
    fatchAll();
  }, []);

  const initialValues: contactData = {
    id: data?.id || 0,
    imageUrl: data?.imageUrl.replace(import.meta.env.VITE_APP_URL, "") || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    emailAddress: data?.emailAddress || "",
    openingHours: data?.openingHours || [],
    links: data?.links || [],
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
      const resp = await axiosInstance.patch(
        `/contact/${data?.id}`,
        formik.values,
      );
      console.log(resp);

      toast.success("Update Successfully");
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-screen bg-slate-100 p-6"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Contact Page Management</h1>
          <p className="mt-2 text-gray-500">
            Manage your contact page information.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Banner Image
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
            {image && <img src={image} alt="" />}
            <ImagePlus size={42} className="text-gray-400" />

            <p className="mt-3 text-sm font-medium">
              Click to upload blog image
            </p>

            <span className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP</span>

            {hasPermission("contactus", "update") && (
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const resp = await uploadFile("contact", file);
                  formik.setFieldValue("imageUrl", resp.fileName);
                  setImage(resp.imageUrl);
                }}
              />
            )}
          </label>
        </div>

        {/* Contact Details */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Contact Information</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Address</label>
              <input
                // rows={4}
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500"
                placeholder="Enter Address"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.address}
                </p>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-medium">Contact Number</label>

                <input
                  type="text"
                  name="contactNumber"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500"
                  placeholder="Enter Contact Number"
                />
                {formik.touched.contactNumber &&
                  formik.errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.contactNumber}
                    </p>
                  )}
              </div>

              <div>
                <label className="mb-2 block font-medium">Email Address</label>

                <input
                  type="email"
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500"
                  placeholder="Enter Email"
                />
                {formik.touched.emailAddress && formik.errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.emailAddress}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {formik.values.openingHours.map((item, index) => (
          <div key={index} className="rounded-xl border border-gray-200 p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
              <div>
                <label>Day</label>

                <input
                  type="text"
                  name={`openingHours.${index}.day`}
                  value={formik.values.openingHours[index].day}
                  onChange={formik.handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label>Opening Time</label>

                <input
                  type="text"
                  name={`openingHours.${index}.openingTime`}
                  value={formik.values.openingHours[index].openingTime}
                  onChange={formik.handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label>Closing Time</label>

                <input
                  type="text"
                  name={`openingHours.${index}.closingTime`}
                  value={formik.values.openingHours[index].closingTime}
                  onChange={formik.handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label>Closed</label>

                <input
                  type="checkbox"
                  name={`openingHours.${index}.closed`}
                  checked={formik.values.openingHours[index].closed}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Social Links */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Social Links</h2>
              <p className="text-sm text-gray-500">
                Add your social media links.
              </p>
            </div>

            {hasPermission("contactus", "create") && (
              <button
                className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
                type="button"
                onClick={() => {
                  formik.setFieldValue("links", [
                    ...formik.values.links,
                    {
                      platform: platform,
                      url: url,
                    },
                  ]);
                }}
              >
                <Plus size={18} />
                Add Link
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              {formik.values.links.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-4 lg:grid-cols-[250px_1fr_auto]"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Platform
                    </label>

                    <input
                      type="text"
                      name={`links.${index}.platform`}
                      value={formik.values.links[index].platform}
                      onChange={formik.handleChange}
                      placeholder="Instagram"
                      className="w-full rounded-lg border border-gray-300 p-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      URL
                    </label>

                    <input
                      type="text"
                      name={`links.${index}.url`}
                      value={formik.values.links[index].url}
                      onChange={formik.handleChange}
                      placeholder="https://"
                      className="w-full rounded-lg border border-gray-300 p-3"
                    />
                  </div>

                  {hasPermission("contactus", "delete") && (
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Action
                      </label>

                      <button
                        type="button"
                        onClick={async () => {
                          const updatedLinks = [...formik.values.links];
                          updatedLinks.splice(index, 1);

                          formik.setFieldValue("links", updatedLinks);
                          const payload = {
                            ...formik.values,
                            links: updatedLinks,
                          };
                          await axiosInstance.patch(
                            `/contact/${data?.id}`,
                            payload,
                          );
                        }}
                        className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-red-300 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {newField && (
                <div
                  // key={index}
                  className="grid gap-4 lg:grid-cols-[250px_1fr_auto]"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Platform
                    </label>

                    <input
                      type="text"
                      name=""
                      value={platform}
                      onChange={(e) => {
                        setPlatform(e.target.value);
                      }}
                      placeholder="Instagram"
                      className="w-full rounded-lg border border-gray-300 p-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      URL
                    </label>

                    <input
                      type="text"
                      name="newUrl"
                      value={url}
                      // value={formik.values.links[index].url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                      placeholder="https://"
                      className="w-full rounded-lg border border-gray-300 p-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Action
                    </label>

                    <button
                      type="button"
                      className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-red-300 text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          {hasPermission("contactus", "update") && (
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
