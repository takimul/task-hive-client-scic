import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading";
import TaskListComponent from "./TaskListComponent";
import { useState, useContext } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { ThemeContext } from "../../provider/ThemeProvider";

const WorkerTaskList = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // Access current theme

  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: allTask, isLoading } = useQuery({
    queryKey: ["all-task", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/all-task?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const { data: taskCount, isLoading: countLoading } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/taskCount`);
      return data;
    },
  });

  if (isLoading || countLoading) {
    return <Loading />;
  }

  const numberOfPages = Math.ceil(taskCount?.count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleItemPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Conditional styles based on theme
  const containerClass = theme === "light" ? "bg-white" : "bg-gray-800";
  const textClass = theme === "light" ? "text-gray-900" : "text-white";
  const buttonClass =
    theme === "light"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className={`${containerClass} min-h-screen p-5`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {allTask.map((task) => (
          <TaskListComponent key={task._id} task={task} />
        ))}
      </div>

      <div className="flex justify-center my-5 gap-5">
        <button
          onClick={handlePrevPage}
          className={buttonClass}
          disabled={currentPage === 0}
        >
          <GrLinkPrevious />
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`btn ${buttonClass} ${
              currentPage === page ? "bg-orange-400 text-black" : ""
            }`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={buttonClass}
          disabled={currentPage === pages.length - 1}
        >
          <GrLinkNext />
        </button>

        <select
          onChange={handleItemPerPage}
          value={itemsPerPage}
          className={`${
            theme === "light"
              ? "bg-white text-gray-900"
              : "bg-gray-700 text-white"
          } p-2 rounded-md`}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default WorkerTaskList;
