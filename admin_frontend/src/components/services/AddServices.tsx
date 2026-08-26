import { ArrowLeft, ImagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios.instance";
import { useFormik } from "formik";
import * as yup from "yup";
import { uploadFile } from "../../utils/file.uploader";
import { toast } from "react-toastify";

interface AddServiceProps {
  // service: any;
  onBack: () => void;
}

interface addServiceFormValues {
  serviceCategoryId: number;
  group: string;
  imageUrl: string;
  name: string;
  duration: string;
  price: number;
  about: string;
  activeStatus: boolean;
}

interface uploadFileResponse {
  // fileName:string,
  imageUrl: string;
}

const AddService = ({ onBack }: AddServiceProps) => {
  const [imageName, setImageName] = useState<uploadFileResponse | null>(null);
  // const [data,setData]=useState<any>()
  // console.log("this is service", service);
  const [data, setData] = useState<any>();
  // const [useData , ]
  useEffect(() => {
    const findServiceCategory = async () => {
      const response = await axiosInstance.get(`/service-category/name`);
      // console.log(response);
      setData(response.data);
      // setData(response.data);
    };
    findServiceCategory();
  }, []);
  const initialValues: addServiceFormValues = {
    serviceCategoryId: 0,
    group: "",
    imageUrl: "",
    name: "",
    duration: "",
    price: 1,
    about: "",
    activeStatus: true,
  };

  const validationSchema = yup.object({
    group: yup.string().required("Section is required"),
    // imageUrl: yup.string().required("Image is required"),
    name: yup.string().required("Name is required"),
    duration: yup.string().required("Duration is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(0, "Price must be greater than 0")
      .required("Price is required"),
    about: yup.string().required("About is required"),
  });

  const onchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const response = await uploadFile("services", file!);
    formik.setFieldValue("imageUrl", response.fileName);
    setImageName(response);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (v) => {
      const formData = {
        serviceCategoryId: v.serviceCategoryId,
        group: v.group,
        name: v.name,
        imageUrl: v.imageUrl,
        duration: v.duration,
        price: v.price,
        about: v.about,
      };
      console.log("This is form data", formData);

      const formResponse = await axiosInstance.post("services", formData);
      console.log("requested");

      toast.success("Service Added");
      console.log(formResponse);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-screen bg-slate-100 p-6"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-lg border transition hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add Service</h1>

              <p className="mt-1 text-sm text-gray-500">
                Create a new salon service.
              </p>
            </div>
          </div>
        </div>

        {/* Service Details */}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Service Details
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fill all the required information about the service.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Category
              </label>

              {/* <select className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black">
              {data.map((category:any)=>(
                  <option>Hair</option>
                <option>Skin</option>
                ))}
              <select className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"> */}
              <select
                name="serviceCategoryId"
                value={formik.values.serviceCategoryId}
                onChange={formik.handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              >
                <option value="">Select Category</option>
                {data?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Section */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Group</label>
              <select
                name="group"
                value={formik.values.group}
                onChange={formik.handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              >
                <option value="">Select Section</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Service Image */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Service Image
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-black">
                <ImagePlus size={40} className="text-gray-400" />

                <p className="mt-3 text-sm font-medium">
                  Click to upload image
                </p>

                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG, WEBP
                </span>
                {imageName && (
                  <img
                    src={imageName.imageUrl}
                    alt="Category"
                    className="w-40 h-40 object-cover rounded-lg mb-4"
                  />
                )}

                <input
                  type="file"
                  name="imageUrl"
                  onChange={(e) => onchange(e)}
                  onBlur={formik.handleBlur}
                  placeholder="Service Image"
                  className="hidden"
                />
                {formik.touched.imageUrl && formik.errors.imageUrl && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.imageUrl}
                  </p>
                )}
              </label>
            </div>

            {/* Service Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Service Name
              </label>

              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Hair Cut"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Duration */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Duration
              </label>

              <input
                type="text"
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="45 Minutes"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              />
              {formik.touched.duration && formik.errors.duration && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.duration}
                </p>
              )}
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-semibold">Price</label>

              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="999"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.price}
                </p>
              )}
            </div>

            {/* About Service */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                About Service
              </label>

              <textarea
                rows={4}
                name="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write a short description about this service..."
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              />
              {formik.touched.about && formik.errors.about && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.about}
                </p>
              )}
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-semibold">Status</label>

              <select className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
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
            Save Service
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddService;
