// // import { useEffect, useState } from "react";

// // import CreateSingleCourse from "../components/Single-course/CreateSingleCourse";
// // import SingleCourseView from "../components/Single-course/SingleCourseView";
// // import axiosInstance from "../utils/Axios.instance";
// // import { toast } from "react-toastify";
// import CreateSingleCourse from "../components/Single-course/CreateSingleCourse";
// import UpdateSingleCourse from "../components/Single-course/UpdateSingleCourse";
// import SingleCourseView from "../components/Single-course/SingleCourseView";
// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/Axios.instance";
// import { toast } from "react-toastify";
// interface Curriculum {
//   module: string;
//   data: string[];
// }

// interface CourseForm {
//   title: string;
//   description: string;
//   rating: number;
//   price: number;
//   discountPercentage: number;
//   images: string[];
//   aboutCourse: string;
//   whatYouLearn: string[];
//   courseDetails: {
//     duration: string;
//     batchTiming: string;
//     level: string;
//     language: string;
//     certificate: string;
//     placement: string;
//   };
//   courseCurriculum: Curriculum[];
// }

// const SingleCourse = () => {
//   const [course, setCourse] = useState<CourseForm | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     fetchCourse();
//   }, []);

//   const fetchCourse = async () => {
//     try {
//       setLoading(true);

//       // GET API will come here
//       const response = await axiosInstance.get(`/single-course/${1}`);
//       toast.success("fetch successfully");
//       console.log(response.data);

//       setCourse(response.data);

//       // Temporary:
//       // setCourse(null);
//     } catch (error) {
//       console.error("Failed to fetch course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
//       </div>
//     );
//   }

//   // Create
//   if (!course) {
//     return <CreateSingleCourse />;
//   }

//   // Update
//   if (isEditing) {
//     return (
//       <UpdateSingleCourse
//         course={course}
//         onSuccess={() => {
//           setIsEditing(false);
//           fetchCourse();
//         }}
//         onCancel={() => setIsEditing(false)}
//       />
//     );
//   }

//   // View
//   return (
//     <div className="relative">
//       <SingleCourseView course={course} />

//       <button
//         type="button"
//         onClick={() => setIsEditing(true)}
//         className="fixed bottom-6 right-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-gray-800"
//       >
//         Edit Course
//       </button>
//     </div>
//   );
// };

// export default SingleCourse;
