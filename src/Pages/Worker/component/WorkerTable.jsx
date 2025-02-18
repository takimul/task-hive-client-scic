import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

import Loading from "../../../Component/Loading";
import { ThemeContext } from "../../../provider/ThemeProvider";

const WorkerTable = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access the current theme

  // Fetching the worker data
  const { data: workerData, isLoading } = useQuery({
    queryKey: ["worker-table", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/worker-submission/${user?.email}`
      );
      return data;
    },
  });

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Conditional class names based on the theme
  const tableBgClass = theme === "light" ? "bg-white" : "bg-gray-800"; // Light/dark background for the table
  const textClass = theme === "light" ? "text-gray-900" : "text-white"; // Text color based on theme
  const headerClass = theme === "light" ? "bg-gray-100" : "bg-gray-900"; // Header background color
  const statusClass = theme === "light" ? "bg-green-200" : "bg-green-600"; // Status badge color

  return (
    <div className="overflow-x-auto">
      <table className={`table ${tableBgClass}`}>
        {/* Table Head */}
        <thead className={headerClass}>
          <tr>
            <th className={`text-sm font-medium ${textClass}`}>#</th>
            <th className={`text-sm font-medium ${textClass}`}>Task Title</th>
            <th className={`text-sm font-medium ${textClass}`}>
              Payable Amount
            </th>
            <th className={`text-sm font-medium ${textClass}`}>Buyer Name</th>
            <th className={`text-sm font-medium ${textClass}`}>Status</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {workerData.map((data, idx) => (
            <tr key={data._id} className={`${tableBgClass}`}>
              <td className={`px-4 py-2 ${textClass}`}>{idx + 1}</td>
              <td className={`px-4 py-2 ${textClass}`}>{data.task_title}</td>
              <td className={`px-4 py-2 ${textClass}`}>
                {data.payable_amount} coin
              </td>
              <td className={`px-4 py-2 ${textClass}`}>{data.buyer_name}</td>
              <td className={`px-4 py-2`}>
                <span
                  className={`px-2 py-1 rounded-xl font-medium ${statusClass}`}
                >
                  {data.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerTable;
