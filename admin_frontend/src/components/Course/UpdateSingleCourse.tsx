import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { uploadFile } from "../../utils/file.uploader";
// import { uploadFile } from "../../utils/uploadFile";

interface Curriculum {
  module: string;
  data: string[];
}

interface CourseForm {
  title: string;
  shortDescription: string;
  description: string;
  rating: number;
  price: number;
  discountPercentage: number;
  images: string[];
  aboutCourse: string;
  whatYouLearn: string[];
  courseDetails: {
    duration: string;
    batchTiming: string;
    level: string;
    language: string;
    certificate: string;
    placement: string;
  };
  courseCurriculum: Curriculum[];
  status: boolean;
}

interface Props {
  courseId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const UpdateSingleCourse = ({ courseId, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<CourseForm | null>(null);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* -----------------------------
     FETCH COMPLETE COURSE
  ----------------------------- */

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/single-course/${courseId}`);

      const data = response.data;

      setFormData({
        ...data,
        price: Number(data.price),
        rating: Number(data.rating),
        discountPercentage: Number(data.discountPercentage),
        images: data.images || [],
        whatYouLearn: data.whatYouLearn || [],
        courseCurriculum: data.courseCurriculum || [],
      });

      /*
       * Existing image URLs.
       *
       * If your API already returns full URLs,
       * use them directly.
       */

      setImagePreviews(
        (data.images || []).map((image: string) =>
          image.startsWith("http")
            ? image
            : `${import.meta.env.VITE_APP_URL}${image}`,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  /* -----------------------------
     BASIC CHANGE
  ----------------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!formData) return;

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "rating" || name === "price" || name === "discountPercentage"
          ? Number(value)
          : value,
    });
  };

  /* -----------------------------
     DETAILS
  ----------------------------- */

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;

    setFormData({
      ...formData,
      courseDetails: {
        ...formData.courseDetails,
        [name]: value,
      },
    });
  };

  /* -----------------------------
     IMAGE UPLOAD
  ----------------------------- */

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      const response = await uploadFile("course", file);

      const filename = response.fileName;
      const imageUrl = response.imageUrl;

      setFormData({
        ...formData,
        images: [...formData.images, filename],
      });

      setImagePreviews((prev) => [...prev, imageUrl]);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    if (!formData) return;

    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* -----------------------------
     WHAT YOU LEARN
  ----------------------------- */

  const addLearning = () => {
    if (!formData) return;

    setFormData({
      ...formData,
      whatYouLearn: [...formData.whatYouLearn, ""],
    });
  };

  const updateLearning = (index: number, value: string) => {
    if (!formData) return;

    const data = [...formData.whatYouLearn];

    data[index] = value;

    setFormData({
      ...formData,
      whatYouLearn: data,
    });
  };

  const removeLearning = (index: number) => {
    if (!formData) return;

    setFormData({
      ...formData,
      whatYouLearn: formData.whatYouLearn.filter((_, i) => i !== index),
    });
  };

  /* -----------------------------
     CURRICULUM
  ----------------------------- */

  const addModule = () => {
    if (!formData) return;

    setFormData({
      ...formData,
      courseCurriculum: [
        ...formData.courseCurriculum,
        {
          module: `Module ${formData.courseCurriculum.length + 1}`,
          data: [""],
        },
      ],
    });
  };

  const removeModule = (moduleIndex: number) => {
    if (!formData) return;

    setFormData({
      ...formData,
      courseCurriculum: formData.courseCurriculum.filter(
        (_, i) => i !== moduleIndex,
      ),
    });
  };

  const updateModule = (moduleIndex: number, value: string) => {
    if (!formData) return;

    const curriculum = [...formData.courseCurriculum];

    curriculum[moduleIndex].module = value;

    setFormData({
      ...formData,
      courseCurriculum: curriculum,
    });
  };

  const addTopic = (moduleIndex: number) => {
    if (!formData) return;

    const curriculum = [...formData.courseCurriculum];

    curriculum[moduleIndex].data.push("");

    setFormData({
      ...formData,
      courseCurriculum: curriculum,
    });
  };

  const updateTopic = (
    moduleIndex: number,
    topicIndex: number,
    value: string,
  ) => {
    if (!formData) return;

    const curriculum = [...formData.courseCurriculum];

    curriculum[moduleIndex].data[topicIndex] = value;

    setFormData({
      ...formData,
      courseCurriculum: curriculum,
    });
  };

  const removeTopic = (moduleIndex: number, topicIndex: number) => {
    if (!formData) return;

    const curriculum = [...formData.courseCurriculum];

    curriculum[moduleIndex].data = curriculum[moduleIndex].data.filter(
      (_, i) => i !== topicIndex,
    );

    setFormData({
      ...formData,
      courseCurriculum: curriculum,
    });
  };

  /* -----------------------------
     UPDATE
  ----------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    try {
      setSaving(true);

      await axiosInstance.patch(`/single-course/${courseId}`, formData);

      toast.success("Course updated successfully");

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  /* -----------------------------
     LOADING
  ----------------------------- */

  if (loading || !formData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFORMATION */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course Title"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

            <input
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

            <input
              name="discountPercentage"
              type="number"
              value={formData.discountPercentage}
              onChange={handleChange}
              placeholder="Discount Percentage"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />
          </div>

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Short Description"
            className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description"
            className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />
        </section>

        {/* IMAGES */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Course Images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Delete existing images or add new images.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={17} />

              {uploadingImage ? "Uploading..." : "Add Image"}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {imagePreviews.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border"
              >
                <img
                  src={image}
                  alt={`Course ${index + 1}`}
                  className="aspect-video w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT COURSE */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">About Course</h2>

          <textarea
            value={formData.aboutCourse}
            onChange={(e) =>
              setFormData({
                ...formData,
                aboutCourse: e.target.value,
              })
            }
            rows={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
          />
        </section>

        {/* WHAT YOU LEARN */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">What You'll Learn</h2>

            <button
              type="button"
              onClick={addLearning}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
            >
              <Plus size={16} />
              Add Point
            </button>
          </div>

          <div className="space-y-3">
            {formData.whatYouLearn.map((item, index) => (
              <div key={index} className="flex gap-3">
                <input
                  value={item}
                  onChange={(e) => updateLearning(index, e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
                />

                <button
                  type="button"
                  onClick={() => removeLearning(index)}
                  className="rounded-lg p-3 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* COURSE DETAILS */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">Course Details</h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["duration", "Duration"],
                ["batchTiming", "Batch Timing"],
                ["level", "Level"],
                ["language", "Language"],
                ["certificate", "Certificate"],
                ["placement", "Placement"],
              ] as const
            ).map(([name, label]) => (
              <input
                key={name}
                name={name}
                value={formData.courseDetails[name]}
                onChange={handleDetailsChange}
                placeholder={label}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />
            ))}
          </div>
        </section>

        {/* CURRICULUM */}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Course Curriculum</h2>

            <button
              type="button"
              onClick={addModule}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
            >
              <Plus size={16} />
              Add Module
            </button>
          </div>

          <div className="space-y-5">
            {formData.courseCurriculum.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="rounded-xl border border-gray-200"
              >
                <div className="flex gap-3 border-b bg-gray-50 p-4">
                  <input
                    value={module.module}
                    onChange={(e) => updateModule(moduleIndex, e.target.value)}
                    className="flex-1 rounded-lg border px-4 py-2 font-medium"
                  />

                  <button
                    type="button"
                    onClick={() => removeModule(moduleIndex)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-3 p-4">
                  {module.data.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex gap-3">
                      <input
                        value={topic}
                        onChange={(e) =>
                          updateTopic(moduleIndex, topicIndex, e.target.value)
                        }
                        placeholder="Topic"
                        className="flex-1 rounded-lg border px-4 py-2.5"
                      />

                      <button
                        type="button"
                        onClick={() => removeTopic(moduleIndex, topicIndex)}
                        className="text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addTopic(moduleIndex)}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Plus size={16} />
                    Add Topic
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Status</label>

            <select
              name="status"
              value={String(formData.status)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value === "true",
                })
              }
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </section>

        {/* ACTIONS */}

        <div className="flex justify-end gap-3 pb-8">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSingleCourse;
