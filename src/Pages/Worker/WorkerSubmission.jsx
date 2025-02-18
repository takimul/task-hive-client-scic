import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Component/Loading";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { ThemeContext } from "../../provider/ThemeProvider";

const WorkerSubmission = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access current theme

  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: submissionData, isLoading } = useQuery({
    queryKey: ["submission-data", user?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/work-submission/${user?.email}?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const { data: submissionCount, isLoading: countLoading } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/submissionCount`);
      return data;
    },
  });

  if (isLoading || countLoading) {
    return <Loading />;
  }

  const numberOfPages = Math.ceil(submissionCount?.count / itemsPerPage);
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
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Define conditional theme classes
  const tableClass =
    theme === "light" ? "table-auto" : "table-auto text-white bg-gray-800";
  const buttonClass =
    theme === "light"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-600 hover:bg-blue-700";
  const pageButtonClass =
    theme === "light" ? "btn btn-primary" : "btn btn-primary bg-gray-600";

  return (
    <div
      className={`overflow-x-auto ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      } p-5`}
    >
      <table className={`table ${tableClass}`}>
        <thead>
          <tr>
            <th>Task Creator</th>
            <th>Task Title</th>
            <th>Task Detail</th>
            <th>Submission Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissionData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No submissions found.
              </td>
            </tr>
          ) : (
            submissionData.map((data) => (
              <tr key={data._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={data.creator_image} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data.buyer_name}</div>
                      <div className="text-sm opacity-50">
                        {data.buyer_email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{data.task_title}</td>
                <td title={data.task_detail}>
                  {data.task_detail.length > 50
                    ? data.task_detail.slice(0, 20) + "...."
                    : data.task_detail}
                </td>
                <td title={data.submission_details}>
                  {data.submission_details.length > 20
                    ? data.submission_details.slice(0, 20) + "...."
                    : data.submission_details}
                </td>
                <th>{data.status}</th>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-center my-5 gap-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`${buttonClass} rounded-xl px-2`}
        >
          <GrLinkPrevious />
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`btn ${
              currentPage === page
                ? "bg-orange-400 text-black"
                : pageButtonClass
            }`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages - 1}
          className={`${buttonClass} rounded-xl px-2`}
        >
          <GrLinkNext />
        </button>
        <select
          onChange={handleItemPerPage}
          value={itemsPerPage}
          className={` rounded-xl ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
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

export default WorkerSubmission;
