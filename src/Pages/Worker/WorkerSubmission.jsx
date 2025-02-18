// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";
// import Loading from "../../Component/Loading";
// import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

// const WorkerSubmission = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const [itemsPerPage, setItemPerPage] = useState(10); //new
//     const [currentPage, setCurrentPage] = useState(0);

//   const { data: submissionData, isLoading } = useQuery({
//     queryKey: ["submission-data", user?.email, currentPage, itemsPerPage],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/work-submission/${user?.email}?page=${currentPage}&size=${itemsPerPage}`);
//       return data;
//     },
//   });

//   const { data: submissionCount, isLoading: countLoading } = useQuery({
//     queryKey: ["count"],
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/submissionCount`);
//       return data;
//     },
//   });
  
//   if (isLoading || countLoading) {
//     return <Loading></Loading>;
//   }
//   const numberOfPages = Math.ceil(submissionCount?.count / itemsPerPage);
  

//   const pages = [...Array(numberOfPages).keys()];

//   const handleItemPerPage = (e) => {
//     const value = parseInt(e.target.value);
//     setItemPerPage(value);
//     setCurrentPage(0);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   return (
//     <div className="overflow-x-auto">
//       <table className="table">
//         {/* head */}
//         <thead>
//           <tr>
//             <th>Task Creator</th>
//             <th>Task Title</th>
//             <th>Task Detail</th>
//             <th>Submission Details</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submissionData.map((data) => (
//             <tr key={data._id}>
//               <td>
//                 <div className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="mask mask-squircle w-12 h-12">
//                       <img
//                         src={data.creator_image}
//                         alt="Avatar Tailwind CSS Component"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="font-bold">{data.buyer_name}</div>
//                     <div className="text-sm opacity-50">
//                       {data.buyer_email}
//                     </div>
//                   </div>
//                 </div>
//               </td>
//               <td>{data.task_title}</td>
//               <td title={data.task_detail}>
//                 {" "}
//                 {data.task_detail.length > 50
//                   ? data.task_detail.slice(0, 20) + "...."
//                   : data.task_detail}
//               </td>
//               <td title={data.submission_details}>
//                 {" "}
//                 {data.submission_details.length > 20
//                   ? data.submission_details.slice(0, 20) + "...."
//                   : data.submission_details}
//               </td>
//               <th>{data.status}</th>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-center my-5 gap-5">
//               <button onClick={handlePrevPage}>
//                 <GrLinkPrevious></GrLinkPrevious>
//               </button>
//               {pages.map((page) => (
//                 <button
//                   onClick={() => setCurrentPage(page)}
//                   className={`btn btn-primary ${
//                     currentPage === page ? "bg-orange-400 text-black" : undefined
//                   }`}
//                   key={page}
//                 >
//                   {page + 1}
//                 </button>
//               ))}
//               <button onClick={handleNextPage}>
//                 <GrLinkNext></GrLinkNext>
//               </button>
//               <select onChange={handleItemPerPage} value={itemsPerPage}>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="30">30</option>
//                 <option value="50">50</option>
//               </select>
//             </div>
//     </div>
//   );
// };

// export default WorkerSubmission;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Component/Loading";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const WorkerSubmission = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: submissionData, isLoading } = useQuery({
    queryKey: ["submission-data", user?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/work-submission/${user?.email}?page=${currentPage}&size=${itemsPerPage}`);
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

  return (
    <div className="overflow-x-auto">
      <table className="table">
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
              <td colSpan="5" className="text-center py-4">No submissions found.</td>
            </tr>
          ) : (
            submissionData.map((data) => (
              <tr key={data._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={data.creator_image}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data.buyer_name}</div>
                      <div className="text-sm opacity-50">{data.buyer_email}</div>
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
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          <GrLinkPrevious />
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`btn btn-primary ${
              currentPage === page ? "bg-orange-400 text-black" : undefined
            }`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === numberOfPages - 1}>
          <GrLinkNext />
        </button>
        <select onChange={handleItemPerPage} value={itemsPerPage}>
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
