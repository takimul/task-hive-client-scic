import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Component/Loading";
import NoTask from "./NoTask";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeProvider";

const MyTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access the current theme
  const queryClient = useQueryClient();

  const {
    data: tableData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-task", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-task/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (tableData.length === 0) {
    return <NoTask />;
  }

  const handleDeleteTask = (id, required_workers, payable_amount) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (swalResult) => {
      if (swalResult.isConfirmed) {
        const deleteResult = await axiosSecure.delete(`/all-task/${id}`);
        if (deleteResult.data.deletedCount > 0) {
          const increaseResult = await axiosSecure.patch(
            `/increase-coin/${user?.email}`,
            { value: required_workers * payable_amount }
          );
          refetch();
          queryClient.invalidateQueries(["data"]);
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  // Conditional styles based on theme
  const bgClass = theme === "light" ? "bg-white" : "bg-gray-800";
  const textClass = theme === "light" ? "text-gray-800" : "text-white";
  const borderClass = theme === "light" ? "border-gray-200" : "border-gray-600";
  const hoverClass =
    theme === "light" ? "hover:text-rose-500" : "hover:text-rose-400";
  const buttonHoverClass =
    theme === "light" ? "hover:text-rose-500" : "hover:text-rose-400";

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className={`min-w-full leading-normal ${bgClass}`}>
              <thead>
                <tr className="text-lg">
                  <th
                    scope="col"
                    className={`px-5 py-3 ${bgClass} ${borderClass} ${textClass} text-left text-sm uppercase font-normal`}
                  >
                    Task Title
                  </th>
                  <th
                    scope="col"
                    className={`px-5 py-3 ${bgClass} ${borderClass} ${textClass} text-left text-sm uppercase font-normal`}
                  >
                    Task Quantity
                  </th>
                  <th
                    scope="col"
                    className={`px-5 py-3 ${bgClass} ${borderClass} ${textClass} text-left text-sm uppercase font-normal`}
                  >
                    Payable Amount
                  </th>
                  <th
                    scope="col"
                    className={`px-5 py-3 ${bgClass} ${borderClass} ${textClass} text-left text-sm uppercase font-normal`}
                  >
                    Delete
                  </th>
                  <th
                    scope="col"
                    className={`px-5 py-3 ${bgClass} ${borderClass} ${textClass} text-left text-sm uppercase font-normal`}
                  >
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data) => (
                  <tr key={data._id}>
                    <td
                      className={`px-5 py-5 border-b ${borderClass} ${bgClass} text-sm ${textClass}`}
                    >
                      {data.task_title}
                    </td>
                    <td
                      className={`px-5 py-5 border-b ${borderClass} ${bgClass} text-sm ${textClass}`}
                    >
                      {data.required_workers}
                    </td>
                    <td
                      className={`px-5 py-5 border-b ${borderClass} ${bgClass} text-sm ${textClass}`}
                    >
                      {data.payable_amount} coin
                    </td>
                    <td
                      className={`px-5 py-5 border-b ${borderClass} ${bgClass} text-sm ${textClass}`}
                    >
                      <button
                        onClick={() =>
                          handleDeleteTask(
                            data._id,
                            data.required_workers,
                            data.payable_amount
                          )
                        }
                        className={`btn btn-circle transition-all duration-200 ${buttonHoverClass}`}
                      >
                        <MdDelete className="text-xl " />
                      </button>
                    </td>
                    <td
                      className={`px-5 py-5 border-b ${borderClass} ${bgClass} text-sm ${textClass}`}
                    >
                      <Link
                        to={`/dashboard/update-task/${data._id}`}
                        className={`btn btn-circle transition-all duration-200 ${buttonHoverClass}`}
                      >
                        <FiEdit className="text-xl " />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
