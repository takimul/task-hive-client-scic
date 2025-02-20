// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../Component/Loading";
// import ManageTaskRow from "./ManageTaskRow";
// import { Helmet } from "react-helmet";

// import { useContext } from "react";
// import { ThemeContext } from "../../provider/ThemeProvider";

// const ManageTask = () => {
//   const axiosSecure = useAxiosSecure();
//   const { theme } = useContext(ThemeContext); // Access current theme

//   const {
//     data: adminTask,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["admin-task"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/admin-task");
//       return data;
//     },
//   });

//   // Loading state
//   if (isLoading) {
//     return <Loading />;
//   }

//   // Error handling
//   if (isError) {
//     return (
//       <div
//         className={`p-4 text-center ${
//           theme === "light" ? "text-red-600" : "text-red-400"
//         }`}
//       >
//         <h2>Error: {error.message}</h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`my-14 ${theme === "light" ? "bg-white" : "bg-gray-800"} p-4`}
//     >
//       <Helmet>
//         <title>Manage Tasks | TaskHive</title>
//       </Helmet>
//       <div className="overflow-x-auto md:mx-6">
//         <table
//           className={`table ${theme === "light" ? "text-black" : "text-white"}`}
//         >
//           {/* head */}
//           <thead>
//             <tr>
//               <th>Task Title</th>
//               <th>Creator Name</th>
//               <th>Task Quantity</th>
//               <th>Coin Needed</th>
//               <th>Availability</th>
//               <th>View Task</th>
//               <th>Delete Task</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adminTask.map((task) => (
//               <ManageTaskRow key={task._id} task={task} refetch={refetch} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageTask;

// sorting

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading";
import ManageTaskRow from "./ManageTaskRow";
import { Helmet } from "react-helmet";
import { useState, useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // Access current theme

  const [sortBy, setSortBy] = useState("title"); // Default sort by title
  const [order, setOrder] = useState("asc"); // Default ascending order

  const {
    data: adminTask,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-task", sortBy, order],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/admin-task?sortBy=${sortBy}&order=${order}`
      );
      return data;
    },
  });

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error handling
  if (isError) {
    return (
      <div
        className={`p-4 text-center ${
          theme === "light" ? "text-red-600" : "text-red-400"
        }`}
      >
        <h2>Error: {error.message}</h2>
      </div>
    );
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle order if sorting by the same column
      setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Otherwise, set the new column and default to ascending order
      setSortBy(column);
      setOrder("asc");
    }
  };

  return (
    <div
      className={`my-14 ${theme === "light" ? "bg-white" : "bg-gray-800"} p-4`}
    >
      <Helmet>
        <title>Manage Tasks | TaskHive</title>
      </Helmet>
      <div className="overflow-x-auto md:mx-6">
        <table
          className={`table ${theme === "light" ? "text-black" : "text-white"}`}
        >
          {/* Head with sorting buttons */}
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => handleSort("title")}
                  className="hover:text-indigo-500"
                >
                  Task Title{" "}
                  {sortBy === "title" ? (order === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort("creatorName")}
                  className="hover:text-indigo-500"
                >
                  Creator Name{" "}
                  {sortBy === "creatorName"
                    ? order === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort("quantity")}
                  className="hover:text-indigo-500"
                >
                  Task Quantity{" "}
                  {sortBy === "quantity" ? (order === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort("coinNeeded")}
                  className="hover:text-indigo-500"
                >
                  Coin Needed{" "}
                  {sortBy === "coinNeeded" ? (order === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th>Availability</th>
              <th>View Task</th>
              <th>Delete Task</th>
            </tr>
          </thead>
          <tbody>
            {adminTask.map((task) => (
              <ManageTaskRow key={task._id} task={task} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
