// import { useState } from "react";
// import { Search, Download, Trash2, Mail } from "lucide-react";
// import Header from "../components/Header";

// const mockSubscribers = [
//   {
//     id: 1,
//     email: "john@example.com",
//     subscribedAt: "22 Jun 2026",
//   },
//   {
//     id: 2,
//     email: "sarah@example.com",
//     subscribedAt: "21 Jun 2026",
//   },
//   {
//     id: 3,
//     email: "mike@example.com",
//     subscribedAt: "20 Jun 2026",
//   },
//   {
//     id: 4,
//     email: "emma@example.com",
//     subscribedAt: "19 Jun 2026",
//   },
//   {
//     id: 5,
//     email: "alex@example.com",
//     subscribedAt: "18 Jun 2026",
//   },
// ];

// const Subscribers = () => {
//   const [search, setSearch] = useState("");

//   const filteredSubscribers = mockSubscribers.filter((subscriber) =>
//     subscriber.email.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <>
//       <Header title="Subscribers" />

//       <main className="p-6 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               Newsletter Subscribers
//             </h2>

//             <p className="mt-1 text-gray-500">
//               Manage all newsletter subscriptions.
//             </p>
//           </div>

//           <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-5 py-3 text-white font-medium">
//             <Download size={18} />
//             Export CSV
//           </button>
//         </div>

//         {/* Stats Card */}
//         <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="rounded-xl bg-purple-100 p-4">
//               <Mail size={24} className="text-purple-700" />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Total Subscribers</p>

//               <h3 className="text-3xl font-bold text-gray-800">
//                 {mockSubscribers.length}
//               </h3>
//             </div>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative max-w-md">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search subscribers..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-400"
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                     Email Address
//                   </th>

//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                     Subscription Date
//                   </th>

//                   <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredSubscribers.map((subscriber) => (
//                   <tr
//                     key={subscriber.id}
//                     className="border-t border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 font-medium text-gray-800">
//                       {subscriber.email}
//                     </td>

//                     <td className="px-6 py-4 text-gray-600">
//                       {subscriber.subscribedAt}
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex justify-center">
//                         <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredSubscribers.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={3}
//                       className="px-6 py-10 text-center text-gray-500"
//                     >
//                       No subscribers found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Subscribers;

import { useEffect, useState } from "react";
import { Search, Download, Trash2, Mail } from "lucide-react";
import Header from "../components/Header";
import axiosInstance from "../utils/Axios.instance";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const Subscribers = () => {
  const [search, setSearch] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const fetchAll = async () => {
    const resp = await axiosInstance.get("/subscribers");
    setSubscribers(resp.data);
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <Header title="Subscribers" />

      <main className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Newsletter Subscribers
            </h2>

            <p className="mt-1 text-gray-500">
              Manage all newsletter subscriptions.
            </p>
          </div>

          {/* <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5A2D82] to-[#7C3AED] px-5 py-3 text-white font-medium">
            <Download size={18} />
            Export CSV
          </button> */}
        </div>

        {/* Stats Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-100 p-4">
              <Mail size={24} className="text-purple-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Subscribers</p>

              <h3 className="text-3xl font-bold text-gray-800">
                {filteredSubscribers.length}
              </h3>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email Address
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Subscription Date
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {subscriber.email}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {subscriber.created_at}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {/* <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredSubscribers.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Subscribers;
