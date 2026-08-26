import { ArrowLeft, ImageIcon, ImagePlus, Trash2 } from "lucide-react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { uploadFile } from "../../utils/file.uploader";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/Axios.instance";

interface ServiceCategoryFormProps {
  onBack: () => void;
}

interface ServiceCategoryFormValues {
  name: string;
  imageUrl: string;
  iconUrl: string;
  title: string;
  description: string;
  shortDescription: string;
  subHeading: string;
  subDescription: string;
  slug: string;
  activeStatus: boolean;
}

interface uploadFileResponse {
  fileName: string;
  imageUrl: string;
}

const ServiceCategoryForm = ({ onBack }: ServiceCategoryFormProps) => {
  const [imageFileName, setImageFileName] = useState<uploadFileResponse | null>(
    null,
  );
  const [iconFileName, setIconFileName] = useState<uploadFileResponse | null>(
    null,
  );

  const initialValues: ServiceCategoryFormValues = {
    name: "",
    imageUrl: "",
    iconUrl: "",
    title: "",
    description: "",
    shortDescription: "",
    subHeading: "",
    subDescription: "",
    slug: "",
    activeStatus: true,
  };

  const validationSchema = yup.object({
    name: yup.string().required("This field is required"),

    // imageUrl: yup.string().required("This field is required"),

    // iconUrl: yup.string().required("This field is required"),
    slug: yup.string().required("This feild is required"),

    title: yup.string().required("This field is required"),

    // description: yup.string().required("This field is required"),
    description: yup
      .string()
      .required("Description is required")
      .test("editor-not-empty", "Description is required", (value) => {
        if (!value) return false;

        const parser = new DOMParser();
        const doc = parser.parseFromString(value, "text/html");

        return doc.body.textContent?.trim().length! > 0;
      }),
  });
  const onchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const resp = await uploadFile("serviceCategory", file!);
    setImageFileName(resp);
    // console.log(resp);
    toast.success("Image Uploaded");
  };

  const onchangeIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const resp = await uploadFile("serviceCategory", file!);
    setIconFileName(resp);
    // console.log(resp);
    toast.success("Image Uploaded");
  };
  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (v) => {
      const serviceCategoryData = {
        name: v.name,
        imageUrl: imageFileName?.fileName,
        iconUrl: iconFileName?.fileName,
        title: v.title,
        description: v.description,
        shortDescription: v.shortDescription,
        activeStatus: true,
        slug: v.slug,
        subHeading: v.subHeading,
        subDescription: v.subDescription,
      };

      // console.log(serviceCategoryData);

      const response = await axiosInstance.post(
        "/service-category",
        serviceCategoryData,
      );

      toast.success("Created Successfully");
      formik.resetForm();
      console.log(response);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-8xl space-y-6">
          {/* Header */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* <button className="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100">
                <ArrowLeft size={18} /> */}
                <button
                  type="button"
                  onClick={onBack}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Add Service Category
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Create a new service category for your salon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Details */}
          {/* <form onSubmit={formik.handleSubmit}> */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Category Details
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Fill the basic information about the service category.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Category Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Hair"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Category Image */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
                  <ImagePlus size={40} className="text-gray-400" />

                  <p className="mt-3 text-sm font-medium">
                    Click to upload image
                  </p>

                  <span className="mt-1 text-xs text-gray-500">
                    PNG, JPG, WEBP
                  </span>
                  {imageFileName && (
                    <img
                      src={imageFileName.imageUrl}
                      alt="Category"
                      className="w-40 h-40 object-cover rounded-lg mb-4"
                    />
                  )}

                  <input
                    type="file"
                    name="imageUrl"
                    onChange={(e) => onchange(e)}
                    onBlur={formik.handleBlur}
                    className="hidden"
                  />
                  {formik.touched.imageUrl && formik.errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.imageUrl}
                    </p>
                  )}
                </label>
              </div>

              {/* Category Icon */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category Icon
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-black">
                  <ImageIcon size={36} className="text-gray-400" />

                  <p className="mt-3 text-sm font-medium">
                    Click to upload icon
                  </p>

                  <span className="mt-1 text-xs text-gray-500">
                    PNG, SVG, WEBP (Recommended: 128×128)
                  </span>
                  {iconFileName && (
                    <img
                      src={iconFileName.imageUrl}
                      alt="Category"
                      className="w-40 h-40 object-cover rounded-lg mb-4"
                    />
                  )}

                  <input
                    type="file"
                    name="iconUrl"
                    onChange={(e) => onchangeIcon(e)}
                    onBlur={formik.handleBlur}
                    accept=".png,.svg,.webp"
                    className="hidden"
                  />
                  {formik.touched.iconUrl && formik.errors.iconUrl && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.iconUrl}
                    </p>
                  )}
                </label>
              </div>

              {/* Title */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Professional Hair Care"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <RichTextEditor
                  label=""
                  // name="description"
                  value={formik.values.description}
                  onChange={(value) => {
                    formik.setFieldValue("description", value);
                  }}
                  onBlur={() => {
                    formik.setFieldTouched("description", true);
                  }}
                  placeholder="Write description..."
                />
                {/* {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.description}
                  </p>
                )} */}
              </div>

              {/* shortdescription */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  ShortDescription
                </label>

                <RichTextEditor
                  label=""
                  // name="description"
                  value={formik.values.shortDescription}
                  onChange={(value) => {
                    formik.setFieldValue("shortDescription", value);
                  }}
                  onBlur={() => {
                    formik.setFieldTouched("shortDescription", true);
                  }}
                  placeholder="Write description..."
                />
                {/* {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.description}
                  </p>
                )} */}
              </div>

              {/* slug section */}
              <div>
                <label className="mb-2 block text-sm font-semibold">Slug</label>

                <input
                  type="text"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Professional-Hair-Care"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                />
                {formik.touched.slug && formik.errors.slug && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.slug}
                  </p>
                )}
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Status
                </label>

                <select className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Sections */}

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Content Sections</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add multiple headings with descriptions.
                </p>
              </div>

              {/* <button className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800">
              <Plus size={18} />
              Add Section
            </button> */}
            </div>

            {/* Section Card */}

            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Section 1</h3>

                <button className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Heading
                  </label>

                  <input
                    name="subHeading"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter heading"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                  />
                  {formik.touched.subHeading && formik.errors.subHeading && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.subHeading}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Description
                  </label>

                  <RichTextEditor
                    label=""
                    // name="subDescription"
                    value={formik.values.subDescription}
                    onChange={(value) => {
                      formik.setFieldValue("subDescription", value);
                    }}
                    onBlur={() => {
                      formik.setFieldTouched("subDescription", true);
                    }}
                    placeholder="Write description..."
                  />
                  {}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">
            {/* <button className="rounded-lg border border-gray-300 px-8 py-3 font-medium transition hover:bg-gray-100">
            Cancel */}
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 px-8 py-3 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Save Category
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceCategoryForm;
