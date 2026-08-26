import { ArrowLeft, ImageIcon, ImagePlus, Plus, Trash2 } from "lucide-react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { uploadFile } from "../../utils/file.uploader";
import { useAuth } from "../../context/AuthContext";

interface ServiceCategoryFormProps {
  onBack: () => void;
  categoryId: number;
}

interface ServiceCategoryFormValues {
  name: string;
  imageUrl: string;
  iconUrl: string;
  title: string;
  description: string;
  shortDescription: string;
  slug: string;
  activeStatus: boolean;
}

interface HeadingFormValues {
  subHeading: string;
  subDescription: string;
}

const EditServiceCategoryForm = ({
  onBack,
  categoryId,
}: ServiceCategoryFormProps) => {
  const { hasPermission } = useAuth();
  const [showAddHeadingForm, setShowAddHeadingForm] = useState(false);
  const [sections, setSection] = useState<any[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const [showIcon, setShowIcon] = useState("");

  const initialValues: ServiceCategoryFormValues = {
    name: "",
    imageUrl: "",
    iconUrl: "",
    title: "",
    description: "",
    shortDescription: "",
    slug: "",
    activeStatus: true,
  };

  const validationSchema = yup.object({
    name: yup.string().required("Category name is required"),
    imageUrl: yup.string().required("Image is required"),
    iconUrl: yup.string().required("Icon is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    slug: yup.string().required("Slug is required"),
    activeStatus: yup.boolean().required(),
  });

  const subHeadinginitialValues: HeadingFormValues = {
    subHeading: "",
    subDescription: "",
  };

  const subHeadingValidationSchema = yup.object({
    subHeading: yup.string().required("This feild is required"),

    subDescription: yup.string().required("This feild is required"),
  });
  const headingFormik = useFormik({
    initialValues: subHeadinginitialValues,
    validationSchema: subHeadingValidationSchema,

    onSubmit: async (v) => {
      const addHeadingData = {
        heading: v.subHeading,
        description: v.subDescription,
        serviceCategoryId: categoryId,
      };
      // console.log("data added");
      // console.log(categoryId);

      await axiosInstance.post(`/service-category/heading`, addHeadingData);
      toast.success("Heading added ");
      headingFormik.resetForm();

      // console.log(response);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (v) => {
      console.log(v);

      const serviceCategoryFormValuse = {
        name: v.name,
        imageUrl: v.imageUrl,
        iconUrl: v.iconUrl,
        title: v.title,
        description: v.description,
        shortDescription: v.shortDescription,
        activeStatus: v.activeStatus,
      };

      const response = await axiosInstance.patch(
        `service-category/${categoryId}`,
        serviceCategoryFormValuse,
      );
      toast.success("Updated Successfully");
      console.log(response);
    },
  });

  useEffect(() => {
    const findOne = async () => {
      const resp = await axiosInstance.get(`service-category/${categoryId}`);

      const data = resp.data;
      setImgUrl(data.imageUrl);
      setShowIcon(data.iconUrl);
      formik.setValues({
        name: data.name,
        imageUrl: data.imageUrl.replace(import.meta.env.VITE_APP_URL, ""),
        iconUrl: data.iconUrl.replace(import.meta.env.VITE_APP_URL, ""),
        title: data.title,
        description: data.description,
        shortDescription: data.shortDescription,
        slug: data.slug,
        activeStatus: data.activeStatus,
      });

      setSection(data.headings || []);
    };

    findOne();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-bold">Edit Service Category</h1>

              <p className="mt-1 text-sm text-gray-500">
                Update service category information.
              </p>
            </div>
          </div>
        </div>

        {/* Main Form */}

        <form onSubmit={formik.handleSubmit}>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold">Category Details</h2>

              <p className="mt-1 text-sm text-gray-500">
                Update all category information below.
              </p>
            </div>

            <div className="grid gap-8">
              {/* Image */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 hover:border-black">
                  <ImagePlus size={40} className="text-gray-400" />

                  <p className="mt-3 font-medium">Click to upload image</p>

                  <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>

                  <img
                    src={`${imgUrl}`}
                    alt=""
                    className="mt-5 h-40 w-40 rounded-lg object-cover border"
                  />

                  {hasPermission("category", "update") && (
                    <input
                      type="file"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const resp = await uploadFile("serviceCategory", file);
                        formik.setFieldValue("imageUrl", resp.fileName);
                        setImgUrl(resp.imageUrl);
                      }}
                      className="hidden"
                    />
                  )}
                </label>

                {formik.touched.imageUrl && formik.errors.imageUrl && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.imageUrl}
                  </p>
                )}
              </div>

              {/* Icon */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category Icon
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 hover:border-black">
                  <ImageIcon size={36} className="text-gray-400" />

                  <p className="mt-3 font-medium">Click to upload icon</p>

                  <span className="text-xs text-gray-500">PNG, SVG, WEBP</span>

                  {formik.values.iconUrl && (
                    <img
                      src={showIcon}
                      alt=""
                      className="mt-5 h-32 w-32 rounded-lg border object-cover"
                    />
                  )}

                  {hasPermission("category", "update") && (
                    <input
                      type="file"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const resp = await uploadFile("serviceCategory", file);
                        formik.setFieldValue("iconUrl", resp.fileName);
                        setShowIcon(resp.imageUrl);
                      }}
                      className="hidden"
                    />
                  )}
                </label>

                {formik.touched.iconUrl && formik.errors.iconUrl && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.iconUrl}
                  </p>
                )}
              </div>

              {/* Name */}

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
                  className="w-full rounded-lg border p-3 outline-none focus:border-black"
                />

                {formik.touched.name && formik.errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.name}
                  </p>
                )}
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
                  className="w-full rounded-lg border p-3 outline-none focus:border-black"
                />

                {formik.touched.title && formik.errors.title && (
                  <p className="mt-2 text-sm text-red-500">
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
                  value={formik.values.description}
                  onChange={(value) =>
                    formik.setFieldValue("description", value)
                  }
                />

                {formik.touched.description && formik.errors.description && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              {/* shortdescription */}
              {/* <div>
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
              </div> */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  ShortDescription
                </label>

                <input
                  type="text"
                  name="shortDescription"
                  value={formik.values.shortDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border p-3 outline-none focus:border-black"
                />

                {formik.touched.shortDescription &&
                  formik.errors.shortDescription && (
                    <p className="mt-2 text-sm text-red-500">
                      {formik.errors.shortDescription}
                    </p>
                  )}
              </div>

              {/* Slug section */}

              <div>
                <label className="mb-2 block text-sm font-semibold">Slug</label>

                <input
                  type="text"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border p-3 outline-none focus:border-black"
                />

                {formik.touched.slug && formik.errors.slug && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.slug}
                  </p>
                )}
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Status
                </label>

                <select
                  name="activeStatus"
                  value={formik.values.activeStatus ? "true" : "false"}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "activeStatus",
                      e.target.value === "true",
                    )
                  }
                  className="w-full rounded-lg border p-3 outline-none focus:border-black"
                >
                  <option value="true">Active</option>

                  <option value="false">Inactive</option>
                </select>
              </div>
              {/* Save Button */}

              <div className="flex justify-end pt-4">
                {hasPermission("category", "update") && (
                  <button
                    type="submit"
                    className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Content Sections */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Content Sections
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage additional headings for this category.
              </p>
            </div>

            {!showAddHeadingForm && hasPermission("category", "create") && (
              <button
                type="button"
                onClick={() => setShowAddHeadingForm(true)}
                className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
              >
                <Plus size={18} />
                Add Heading
              </button>
            )}
          </div>

          {!showAddHeadingForm && (
            <div className="space-y-4">
              {sections.length > 0 ? (
                sections.map((section: any, index: number) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-5"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">
                        {index + 1}. {section.heading}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Click edit to update this heading.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {hasPermission("category", "update") && (
                        <button
                          type="button"
                          className="rounded-lg border border-blue-300 px-4 py-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          Edit
                        </button>
                      )}

                      {hasPermission("category", "delete") && (
                        <button
                          type="button"
                          onClick={async () => {
                            const resp = await axiosInstance.delete(
                              `/service-category/${categoryId}/headings/${section.id}`,
                            );
                            toast.success("Heading Deleted");
                            console.log(resp.data.message);
                          }}
                          className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
                  No headings added yet.
                </div>
              )}
            </div>
          )}

          {/* Add Heading Form */}

          {showAddHeadingForm && (
            <form
              onSubmit={headingFormik.handleSubmit}
              className="rounded-xl border border-gray-200 p-6"
            >
              <h3 className="mb-5 text-lg font-semibold">Add New Heading</h3>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Heading
                  </label>

                  <input
                    type="text"
                    name="subHeading"
                    value={headingFormik.values.subHeading}
                    onChange={headingFormik.handleChange}
                    onBlur={headingFormik.handleBlur}
                    placeholder="Enter heading"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                  />
                  {headingFormik.touched.subHeading &&
                    headingFormik.errors.subHeading && (
                      <p className="text-red-500 text-sm mt-2">
                        {headingFormik.errors.subHeading}
                      </p>
                    )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Description
                  </label>

                  <RichTextEditor
                    value={headingFormik.values.subDescription}
                    onChange={(value) => {
                      headingFormik.setFieldValue("subDescription", value);
                      headingFormik.setFieldTouched("subDescription", true);
                    }}
                  />
                  {/* {headingFormik.touched.subDescription &&
                    headingFormik.errors.subDescription && (
                      <p className="text-red-500 text-sm mt-2">
                        {headingFormik.errors.subDescription}
                      </p>
                    )} */}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddHeadingForm(false)}
                    className="rounded-lg border border-gray-300 px-6 py-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  {hasPermission("category", "update") && (
                    <button
                      type="submit"
                      className="rounded-lg bg-black px-6 py-2 text-white hover:bg-gray-800"
                    >
                      Save Heading
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditServiceCategoryForm;
