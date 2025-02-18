import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Component/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

import TaskRow from "./TaskRow";
import { ThemeContext } from "../../../../provider/ThemeProvider";

const AllTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access the current theme

  const {
    data: allTaskSubmission,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-sub-task", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task-submission/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Conditional styles based on the current theme
  const tableBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const headerBg = theme === "light" ? "bg-gray-100" : "bg-gray-700";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const accentColor = theme === "light" ? "text-indigo-500" : "text-indigo-300";

  return (
    <>
      <div className={`overflow-x-auto ${tableBg}`}>
        {allTaskSubmission.length === 0 ? (
          <div
            className={`text-lg font-bold md:text-6xl text-center h-96 flex flex-col justify-center ${textColor}`}
          >
            No Task To Review
          </div>
        ) : (
          <div>
            <table className={`table w-full ${tableBg} shadow-md`}>
              {/* Table head */}
              <thead className={headerBg}>
                <tr>
                  <th className={`p-4 ${textColor}`}>Worker Details</th>
                  <th className={`p-4 ${textColor}`}>Task Title</th>
                  <th className={`p-4 ${textColor}`}>Payable Amount</th>
                  <th className={`p-4 ${textColor}`}>Submission</th>
                  <th className={`p-4 ${textColor}`}></th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody>
                {allTaskSubmission.map((task) => (
                  <TaskRow
                    key={task._id}
                    task={task}
                    refetch={refetch}
                    textColor={textColor} // Pass textColor to TaskRow to adjust task row text
                    accentColor={accentColor} // Pass accentColor for specific task highlights
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTask;
