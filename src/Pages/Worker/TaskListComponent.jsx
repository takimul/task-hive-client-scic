// import { Link } from "react-router-dom";

// const TaskListComponent = ({task}) => {
//     return (
//         <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//             <div>
//                 <img className="rounded-t-lg h-[280px] w-full" src={task?.task_image} alt="" />
//             </div>
//             <div className="p-5">
//                 <h5 className="mb-1 lg:text-2xl md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">{task?.task_title}</h5>
//                 <h3 className="lg:text-xl md:text-lg font-semibold mb-1">Creator Name: {task?.user?.name}</h3>
//                 <p>Completion Date: {new Date(task?.deadline).toLocaleDateString()}</p>
//                 <p>Payable Amount: {task?.payable_amount} coin</p>
//                 <p className="mb-2">Task Quantity: {task?.required_workers}</p>

//                 <Link to={`/dashboard/task-details/${task._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     View Details
//                     <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                         <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                     </svg>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default TaskListComponent;

import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const TaskListComponent = ({ task }) => {
  const { theme } = useContext(ThemeContext); // Access current theme

  // Conditional classes based on theme
  const cardClass =
    theme === "light"
      ? "bg-white border-gray-200 shadow"
      : "bg-gray-800 border-gray-700 shadow-lg";
  const textClass = theme === "light" ? "text-gray-900" : "text-white";
  const buttonClass =
    theme === "light"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className={`border rounded-lg ${cardClass}`}>
      <div>
        <img
          className="rounded-t-lg h-[280px] w-fit mx-auto"
          src={task?.task_image}
          alt={task?.task_title}
        />
      </div>
      <div className="p-5">
        <h5
          className={`mb-1 lg:text-2xl md:text-xl font-bold tracking-tight ${textClass}`}
        >
          {task?.task_title}
        </h5>
        <h3 className={`lg:text-xl md:text-lg font-semibold mb-1 ${textClass}`}>
          Creator Name: {task?.user?.name}
        </h3>
        <p className={`${textClass}`}>
          Completion Date: {new Date(task?.deadline).toLocaleDateString()}
        </p>
        <p className={`${textClass}`}>
          Payable Amount: {task?.payable_amount} coin
        </p>
        <p className={`mb-2 ${textClass}`}>
          Task Quantity: {task?.required_workers}
        </p>

        <Link
          to={`/dashboard/task-details/${task._id}`}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${buttonClass} focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
        >
          View Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default TaskListComponent;
