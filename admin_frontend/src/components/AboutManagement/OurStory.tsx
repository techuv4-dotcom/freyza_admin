import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { uploadFile } from "../../utils/file.uploader";
import axiosInstance from "../../utils/Axios.instance";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
interface OurStoryValues {
  bannerUrl: string;
  title: string;
  description: string;
}

export interface TeamMember {
  // id: number;
  name: string;
  position: string;
  experience: string;
  about: string;
  imageUrl: string;
}

interface imageProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

const OurStory = ({ setId, setImages, setMembers }: imageProps) => {
  const { hasPermission } = useAuth();
  const [bannerImage, setBannerImage] = useState("");
  const [aboutId, setAboutId] = useState<number | null>(null);

  const formik = useFormik<OurStoryValues>({
    initialValues: {
      bannerUrl: "",
      title: "",
      description: "",
    },

    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          bannerUrl: values.bannerUrl.replace(import.meta.env.VITE_APP_URL, ""),
          title: values.title,
          description: values.description,
        };

        if (aboutId) {
          await axiosInstance.patch(`about/${aboutId}`, payload);
        } else {
          const response = await axiosInstance.post("about", payload);
          // console.log(response);
        }
        toast.success("Saved Successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axiosInstance.get("about");

        if (!resp.data.length) return;

        const data = resp.data[0];
        // console.log(data);

        setAboutId(data.id);
        if (!data.sliderImagesUrl.length) {
          setImages([]);
        }
        setMembers(data.teamMembers);
        setId(data.id);

        const update = data.sliderImagesUrl.map((url: string) =>
          url.replace(import.meta.env.VITE_APP_URL, ""),
        );
        // url.replace(/^https?:\/\/[^/]+/, ""),)
        const newPath = update.map((url: string) =>
          url.replace(import.meta.env.VITE_APP_URL, ""),
        );
        // console.log(newPath);

        setImages(newPath);
        // setMembers(data?.teamMembers);
        // console.log("team members", data?.teamMembers);

        formik.setValues({
          bannerUrl: data.bannerUrl,
          title: data.title,
          description: data.description,
        });

        setBannerImage(data.bannerUrl);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Banner Section */}

      <h2 className="mb-1 text-xl font-semibold text-gray-800">About Banner</h2>

      <p className="mb-5 text-sm text-gray-500">
        Change about page banner image.
      </p>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
        <ImagePlus size={40} className="text-gray-400" />

        <p className="mt-3 text-sm font-medium">Click to upload image</p>

        <span className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP</span>

        {bannerImage ? (
          <img
            src={bannerImage}
            alt="Banner Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500"></span>
        )}
        {/* </div> */}

        {hasPermission("about", "update") && (
          <input
            type="file"
            accept="image/*"
            // className="mb-8 w-full rounded-lg border border-gray-300 px-4 py-2"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              try {
                const resp = await uploadFile("About", file);

                formik.setFieldValue("bannerUrl", resp.fileName);

                setBannerImage(resp.imageUrl);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        )}
      </label>

      {/* Our Story */}

      <h2 className="mb-1 text-xl font-semibold text-gray-800">Our Story</h2>

      <p className="mb-5 text-sm text-gray-500">
        Update title and description.
      </p>

      <div className="space-y-5">
        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          {formik.touched.title && formik.errors.title && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.title}</p>
          )}
        </div>

        {/* Description */}

        <div>
          <RichTextEditor
            label="Description"
            value={formik.values.description}
            onChange={(value) => {
              formik.setFieldValue("description", value);
            }}
            placeholder="Write description..."
          />

          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          {/* <button
            type="button"
            onClick={() => formik.resetForm()}
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
          >
            Cancel
          </button> */}

          {hasPermission("about", "update") && (
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aboutId ? "Update" : "Save"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default OurStory;
