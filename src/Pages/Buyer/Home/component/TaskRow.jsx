// /* eslint-disable react/prop-types */
// import Swal from "sweetalert2";
// import SubmissionModal from "./SubmissionModal";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { useQueryClient } from "@tanstack/react-query";

// const TaskRow = ({ task, refetch }) => {
//   const axiosSecure = useAxiosSecure();

//   const queryClient = useQueryClient();
//   const modalId = `modal_${task._id}`;
//   //console.log(task);

//   const handleStatusReject = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Reject it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const data = await axiosSecure.patch(`/task/reject/${id}`, {
//           status: "Reject",
//         });
//         //console.log();
//         if (data.data.modifiedCount) {
//           Swal.fire({
//             title: "Rejected!",
//             text: "Rejected Successfully.",
//             icon: "success",
//           });
//           refetch();
//           queryClient.invalidateQueries(["buyer-home"]);
//         }
//       }
//     });
//   };

//   const handleStatusUpdate = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Approve it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const data = await axiosSecure.patch(`/task/approve/${id}`, {
//           status: "Approve",
//         });
//         //console.log(data.data.modifiedCount);
//         if (data.data.modifiedCount) {
//           const data = await axiosSecure.patch(
//             `/update-user-coin/${task.worker_email}`,
//             { coins: task.payable_amount }
//           );
//           const notification = {
//             message: `you have earned ${task.payable_amount} from ${task.buyer_name} for completing ${task.task_title}`,
//             status: "unread",
//             toEmail: task.worker_email,
//             date: new Date(),
//             time: Date.now(),
//           };
//           // //console.log(notification);
//           const notifi= await axiosSecure.post("/notification", notification);
//           //console.log(notifi);

//           //console.log(data.data.modifiedCount, "form coins update");

//           Swal.fire({
//             title: "Approve!",
//             text: "Approve Successfully.",
//             icon: "success",
//           });
//           refetch();
//           queryClient.invalidateQueries(["buyer-home"]);
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <tr>
//         <th>
//           <div className="flex items-center gap-3">
//             <div className="avatar">
//               <div className="mask mask-squircle w-12 h-12">
//                 <img
//                   src={task.worker_image}
//                   alt="Avatar Tailwind CSS Component"
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="font-bold">{task.worker_name}</div>
//               <div className="text-sm opacity-50">{task.worker_email}</div>
//             </div>
//           </div>
//         </th>
//         <td>{task.task_title}</td>
//         <td>{task.payable_amount} coin</td>
//         <td>
//           <button
//             className="underline"
//             onClick={() => document.getElementById(modalId).showModal()}
//           >
//             View Submission
//           </button>
//           <SubmissionModal task={task} modalId={modalId}></SubmissionModal>
//         </td>
//         <td className="flex gap-2">
//           <button
//             onClick={() => handleStatusReject(task._id)}
//             className="py-2 px-4 rounded-lg bg-red-400 font-medium"
//           >
//             Reject
//           </button>
//           <button
//             onClick={() => handleStatusUpdate(task._id)}
//             className="py-2 px-4 rounded-lg bg-green-400 font-medium"
//           >
//             Approve
//           </button>
//         </td>
//       </tr>
//     </>
//   );
// };

// export default TaskRow;

/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import SubmissionModal from "./SubmissionModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ThemeContext } from "../../../../provider/ThemeProvider";

const TaskRow = ({ task, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);

  const modalId = `modal_${task._id}`;

  // Conditional styles based on the current theme
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const buttonRejectBg = theme === "light" ? "bg-red-400" : "bg-red-600";
  const buttonApproveBg = theme === "light" ? "bg-green-400" : "bg-green-600";

  const handleStatusReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axiosSecure.patch(`/task/reject/${id}`, {
          status: "Reject",
        });
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Rejected!",
            text: "Rejected Successfully.",
            icon: "success",
          });
          refetch();
          queryClient.invalidateQueries(["buyer-home"]);
        }
      }
    });
  };

  const handleStatusUpdate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axiosSecure.patch(`/task/approve/${id}`, {
          status: "Approve",
        });
        if (data.data.modifiedCount) {
          await axiosSecure.patch(`/update-user-coin/${task.worker_email}`, {
            coins: task.payable_amount,
          });
          const notification = {
            message: `You have earned ${task.payable_amount} from ${task.buyer_name} for completing ${task.task_title}`,
            status: "unread",
            toEmail: task.worker_email,
            date: new Date(),
            time: Date.now(),
          };
          await axiosSecure.post("/notification", notification);

          Swal.fire({
            title: "Approved!",
            text: "Approved Successfully.",
            icon: "success",
          });
          refetch();
          queryClient.invalidateQueries(["buyer-home"]);
        }
      }
    });
  };

  return (
    <tr className={textColor}>
      <th>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={task.worker_image} alt="Worker Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{task.worker_name}</div>
            <div className="text-sm opacity-50">{task.worker_email}</div>
          </div>
        </div>
      </th>
      <td>{task.task_title}</td>
      <td>{task.payable_amount} coin</td>
      <td>
        <button
          className="underline"
          onClick={() => document.getElementById(modalId).showModal()}
        >
          View Submission
        </button>
        <SubmissionModal task={task} modalId={modalId} />
      </td>
      <td className="flex gap-2">
        <button
          onClick={() => handleStatusReject(task._id)}
          className={`py-2 px-4 rounded-lg font-medium ${buttonRejectBg}`}
        >
          Reject
        </button>
        <button
          onClick={() => handleStatusUpdate(task._id)}
          className={`py-2 px-4 rounded-lg font-medium ${buttonApproveBg}`}
        >
          Approve
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
