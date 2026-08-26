// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/Axios.instance";
// interface subs {
//   id: number;
//   email: string;
//   created_at: string;
// }

// const LatestSubscribers = () => {
//   const [subscribers, setSubscribers] = useState<subs[]>([]);
//   // const subscribers = [
//   //   "john@gmail.com",
//   //   "priya@gmail.com",
//   //   "rohit@gmail.com",
//   //   "saloni@gmail.com",
//   //   "amit@gmail.com",
//   // ];

//   const fetchAll = async () => {
//     const resp = await axiosInstance.get("/subscribers");
//     console.log("sebscribers", resp);
//     // const data = resp.data;
//     setSubscribers(resp.data);
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   return (
//     <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold mb-5">Latest Subscribers</h2>

//       <div className="space-y-4">
//         {subscribers?.map((item, index) => (
//           <div key={index} className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center font-semibold text-purple-700">
//               {item.email}
//             </div>

//             <div>
//               <p className="text-sm font-medium text-gray-800">{item.email}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default LatestSubscribers;

import { useEffect, useState } from "react";
import axiosInstance from "../utils/Axios.instance";

interface Props {
  latestSubscribers: Subscriber[];
}

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const LatestSubscribers = ({ latestSubscribers }: Props) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // const fetchAll = async () => {
  //   try {
  //     const { data } = await axiosInstance.get("/subscribers");
  //     setSubscribers(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    setSubscribers(latestSubscribers);
  }, [latestSubscribers]);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Latest Subscribers</h2>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          {subscribers.length}
        </span>
      </div>

      <div className="space-y-3">
        {subscribers.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700">
                {item.email.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-medium text-gray-800">{item.email}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {subscribers.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-500">
            No subscribers found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestSubscribers;
