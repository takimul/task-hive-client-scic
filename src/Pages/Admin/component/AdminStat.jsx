// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Loading from "../../../Component/Loading";

// const AdminStat = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: adminStat, isLoading } = useQuery({
//         queryKey: ['admin-state'],
//         queryFn: async () => {
//             const { data } = await axiosSecure.get('/admin/state');
//             return data;
//         }
//     });

//     if (isLoading) {
//         return <Loading></Loading>;
//     }

//     return (
//         <div className="bg-gray-200 flex justify-center items-center">
//             <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
//                     {/* Total Buyers */}
//                     <div className="bg-white overflow-hidden shadow sm:rounded-lg">
//                         <div className="px-4 py-5 sm:p-6">
//                             <dl>
//                                 <dt className="text-sm leading-5 font-medium truncate text-gray-400">Total Buyers</dt>
//                                 <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-400">{adminStat.totalBuyers}</dd>
//                             </dl>
//                         </div>
//                     </div>

//                     {/* Total Workers */}
//                     <div className="bg-white overflow-hidden shadow sm:rounded-lg">
//                         <div className="px-4 py-5 sm:p-6">
//                             <dl>
//                                 <dt className="text-sm leading-5 font-medium truncate text-gray-400">Total Workers</dt>
//                                 <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-400">{adminStat.totalWorkers}</dd>
//                             </dl>
//                         </div>
//                     </div>

//                     {/* Total Coin */}
//                     <div className="bg-white overflow-hidden shadow sm:rounded-lg">
//                         <div className="px-4 py-5 sm:p-6">
//                             <dl>
//                                 <dt className="text-sm leading-5 font-medium truncate text-gray-400">Total Coin</dt>
//                                 <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-400">{adminStat.totalCoin}</dd>
//                             </dl>
//                         </div>
//                     </div>

//                     {/* Total Payments */}
//                     <div className="bg-white overflow-hidden shadow sm:rounded-lg">
//                         <div className="px-4 py-5 sm:p-6">
//                             <dl>
//                                 <dt className="text-sm leading-5 font-medium truncate text-gray-400">Total Payments</dt>
//                                 <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-400">{adminStat.totalPay}</dd>
//                             </dl>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminStat;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Loading from "../../../Component/Loading";
// import { useContext } from "react";
// import { ThemeContext } from "../../../provider/ThemeProvider";

// const AdminStat = () => {
//   const axiosSecure = useAxiosSecure();
//   const { theme } = useContext(ThemeContext); // Access the current theme

//   const { data: adminStat, isLoading } = useQuery({
//     queryKey: ["admin-state"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/admin/state");
//       return data;
//     },
//   });

//   if (isLoading) {
//     return <Loading></Loading>;
//   }

//   // Conditional class names based on the theme
//   const bgColor = theme === "light" ? "bg-gray-200" : "bg-gray-800";
//   const cardBgColor = theme === "light" ? "bg-white" : "bg-gray-700";
//   const textColor = theme === "light" ? "text-gray-800" : "text-white";
//   const textAccentColor =
//     theme === "light" ? "text-indigo-400" : "text-indigo-200";

//   return (
//     <div className={`${bgColor} flex justify-center items-center`}>
//       <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
//           {/* Total Buyers */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Buyers
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalBuyers}
//                 </dd>
//               </dl>
//             </div>
//           </div>

//           {/* Total Workers */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Workers
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalWorkers}
//                 </dd>
//               </dl>
//             </div>
//           </div>

//           {/* Total Coin */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Coin
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalCoin}
//                 </dd>
//               </dl>
//             </div>
//           </div>

//           {/* Total Payments */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Payments
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalPay}
//                 </dd>
//               </dl>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStat;
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Loading from "../../../Component/Loading";
// import { useContext } from "react";
// import { ThemeContext } from "../../../provider/ThemeProvider";
// import { Pie, Bar, Line } from "react-chartjs-2"; // Import chart types
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement,
// } from "chart.js";

// // Register the necessary chart components
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement,
//   LineElement
// );

// const AdminStat = () => {
//   const axiosSecure = useAxiosSecure();
//   const { theme } = useContext(ThemeContext); // Access the current theme

//   const { data: adminStat, isLoading } = useQuery({
//     queryKey: ["admin-state"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/admin/state");
//       return data;
//     },
//   });

//   if (isLoading) {
//     return <Loading />;
//   }

//   // Conditional class names based on the theme
//   const bgColor = theme === "light" ? "bg-gray-200" : "bg-gray-800";
//   const cardBgColor = theme === "light" ? "bg-white" : "bg-gray-700";
//   const textColor = theme === "light" ? "text-gray-800" : "text-white";
//   const textAccentColor =
//     theme === "light" ? "text-indigo-400" : "text-indigo-200";

//   // Chart data setup
//   const pieData = {
//     labels: ["Total Buyers", "Total Workers", "Total Coin", "Total Payments"],
//     datasets: [
//       {
//         label: "Total Stats",
//         data: [
//           adminStat.totalBuyers,
//           adminStat.totalWorkers,
//           adminStat.totalCoin,
//           adminStat.totalPay,
//         ],
//         backgroundColor: [
//           theme === "light" ? "#4C9A2A" : "#1C7C1F", // Green
//           theme === "light" ? "#FF9800" : "#D97300", // Orange
//           theme === "light" ? "#2196F3" : "#1976D2", // Blue
//           theme === "light" ? "#F44336" : "#D32F2F", // Red
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const barData = {
//     labels: ["Total Buyers", "Total Workers", "Total Coin", "Total Payments"],
//     datasets: [
//       {
//         label: "Stats",
//         data: [
//           adminStat.totalBuyers,
//           adminStat.totalWorkers,
//           adminStat.totalCoin,
//           adminStat.totalPay,
//         ],
//         backgroundColor: [
//           theme === "light" ? "#4C9A2A" : "#1C7C1F",
//           theme === "light" ? "#FF9800" : "#D97300",
//           theme === "light" ? "#2196F3" : "#1976D2",
//           theme === "light" ? "#F44336" : "#D32F2F",
//         ],
//         borderColor: theme === "light" ? "#000000" : "#FFFFFF",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const lineData = {
//     labels: ["Total Buyers", "Total Workers", "Total Coin", "Total Payments"],
//     datasets: [
//       {
//         label: "Stats Over Time",
//         data: [
//           adminStat.totalBuyers,
//           adminStat.totalWorkers,
//           adminStat.totalCoin,
//           adminStat.totalPay,
//         ],
//         fill: false,
//         borderColor: theme === "light" ? "#2196F3" : "#1976D2",
//         tension: 0.1,
//       },
//     ],
//   };

//   // Options for each chart type
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: theme === "light" ? "#000" : "#fff", // Adjust legend text color based on theme
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return tooltipItem.raw.toLocaleString(); // Format number with commas
//           },
//         },
//         backgroundColor: theme === "light" ? "#fff" : "#333", // Tooltip background color
//         titleColor: theme === "light" ? "#000" : "#fff", // Tooltip title color
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: theme === "light" ? "#000" : "#fff", // X-axis tick color
//         },
//       },
//       y: {
//         ticks: {
//           color: theme === "light" ? "#000" : "#fff", // Y-axis tick color
//         },
//       },
//     },
//     elements: {
//       line: {
//         borderWidth: 2,
//       },
//       point: {
//         radius: 5,
//       },
//     },
//     layout: {
//       padding: {
//         left: 20,
//         right: 20,
//         top: 20,
//         bottom: 20,
//       },
//     },
//   };

//   return (
//     <div className={`${bgColor} flex justify-center items-center`}>
//       <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
//           {/* Total Buyers */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Buyers
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalBuyers}
//                 </dd>
//               </dl>
//             </div>
//           </div>

//           {/* Total Workers */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Workers
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalWorkers}
//                 </dd>
//               </dl>
//             </div>
//           </div>

//           {/* Total Coin */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Coin
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalCoin}
//                 </dd>
//               </dl>
//             </div>
//           </div>

//           {/* Total Payments */}
//           <div
//             className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt
//                   className={`text-sm leading-5 font-medium truncate text-gray-400`}
//                 >
//                   Total Payments
//                 </dt>
//                 <dd
//                   className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
//                 >
//                   {adminStat.totalPay}
//                 </dd>
//               </dl>
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Pie Chart */}
//           <div className="bg-white shadow sm:rounded-lg p-6">
//             <h3 className={`text-center text-xl font-medium ${textColor}`}>
//               Stats Distribution
//             </h3>
//             <Pie data={pieData} options={options} />
//           </div>

//           {/* Bar Chart */}
//           <div className="bg-white shadow sm:rounded-lg p-6">
//             <h3 className={`text-center text-xl font-medium ${textColor}`}>
//               Stats Overview
//             </h3>
//             <Bar data={barData} options={options} />
//           </div>
//         </div>

//         {/* Line Chart */}
//         <div className="mt-8 bg-white shadow sm:rounded-lg p-6">
//           <h3 className={`text-center text-xl font-medium ${textColor}`}>
//             Stats Over Time
//           </h3>
//           <Line data={lineData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStat;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading";
import { useContext } from "react";

import { Pie, Bar, Line } from "react-chartjs-2"; // Import chart types
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { ThemeContext } from "../../../provider/ThemeProvider";

// Register the necessary chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const AdminStat = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const { data: adminStat, isLoading } = useQuery({
    queryKey: ["admin-state"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/state");
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Conditional class names based on the theme
  const bgColor = theme === "light" ? "bg-gray-200" : "bg-gray-800";
  const cardBgColor = theme === "light" ? "bg-white" : "bg-gray-700";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const textAccentColor =
    theme === "light" ? "text-indigo-400" : "text-indigo-200";

  // Chart data setup
  const pieData = {
    labels: ["Total Buyers", "Total Workers", "Total Coin", "Total Payments"],
    datasets: [
      {
        label: "Total Stats",
        data: [
          adminStat.totalBuyers,
          adminStat.totalWorkers,
          adminStat.totalCoin,
          adminStat.totalPay,
        ],
        backgroundColor: [
          theme === "light" ? "#4C9A2A" : "#1C7C1F", // Green
          theme === "light" ? "#FF9800" : "#D97300", // Orange
          theme === "light" ? "#2196F3" : "#1976D2", // Blue
          theme === "light" ? "#F44336" : "#D32F2F", // Red
        ],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ["Total Buyers", "Total Workers", "Total Coin", "Total Payments"],
    datasets: [
      {
        label: "Stats",
        data: [
          adminStat.totalBuyers,
          adminStat.totalWorkers,
          adminStat.totalCoin,
          adminStat.totalPay,
        ],
        backgroundColor: [
          theme === "light" ? "#4C9A2A" : "#1C7C1F",
          theme === "light" ? "#FF9800" : "#D97300",
          theme === "light" ? "#2196F3" : "#1976D2",
          theme === "light" ? "#F44336" : "#D32F2F",
        ],
        borderColor: theme === "light" ? "#000000" : "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Total Buyers", "Total Workers", "Total Coin", "Total Payments"],
    datasets: [
      {
        label: "Stats Over Time",
        data: [
          adminStat.totalBuyers,
          adminStat.totalWorkers,
          adminStat.totalCoin,
          adminStat.totalPay,
        ],
        fill: false,
        borderColor: theme === "light" ? "#2196F3" : "#1976D2",
        tension: 0.1,
      },
    ],
  };

  // Options for each chart type
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw.toLocaleString(); // Format number with commas
          },
        },
      },
    },
  };

  return (
    <div className={`${bgColor} flex justify-center items-center`}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
          {/* Total Buyers */}
          <div
            className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate text-gray-400`}
                >
                  Total Buyers
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
                >
                  {adminStat.totalBuyers}
                </dd>
              </dl>
            </div>
          </div>

          {/* Total Workers */}
          <div
            className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate text-gray-400`}
                >
                  Total Workers
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
                >
                  {adminStat.totalWorkers}
                </dd>
              </dl>
            </div>
          </div>

          {/* Total Coin */}
          <div
            className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate text-gray-400`}
                >
                  Total Coin
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
                >
                  {adminStat.totalCoin}
                </dd>
              </dl>
            </div>
          </div>

          {/* Total Payments */}
          <div
            className={`${cardBgColor} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate text-gray-400`}
                >
                  Total Payments
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentColor}`}
                >
                  {adminStat.totalPay}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className={`text-center text-xl font-medium ${textColor}`}>
              Stats Distribution
            </h3>
            <Pie data={pieData} options={options} />
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className={`text-center text-xl font-medium ${textColor}`}>
              Stats Overview
            </h3>
            <Bar data={barData} options={options} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="mt-8 bg-white shadow sm:rounded-lg p-6">
          <h3 className={`text-center text-xl font-medium ${textColor}`}>
            Stats Over Time
          </h3>
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminStat;
