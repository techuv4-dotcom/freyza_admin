import { ArrowLeft, ImagePlus } from "lucide-react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useFormik } from "formik";
import { uploadFile } from "../../utils/file.uploader";
import { useState } from "react";
import * as yup from "yup";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface CategoryValues {
  id: number;
  name: string;
}

interface AddBlogFormProps {
  categorys: CategoryValues[];
  setShow: (value: boolean) => void;
  setShowExistingBlog: (value: boolean) => void;
}

interface blogForm {
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
  categoryId: number;
}

const initialValues: blogForm = {
  imageUrl: "",
  title: "",
  description: "",
  slug: "",
  categoryId: 0,
};

const validationSchema = yup.object({
  imageUrl: yup.string().required("Blog image is required"),

  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(200, "Title must be less than 200 characters"),

  description: yup.string().trim().required("Description is required"),

  slug: yup
    .string()
    .trim()
    .required("Slug is required")
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "Slug can only contain letters, numbers and hyphens (-)",
    ),

  categoryId: yup
    .number()
    .required("Please select a category")
    .moreThan(0, "Please select a category"),
});

const AddBlogForm = ({
  categorys,
  setShow,
  setShowExistingBlog,
}: AddBlogFormProps) => {
  const { hasPermission } = useAuth();
  const [image, setImage] = useState("");
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (v) => {
      const formData = {
        imageUrl: v.imageUrl,
        title: v.title,
        description: v.description,
        slug: v.slug,
        servicecategory: v.categoryId,
      };
      const resp = await axiosInstance.post("/blog", formData);
      toast.success("Blog Added");
      console.log(resp);
    },
  });
  return (
    <form
      className="rounded-xl bg-white p-6 shadow-sm"
      onSubmit={formik.handleSubmit}
    >
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => {
              setShowExistingBlog(true);
              setShow(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Add Blog</h2>

        <p className="mt-2 text-sm text-gray-500">
          Create a new blog post for the Freyza Journal.
        </p>
      </div>

      <div className="space-y-6">
        {/* Blog Image */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Blog Image</label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
            {image && <img src={image} alt="" />}
            <ImagePlus size={42} className="text-gray-400" />

            <p className="mt-3 text-sm font-medium">
              Click to upload blog image
            </p>

            <span className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP</span>

            {
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const resp = await uploadFile("blog", file);
                  formik.setFieldValue("imageUrl", resp.fileName);
                  setImage(resp.imageUrl);
                  formik.setFieldTouched("imageUrl", true);
                }}
                className="hidden"
              />
            }
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <p className="mt-2 text-sm text-red-500">
                {formik.errors.imageUrl}
              </p>
            )}
          </label>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Category</label>

          <select
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
            value={formik.values.categoryId}
            // onBlur={formik.handleBlur}
            onBlur={() => {
              formik.setFieldTouched("categoryId", true);
            }}
            onChange={(e) => {
              formik.setFieldValue("categoryId", Number(e.target.value));
            }}
          >
            <option value="">Select Category</option>

            {categorys?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {formik.touched.categoryId && formik.errors.categoryId && (
            <p className="mt-2 text-sm text-red-500">
              {formik.errors.categoryId}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Title</label>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <RichTextEditor
            label="Blog Content"
            value={formik.values.description}
            onChange={(v) => formik.setFieldValue("description", v)}
            onBlur={() => formik.setFieldTouched("description", true)}
            placeholder="Write your blog content..."
          />

          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Slug</label>

          <input
            type="text"
            placeholder="Slug"
            name="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
          />
          {formik.touched.slug && formik.errors.slug && (
            <p className="mt-2 text-sm text-red-500">{formik.errors.slug}</p>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-end">
          {
            <button
              type="submit"
              className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Save Blog
            </button>
          }
        </div>
      </div>
    </form>
  );
};

export default AddBlogForm;
