import { ImagePlus } from "lucide-react";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadFile } from "../utils/file.uploader";
import axiosInstance from "../utils/Axios.instance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const HomePageManagement = () => {
  // const [description, setDescription] = useState("");
  const { hasPermission } = useAuth();
  const [bannerImage, setBannerImage] = useState<any>();
  const [subBannerImage, setSubBannerImage] = useState<any>();

  const formik = useFormik({
    initialValues: {
      bannerImageUrl: "",
      subBannerImageUrl: "",

      heroHeading: "",
      heroDescription: "",

      aboutHeading: "",
      aboutDescription: "",
    },

    validationSchema: Yup.object({
      heroHeading: Yup.string().required("Hero heading is required"),
      heroDescription: Yup.string().required("Hero description is required"),
      aboutHeading: Yup.string().required("About heading is required"),
      aboutDescription: Yup.string().required("About description is required"),
    }),

    onSubmit: async (values) => {
      console.log("Formik Submit");

      console.log(values);
      const homeData = {
        bannerUrl: values.bannerImageUrl,
        subBannerUrl: values.subBannerImageUrl,
        title: values.heroHeading,
        description: values.heroDescription,
        subHeading: values.aboutHeading,
        subDescription: values.aboutDescription,
      };

      try {
        const response = await axiosInstance.patch(`/home/${3}`, homeData);
        toast.success("Update Successfully");
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      // await axiosInstance.post("/home-page", values);
    },
  });

  useEffect(() => {
    const fatch = async () => {
      const resp = await axiosInstance.get("home");
      const data = resp.data[0];
      formik.setValues({
        bannerImageUrl: data.bannerUrl.replace(
          import.meta.env.VITE_APP_URL,
          "",
        ),
        subBannerImageUrl: data.subBannerUrl.replace(
          import.meta.env.VITE_APP_URL,
          "",
        ),
        heroHeading: data.title,
        heroDescription: data.description,
        aboutHeading: data.subHeading,
        aboutDescription: data.subDescription,
      });
      setBannerImage(data.bannerUrl);
      setSubBannerImage(data.subBannerUrl);
    };
    fatch();
  }, []);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-screen bg-slate-100 p-6"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Home Page Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage the content displayed on the website home page.
          </p>
        </div>

        {/* Banner Section */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Banner Section
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Upload the main banner image.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
            <ImagePlus size={42} className="text-gray-400" />
            {bannerImage && <img src={bannerImage} alt="" />}
            {hasPermission("home", "update") && (
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const resp = await uploadFile("Home", file);

                  formik.setFieldValue("bannerImageUrl", resp.fileName);
                  setBannerImage(resp.imageUrl);
                  console.log(resp);
                }}
              />
            )}

            {/* <p className="mt-3 text-sm font-medium">
              Click to upload banner image
            </p> */}

            <span className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP</span>
          </label>
          <div className="mt-6 flex justify-end">
            {/* <button
              type="button"
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save Banner
            </button> */}
          </div>
        </div>

        {/* Sub Banner */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">Sub Banner</h2>

            <p className="mt-2 text-sm text-gray-500">
              Upload the secondary banner image.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
            <ImagePlus size={42} className="text-gray-400" />
            {subBannerImage && <img src={subBannerImage} alt="" />}
            {hasPermission("home", "update") && (
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const resp = await uploadFile("Home", file);
                  formik.setFieldValue("subBannerImageUrl", resp.fileName);
                  setSubBannerImage(resp.imageUrl);
                }}
              />
            )}

            <p className="mt-3 text-sm font-medium">
              Click to upload sub banner
            </p>

            <span className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP</span>

            {/* <input type="file" className="hidden" /> */}
          </label>
          <div className="mt-6 flex justify-end">
            {/* <button
              type="button"
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save Sub Banner
            </button> */}
          </div>
        </div>

        {/* Hero Content */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Hero Content
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Update the main heading and description.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold">Title</label>

              <RichTextEditor
                label=""
                value={formik.values.heroHeading}
                onChange={(v) => {
                  formik.setFieldValue("heroHeading", v);
                }}
                placeholder="Write description..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Main Description
              </label>

              <RichTextEditor
                label=""
                value={formik.values.heroDescription}
                onChange={(v) => {
                  formik.setFieldValue("heroDescription", v);
                }}
                placeholder="Write description..."
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            {/* <button
              type="button"
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save Hero Content
            </button> */}
          </div>
        </div>

        {/* About Section */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              About Section
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Update the heading and description shown below the banner.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Heading
              </label>

              <RichTextEditor
                label=""
                value={formik.values.aboutHeading}
                onChange={(v) => {
                  formik.setFieldValue("aboutHeading", v);
                }}
                placeholder="Write description..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <RichTextEditor
                label=""
                value={formik.values.aboutDescription}
                onChange={(v) => {
                  formik.setFieldValue("aboutDescription", v);
                }}
                placeholder="Write description..."
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            {/* <button
              type="button"
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save About Section
            </button> */}
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-8 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          {hasPermission("home", "update") && (
            <button
              type="submit"
              onClick={() => {
                console.log("clicked");
              }}
              className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default HomePageManagement;
