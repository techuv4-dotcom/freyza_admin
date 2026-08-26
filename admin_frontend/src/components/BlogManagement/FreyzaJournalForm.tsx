import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios.instance";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface FreyzaJournalFormProps {
  description: string;
  setDescription: (value: string) => void;
}

interface journalData {
  title: string;
  description: string;
}

const FreyzaJournalForm = ({}: FreyzaJournalFormProps) => {
  const { hasPermission } = useAuth();
  const [formValues, setFormValues] = useState<journalData>();

  const fatchjournal = async () => {
    const resp = await axiosInstance.get(`/blog/${1}`);
    console.log(resp.data);
    formik.setFieldValue("title", resp.data.title);
    formik.setFieldValue("description", resp.data.description);

    setFormValues(resp.data);
  };
  const initialValues: journalData = {
    title: formValues?.title ?? "",
    description: formValues?.description ?? "",
  };

  useEffect(() => {
    fatchjournal();
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: async (v) => {
      const formData = {
        imageUrl: "",
        title: v.title,
        description: v.description,
        slug: "",
        servicecategory: null,
      };
      const response = await axiosInstance.patch(`/blog/${1}`, formData);
      toast.success("Journal Updated");
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-xl bg-white p-6 shadow-sm"
    >
      {/* Header */}

      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Freyza Journal Section
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Manage the heading and description displayed on the journal page.
        </p>
      </div>

      <div className="space-y-6">
        {/* Heading */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Journal Heading
          </label>

          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Freyza Journal"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
          />
        </div>

        {/* Description */}

        <div>
          <RichTextEditor
            label="Journal Description"
            value={formik.values.description}
            onChange={(value) => {
              formik.setFieldValue("description", value);
            }}
            placeholder="Write journal description..."
          />
        </div>

        {/* Button */}

        <div className="flex justify-end">
          {hasPermission("blog", "update") && (
            <button
              type="submit"
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

export default FreyzaJournalForm;
