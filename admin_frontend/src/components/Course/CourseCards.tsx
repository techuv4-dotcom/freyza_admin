// // import { useEffect, useState } from "react";
// // import { Plus, Pencil, Trash2, Star } from "lucide-react";
// // import CreateCourseCard from "./CreateCourseCard";
// // import UpdateCourseCard from "./UpdateCourseCard";
// // import axiosInstance from "../../utils/Axios.instance";
// // import { toast } from "react-toastify";
// // // import CreateCourseCard from "./CreateCourseCard";
// // // import UpdateCourseCard from "./UpdateCourseCard";

// // export interface CourseCard {
// //   id: number;
// //   image: string;
// //   title: string;
// //   description: string;
// //   rating: number;
// //   duration: string;
// //   level: string;
// //   price: number;
// // }

// // const CourseCards = () => {
// //   const [cards, setCards] = useState<CourseCard[]>([
// //     {
// //       id: 1,
// //       image:
// //         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
// //       title: "Professional Makeup Artist",
// //       description:
// //         "Become a certified makeup artist with advanced practical training.",
// //       rating: 4.9,
// //       duration: "3 monthes",
// //       level: "Beginner",
// //       price: 24999,
// //     },
// //     {
// //       id: 2,
// //       image:
// //         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
// //       title: "Advanced Beauty Course",
// //       description:
// //         "Learn advanced beauty techniques with professional practical training.",
// //       rating: 4.8,
// //       duration: "3 monthes",

// //       level: "Advanced",
// //       price: 29999,
// //     },
// //   ]);

// //   const [showCreate, setShowCreate] = useState(false);
// //   const [editingCard, setEditingCard] = useState<CourseCard | null>(null);

// //   // Create
// //   const handleCreate = (newCard: CourseCard) => {
// //     setCards((prev) => [...prev, newCard]);
// //     setShowCreate(false);
// //   };

// //   // Update
// //   const handleUpdate = (updatedCard: CourseCard) => {
// //     setCards((prev) =>
// //       prev.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
// //     );

// //     setEditingCard(null);
// //   };

// //   // Delete
// //   const handleDelete = async (id: number) => {
// //     const confirmDelete = window.confirm(
// //       "Are you sure you want to delete this card?",
// //     );

// //     if (!confirmDelete) return;
// //     const resp = await axiosInstance.delete(`/course-card/${id}`);
// //     toast.success(resp.data.message);
// //     setCards((prev) => prev.filter((card) => card.id !== id));
// //   };

// //   const fetchAll = async () => {
// //     const resp = await axiosInstance.get("/course-card");
// //     setCards(resp.data.data);
// //   };

// //   useEffect(() => {
// //     fetchAll();
// //   }, []);

// //   // Create page
// //   if (showCreate) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-8">
// //         <CreateCourseCard
// //           onCancel={() => setShowCreate(false)}
// //           onCreate={handleCreate}
// //         />
// //       </div>
// //     );
// //   }

// //   // Update page
// //   if (editingCard) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-8">
// //         <UpdateCourseCard
// //           card={editingCard}
// //           onCancel={() => setEditingCard(null)}
// //           onUpdate={handleUpdate}
// //         />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       {/* Header */}
// //       <div className="mb-8 flex items-center justify-between">
// //         <div>
// //           <h1 className="text-2xl font-semibold text-gray-900">Course Cards</h1>

// //           <p className="mt-1 text-sm text-gray-500">
// //             Manage the cards displayed on your website.
// //           </p>
// //         </div>

// //         <button
// //           onClick={() => setShowCreate(true)}
// //           className="flex items-center gap-2 rounded-lg bg-[#c59a52] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b18743]"
// //         >
// //           <Plus size={18} />
// //           Create New Card
// //         </button>
// //       </div>

// //       {/* Existing Cards */}
// //       {cards.length > 0 ? (
// //         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
// //           {cards.map((card) => (
// //             <div
// //               key={card.id}
// //               className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
// //             >
// //               {/* Image */}
// //               <div className="h-64 overflow-hidden">
// //                 {card.image ? (
// //                   <img
// //                     src={`${card.image}`}
// //                     alt={card.title}
// //                     className="h-full w-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
// //                     No Image
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Content */}
// //               <div className="p-6">
// //                 <h2 className="text-xl font-semibold text-gray-900">
// //                   {card.title}
// //                 </h2>

// //                 <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
// //                   {card.description}
// //                 </p>

// //                 {/* Rating + Level */}
// //                 <div className="mt-5 flex items-center gap-5 border-y border-gray-100 py-4">
// //                   <div className="flex items-center gap-1">
// //                     <Star
// //                       size={16}
// //                       className="fill-yellow-400 text-yellow-400"
// //                     />

// //                     <span className="text-sm font-medium text-gray-700">
// //                       {card.rating}
// //                     </span>
// //                   </div>

// //                   <span className="text-sm text-gray-500">{card.level}</span>

// //                   <span className="text-sm text-gray-500">{card.duration}</span>
// //                 </div>

// //                 {/* Duration */}

// //                 {/* Price */}
// //                 <div className="mt-5">
// //                   <p className="text-xs text-gray-400">Starting From</p>

// //                   <p className="mt-1 text-xl font-semibold text-gray-900">
// //                     ₹{card.price.toLocaleString("en-IN")}
// //                   </p>
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="mt-5 flex gap-3">
// //                   <button
// //                     onClick={() => setEditingCard(card)}
// //                     className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
// //                   >
// //                     <Pencil size={16} />
// //                     Edit
// //                   </button>

// //                   <button
// //                     onClick={() => handleDelete(card.id)}
// //                     className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
// //                   >
// //                     <Trash2 size={16} />
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
// //           <h3 className="text-lg font-semibold text-gray-800">
// //             No Course Cards
// //           </h3>

// //           <p className="mt-2 text-sm text-gray-500">
// //             Create your first course card.
// //           </p>

// //           <button
// //             onClick={() => setShowCreate(true)}
// //             className="mt-5 rounded-lg bg-[#c59a52] px-5 py-3 text-sm font-semibold text-white"
// //           >
// //             Create New Card
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CourseCards;

// import { useEffect, useState } from "react";
// import { Plus, Pencil, Star, ArrowLeft } from "lucide-react";
// import axiosInstance from "../../utils/Axios.instance";
// import { toast } from "react-toastify";
// import CreateSingleCourse from "./CreateSingleCourse";
// import UpdateSingleCourse from "./UpdateSingleCourse";
// // import CreateSingleCourse from "./CreateSingleCourse";
// // import UpdateSingleCourse from "./UpdateSingleCourse";

// export interface CourseCard {
//   id: number;
//   image: string;
//   title: string;
//   shortDescription: string;
//   rating: number;
//   duration: string;
//   level: string;
//   price: number;
// }

// const CourseCards = () => {
//   const [cards, setCards] = useState<CourseCard[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showCreate, setShowCreate] = useState(false);
//   const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get("/single-course/card");
//       console.log("this is the data bay all course", response.data.dat);

//       setCards(response.data.data ?? response.data);
//     } catch (error) {
//       console.error("Failed to fetch courses:", error);
//       toast.error("Failed to fetch courses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   /* -----------------------------
//      CREATE PAGE
//   ----------------------------- */

//   if (showCreate) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <button
//           type="button"
//           onClick={() => setShowCreate(false)}
//           className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={18} />
//           Back to Courses
//         </button>

//         <CreateSingleCourse
//           onSuccess={() => {
//             setShowCreate(false);
//             fetchCourses();
//           }}
//           onCancel={() => setShowCreate(false)}
//         />
//       </div>
//     );
//   }

//   /* -----------------------------
//      UPDATE PAGE
//   ----------------------------- */

//   if (editingCourseId !== null) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <button
//           type="button"
//           onClick={() => setEditingCourseId(null)}
//           className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft size={18} />
//           Back to Courses
//         </button>

//         <UpdateSingleCourse
//           courseId={editingCourseId}
//           onSuccess={() => {
//             setEditingCourseId(null);
//             fetchCourses();
//           }}
//           onCancel={() => setEditingCourseId(null)}
//         />
//       </div>
//     );
//   }

//   /* -----------------------------
//      LOADING
//   ----------------------------- */

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
//       </div>
//     );
//   }

//   /* -----------------------------
//      CARDS
//   ----------------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header */}

//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>

//           <p className="mt-1 text-sm text-gray-500">Manage your courses.</p>
//         </div>

//         <button
//           type="button"
//           onClick={() => setShowCreate(true)}
//           className="flex items-center gap-2 rounded-lg bg-[#c59a52] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b18743]"
//         >
//           <Plus size={18} />
//           Create Course
//         </button>
//       </div>

//       {/* Cards */}

//       {cards.length > 0 ? (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
//             >
//               {/* Image */}

//               <div className="h-56 overflow-hidden bg-gray-100">
//                 {card.image ? (
//                   <img
//                     src={card.image}
//                     alt={card.title}
//                     className="h-full w-full object-cover transition duration-300 hover:scale-105"
//                   />
//                 ) : (
//                   <div className="flex h-full items-center justify-center text-sm text-gray-400">
//                     No Image
//                   </div>
//                 )}
//               </div>

//               {/* Content */}

//               <div className="p-5">
//                 <h2 className="line-clamp-1 text-xl font-semibold text-gray-900">
//                   {card.title}
//                 </h2>

//                 <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
//                   {card.shortDescription}
//                 </p>

//                 {/* Meta */}

//                 <div className="mt-4 flex items-center gap-4 border-y border-gray-100 py-3">
//                   <div className="flex items-center gap-1">
//                     <Star
//                       size={15}
//                       className="fill-yellow-400 text-yellow-400"
//                     />

//                     <span className="text-sm font-medium text-gray-700">
//                       {card.rating}
//                     </span>
//                   </div>

//                   <span className="text-sm text-gray-500">{card.level}</span>

//                   <span className="text-sm text-gray-500">{card.duration}</span>
//                 </div>

//                 {/* Price */}

//                 <div className="mt-4">
//                   <p className="text-xs text-gray-400">Starting From</p>

//                   <p className="mt-1 text-xl font-semibold text-gray-900">
//                     ₹{Number(card.price).toLocaleString("en-IN")}
//                   </p>
//                 </div>

//                 {/* Edit */}

//                 <button
//                   type="button"
//                   onClick={() => setEditingCourseId(card.id)}
//                   className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
//                 >
//                   <Pencil size={16} />
//                   Edit Course
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
//           <h3 className="text-lg font-semibold text-gray-800">
//             No Courses Found
//           </h3>

//           <p className="mt-2 text-sm text-gray-500">
//             Create your first course.
//           </p>

//           <button
//             type="button"
//             onClick={() => setShowCreate(true)}
//             className="mt-5 rounded-lg bg-[#c59a52] px-5 py-3 text-sm font-semibold text-white"
//           >
//             Create Course
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseCards;

import { useEffect, useState } from "react";
import { Plus, Pencil, Star, ArrowLeft } from "lucide-react";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import CreateSingleCourse from "./CreateSingleCourse";
import UpdateSingleCourse from "./UpdateSingleCourse";

export interface CourseCard {
  id: number;
  image: string;
  title: string;
  shortDescription: string;
  rating: number;
  duration: string;
  level: string;
  price: number;
}

const CourseCards = () => {
  const [cards, setCards] = useState<CourseCard[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/single-course/cards");
      console.log("this is the data bay all course", response.data.dat);

      setCards(response.data.data ?? response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* -----------------------------
     CREATE PAGE
  ----------------------------- */

  if (showCreate) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          type="button"
          onClick={() => setShowCreate(false)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>

        <CreateSingleCourse
          onSuccess={() => {
            setShowCreate(false);
            fetchCourses();
          }}
          onCancel={() => setShowCreate(false)}
        />
      </div>
    );
  }

  /* -----------------------------
     UPDATE PAGE
  ----------------------------- */

  if (editingCourseId !== null) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          type="button"
          onClick={() => setEditingCourseId(null)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>

        <UpdateSingleCourse
          courseId={editingCourseId}
          onSuccess={() => {
            setEditingCourseId(null);
            fetchCourses();
          }}
          onCancel={() => setEditingCourseId(null)}
        />
      </div>
    );
  }

  /* -----------------------------
     LOADING
  ----------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  /* -----------------------------
     CARDS
  ----------------------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>

          <p className="mt-1 text-sm text-gray-500">Manage your courses.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg bg-[#c59a52] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b18743]"
        >
          <Plus size={18} />
          Create Course
        </button>
      </div>

      {/* Cards */}

      {cards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Image */}

              <div className="h-56 overflow-hidden bg-gray-100">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}

              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-gray-900">
                  {card.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {card.shortDescription}
                </p>

                {/* Meta */}

                <div className="mt-4 flex items-center gap-4 border-y border-gray-100 py-3">
                  <div className="flex items-center gap-1">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {card.rating}
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">{card.level}</span>

                  <span className="text-sm text-gray-500">{card.duration}</span>
                </div>

                {/* Price */}

                <div className="mt-4">
                  <p className="text-xs text-gray-400">Starting From</p>

                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    ₹{Number(card.price).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Edit */}

                <button
                  type="button"
                  onClick={() => setEditingCourseId(card.id)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  <Pencil size={16} />
                  Edit Course
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            No Courses Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Create your first course.
          </p>

          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="mt-5 rounded-lg bg-[#c59a52] px-5 py-3 text-sm font-semibold text-white"
          >
            Create Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCards;
