import { ArrowLeft, ImagePlus } from "lucide-react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../utils/Axios.instance";
import { useFormik } from "formik";
import * as yup from "yup";
import { uploadFile } from "../../utils/file.uploader";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface AddBlogFormProps {
  categorys: categoryValues[];
  content: BlogData;
  setShow: (value: boolean) => void;
  setContent: (value: BlogData) => void;
  setShowEditForm: (value: boolean) => void;
  onUpdate: () => Promise<void>;
}
export interface BlogData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
  serviceCategoryId: number;
  serviceCategoryName: string;
}

interface blogForm {
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
  categoryId: number;
}

interface categoryValues {
  id: number;
  name: string;
}

const UpdateBlog = ({
  categorys,
  setShow,
  content,
  setShowEditForm,
  onUpdate,
}: AddBlogFormProps) => {
  const { hasPermission } = useAuth();
  // const [categroys, setCategorys] = useState<categoryValues[]>();
  // setCategorys(categorys)
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(content.imageUrl);
  }, []);
  const initialValues: blogForm = {
    imageUrl: content.imageUrl,
    title: content.title,
    description: content.description,
    slug: content.slug,
    categoryId: content.serviceCategoryId,
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),

    description: yup.string().required("Description is required"),

    slug: yup.string().required("Slug is required"),

    categoryId: yup
      .number()
      .required("Please select Category")
      .moreThan(0, "Please select Category"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (v) => {
      const formData = {
        imageUrl: v.imageUrl.replace(import.meta.env.VITE_APP_URL, ""),
        title: v.title,
        description: v.description,
        slug: v.slug,
        servicecategory: v.categoryId,
      };
      console.log(formData);

      try {
        await axiosInstance.patch(`/blog/${content.id}`, formData);
        toast.success("Blog Uploaded Successfully");
        setShow(true);
        setShowEditForm(false);
        await onUpdate();
        formik.resetForm();
        setImage("");
      } catch (error) {
        toast.error("Somthing went wrong");
      }
      // console.log(response);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-xl bg-white p-6 shadow-sm"
    >
      {/* Header */}

      <div className="mb-6 border-b pb-4">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => {
              setShow(true);
              setShowEditForm(false);
            }}
            // onClick={onBack}
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

            {hasPermission("blog", "update") && (
              <input
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const resp = await uploadFile("blog", file);
                  formik.setFieldValue("imageUrl", resp.fileName);
                  setImage(resp.imageUrl);
                }}
              />
            )}
          </label>
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-semibold">Category</label>

          <select
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
            name="categoryId"
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
            <p className="text-red-500 text-sm mt-2">
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
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.title}</p>
          )}
        </div>

        {/* Description */}

        <div>
          <RichTextEditor
            label="Blog Content"
            // name="description"
            value={formik.values.description}
            onChange={(value) => {
              formik.setFieldValue("description", value);
            }}
            placeholder="Write your blog content..."
          />
        </div>

        {/* slug */}

        <div>
          <label className="mb-2 block text-sm font-semibold">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="slug"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
            value={formik.values.slug}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.slug && formik.errors.slug && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.slug}</p>
          )}
        </div>

        {/* Button */}

        <div className="flex justify-end">
          {hasPermission("blog", "update") && (
            <button
              type="submit"
              className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Save Blog
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default UpdateBlog;
