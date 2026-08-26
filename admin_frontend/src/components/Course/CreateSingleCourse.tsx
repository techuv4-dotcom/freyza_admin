import { useRef, useState } from "react";
import { Plus, Trash2, ArrowLeft, ImagePlus } from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { uploadFile } from "../../utils/file.uploader";
import { Field } from "formik";
import { array } from "yup";
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

interface CreateSingleCourseProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const initialFormData: CourseForm = {
  title: "",
  shortDescription: "",
  description: "",
  rating: 0,
  price: 0,
  discountPercentage: 0,
  images: [],
  aboutCourse: "",
  whatYouLearn: [],
  courseDetails: {
    duration: "",
    batchTiming: "",
    level: "",
    language: "",
    certificate: "",
    placement: "",
  },
  courseCurriculum: [],
  status: true,
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900";

const textareaClass =
  "w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

const helperClass = "mt-1.5 text-xs text-gray-400";

const CreateSingleCourse = ({
  onSuccess,
  onCancel,
}: CreateSingleCourseProps) => {
  const [formData, setFormData] = useState<CourseForm>(initialFormData);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --------------------------------------------------
  // BASIC INPUT CHANGE
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "rating" || name === "price" || name === "discountPercentage"
          ? Number(value)
          : value,
    }));
  };

  // --------------------------------------------------
  // COURSE DETAILS CHANGE
  // --------------------------------------------------

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      courseDetails: {
        ...prev.courseDetails,
        [name]: value,
      },
    }));
  };

  // --------------------------------------------------
  // IMAGE UPLOAD
  // --------------------------------------------------

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const files = Array.from(e.target.files || []);

    files.forEach((element) => {
      formData.append("image", element);
    });

    // const resp = await axiosInstance.post(`/upload/multiple/course`, formData);
    // console.log(resp);

    if (!files) return;

    try {
      const response = await axiosInstance.post(
        "/upload/multiple/course",
        formData,
      );

      if (response.data.success) {
        const uploadedImages = response.data.data;

        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            ...uploadedImages.map((item: any) => item.fileName),
          ],
        }));

        setImagePreviews((prev) => [
          ...prev,
          ...uploadedImages.map((item: any) => item.imageUrl),
        ]);
      }

      toast.success("Image uploaded");
    } catch (error) {
      console.error("Image upload failed:", error);

      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);

      e.target.value = "";
    }
  };

  // --------------------------------------------------
  // REMOVE IMAGE
  // --------------------------------------------------

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------------------------
  // WHAT YOU LEARN
  // --------------------------------------------------

  const addLearningPoint = () => {
    setFormData((prev) => ({
      ...prev,
      whatYouLearn: [...prev.whatYouLearn, ""],
    }));
  };

  const updateLearningPoint = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.whatYouLearn];

      updated[index] = value;

      return {
        ...prev,
        whatYouLearn: updated,
      };
    });
  };

  const removeLearningPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatYouLearn: prev.whatYouLearn.filter((_, i) => i !== index),
    }));
  };

  // --------------------------------------------------
  // CURRICULUM
  // --------------------------------------------------

  const addModule = () => {
    setFormData((prev) => ({
      ...prev,
      courseCurriculum: [
        ...prev.courseCurriculum,
        {
          module: `Module ${prev.courseCurriculum.length + 1}`,
          data: [""],
        },
      ],
    }));
  };

  const removeModule = (moduleIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      courseCurriculum: prev.courseCurriculum.filter(
        (_, i) => i !== moduleIndex,
      ),
    }));
  };

  const updateModuleName = (moduleIndex: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.courseCurriculum];

      updated[moduleIndex] = {
        ...updated[moduleIndex],
        module: value,
      };

      return {
        ...prev,
        courseCurriculum: updated,
      };
    });
  };

  const addTopic = (moduleIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.courseCurriculum];

      updated[moduleIndex] = {
        ...updated[moduleIndex],
        data: [...updated[moduleIndex].data, ""],
      };

      return {
        ...prev,
        courseCurriculum: updated,
      };
    });
  };

  const updateTopic = (
    moduleIndex: number,
    topicIndex: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev.courseCurriculum];

      const topics = [...updated[moduleIndex].data];

      topics[topicIndex] = value;

      updated[moduleIndex] = {
        ...updated[moduleIndex],
        data: topics,
      };

      return {
        ...prev,
        courseCurriculum: updated,
      };
    });
  };

  const removeTopic = (moduleIndex: number, topicIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.courseCurriculum];

      updated[moduleIndex] = {
        ...updated[moduleIndex],
        data: updated[moduleIndex].data.filter((_, i) => i !== topicIndex),
      };

      return {
        ...prev,
        courseCurriculum: updated,
      };
    });
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Course title is required");
      return;
    }

    if (!formData.shortDescription.trim()) {
      toast.error("Short description is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Course description is required");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/single-course", formData);

      toast.success("Course created successfully");

      onSuccess();
    } catch (error) {
      console.error("Create course failed:", error);

      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* PAGE HEADER */}

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New Course
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add complete course information, images, details and curriculum.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* =====================================================
            BASIC INFORMATION
        ====================================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the basic information that identifies the course.
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* TITLE */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Course Title
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Professional Makeup Artist Course"
                className={inputClass}
              />

              <p className={helperClass}>
                The main title displayed for the course.
              </p>
            </div>

            {/* SHORT DESCRIPTION */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Short Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                maxLength={300}
                placeholder="e.g. Learn professional makeup techniques with hands-on salon training."
                className={textareaClass}
              />

              <p className={helperClass}>
                This description will be shown on the course card.
              </p>
            </div>

            {/* FULL DESCRIPTION */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Full Course Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="e.g. Master bridal makeup, party makeup, skincare and professional salon techniques through practical training."
                className={textareaClass}
              />

              <p className={helperClass}>
                Detailed description used on the full course page.
              </p>
            </div>

            {/* RATING */}

            <div>
              <label className={labelClass}>Course Rating</label>

              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                placeholder="e.g. 4.7"
                className={inputClass}
              />

              <p className={helperClass}>Rating should be between 0 and 5.</p>
            </div>

            {/* PRICE */}

            <div>
              <label className={labelClass}>Course Price</label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  ₹
                </span>

                <input
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="29999"
                  className={`${inputClass} pl-9`}
                />
              </div>

              <p className={helperClass}>Enter the original course price.</p>
            </div>

            {/* DISCOUNT */}

            <div>
              <label className={labelClass}>Discount Percentage</label>

              <div className="relative">
                <input
                  name="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  placeholder="25"
                  className={`${inputClass} pr-10`}
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  %
                </span>
              </div>

              <p className={helperClass}>
                Enter discount percentage from 0 to 100.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            COURSE IMAGES
        ====================================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Course Images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload images that will be used for the course.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ImagePlus size={17} />

              {uploadingImage ? "Uploading..." : "Add Image"}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </div>

          <div className="p-6">
            {imagePreviews.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">
                <ImagePlus size={32} className="mx-auto text-gray-300" />

                <p className="mt-3 text-sm font-medium text-gray-600">
                  No images added
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Click "Add Image" to upload a course image.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {imagePreviews.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Course image ${index + 1}`}
                      className="aspect-video w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition group-hover:opacity-100"
                      title="Delete image"
                    >
                      <Trash2 size={16} />
                    </button>

                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                        Main Image
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            ABOUT COURSE
        ====================================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              About Course
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Provide a detailed overview of what this course is about.
            </p>
          </div>

          <div className="p-6">
            <label className={labelClass}>About Course</label>

            <textarea
              value={formData.aboutCourse}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  aboutCourse: e.target.value,
                }))
              }
              rows={7}
              placeholder="e.g. This professional makeup course is designed to help students develop practical skills in bridal makeup, party makeup, skincare and salon-ready beauty techniques."
              className={textareaClass}
            />
          </div>
        </section>

        {/* =====================================================
            WHAT YOU WILL LEARN
        ====================================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                What You'll Learn
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add the key skills or outcomes students will gain.
              </p>
            </div>

            <button
              type="button"
              onClick={addLearningPoint}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={17} />
              Add Point
            </button>
          </div>

          <div className="p-6">
            {formData.whatYouLearn.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">
                <p className="text-sm text-gray-500">
                  No learning points added yet.
                </p>

                <button
                  type="button"
                  onClick={addLearningPoint}
                  className="mt-3 text-sm font-medium text-gray-900 underline"
                >
                  Add your first point
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {formData.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                      {index + 1}
                    </div>

                    <input
                      value={item}
                      onChange={(e) =>
                        updateLearningPoint(index, e.target.value)
                      }
                      placeholder="e.g. Learn professional bridal makeup techniques"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => removeLearningPoint(index)}
                      className="rounded-lg p-3 text-red-500 hover:bg-red-50"
                      title="Remove point"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            COURSE DETAILS
        ====================================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Course Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add the important information displayed in the course details
              section.
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            {/* DURATION */}

            <div>
              <label className={labelClass}>Course Duration</label>

              <input
                name="duration"
                value={formData.courseDetails.duration}
                onChange={handleDetailsChange}
                placeholder="e.g. 6 Months"
                className={inputClass}
              />
            </div>

            {/* BATCH */}

            <div>
              <label className={labelClass}>Batch Timing</label>

              <input
                name="batchTiming"
                value={formData.courseDetails.batchTiming}
                onChange={handleDetailsChange}
                placeholder="e.g. Weekday & Weekend"
                className={inputClass}
              />
            </div>

            {/* LEVEL */}

            <div>
              <label className={labelClass}>Course Level</label>

              <input
                name="level"
                value={formData.courseDetails.level}
                onChange={handleDetailsChange}
                placeholder="e.g. Beginner to Advanced"
                className={inputClass}
              />
            </div>

            {/* LANGUAGE */}

            <div>
              <label className={labelClass}>Language</label>

              <input
                name="language"
                value={formData.courseDetails.language}
                onChange={handleDetailsChange}
                placeholder="e.g. English / Hindi"
                className={inputClass}
              />
            </div>

            {/* CERTIFICATE */}

            <div>
              <label className={labelClass}>Certificate</label>

              <input
                name="certificate"
                value={formData.courseDetails.certificate}
                onChange={handleDetailsChange}
                placeholder="e.g. Professional Makeup Artist Certificate"
                className={inputClass}
              />
            </div>

            {/* PLACEMENT */}

            <div>
              <label className={labelClass}>Placement</label>

              <input
                name="placement"
                value={formData.courseDetails.placement}
                onChange={handleDetailsChange}
                placeholder="e.g. 100% Placement Assistance"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            COURSE CURRICULUM
        ====================================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Course Curriculum
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Organize the course into modules and topics.
              </p>
            </div>

            <button
              type="button"
              onClick={addModule}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={17} />
              Add Module
            </button>
          </div>

          <div className="space-y-5 p-6">
            {formData.courseCurriculum.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
                <p className="text-sm text-gray-500">
                  No curriculum modules added.
                </p>

                <button
                  type="button"
                  onClick={addModule}
                  className="mt-3 text-sm font-medium text-gray-900 underline"
                >
                  Add first module
                </button>
              </div>
            ) : (
              formData.courseCurriculum.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  {/* MODULE HEADER */}

                  <div className="flex items-center gap-3 bg-gray-50 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
                      {moduleIndex + 1}
                    </div>

                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Module Name
                      </label>

                      <input
                        value={module.module}
                        onChange={(e) =>
                          updateModuleName(moduleIndex, e.target.value)
                        }
                        placeholder="e.g. Module 1 - Introduction"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeModule(moduleIndex)}
                      className="mt-5 rounded-lg p-2.5 text-red-500 hover:bg-red-50"
                      title="Delete module"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* TOPICS */}

                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700">
                          Module Topics
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          Add topics covered in this module.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => addTopic(moduleIndex)}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        <Plus size={16} />
                        Add Topic
                      </button>
                    </div>

                    <div className="space-y-3">
                      {module.data.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="flex items-center gap-3"
                        >
                          <span className="text-xs text-gray-400">
                            {topicIndex + 1}.
                          </span>

                          <input
                            value={topic}
                            onChange={(e) =>
                              updateTopic(
                                moduleIndex,
                                topicIndex,
                                e.target.value,
                              )
                            }
                            placeholder="e.g. Skin Preparation & Cleansing"
                            className={inputClass}
                          />

                          <button
                            type="button"
                            onClick={() => removeTopic(moduleIndex, topicIndex)}
                            className="rounded-lg p-2.5 text-red-500 hover:bg-red-50"
                            title="Delete topic"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <div>
            <label className="mb-2 block text-sm font-semibold">Status</label>

            <select
              name="status"
              value={String(formData.status)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value === "true",
                }))
              }
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div> */}

          <div>
            <label className="mb-2 block text-sm font-semibold">Status</label>

            <select
              name="status"
              value={String(formData.status)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value === "true",
                }))
              }
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </section>

        {/* =====================================================
            FORM ACTIONS
        ====================================================== */}

        <div className="flex items-center justify-end gap-3 pb-8">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-900 px-7 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSingleCourse;
