import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

import Loading from "../../../Component/Loading";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ThemeContext } from "../../../provider/ThemeProvider";

// Register necessary components of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BuyerState = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access the current theme

  // Conditional styles based on the current theme
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const accentColor = theme === "light" ? "text-indigo-400" : "text-indigo-300";
  const bgColor = theme === "light" ? "bg-base-200" : "bg-gray-900";

  // eslint-disable-next-line no-unused-vars
  const {
    data: state,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyer-home", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buyer-state/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Prepare chart data for the three different charts with dark theme adjustments
  const coinChartData = {
    labels: ["Available coins"],
    datasets: [
      {
        label: "Available coins",
        data: [state.coins],
        backgroundColor: theme === "light" ? "#4c9bdb" : "#2b88c3", // Light Blue for light theme, Darker Blue for dark theme
        borderColor: theme === "light" ? "#3090b7" : "#1a6b91",
        borderWidth: 1,
      },
    ],
  };

  const taskChartData = {
    labels: ["Pending Task"],
    datasets: [
      {
        data: [state.pendingTask, 100 - state.pendingTask], // Representing pending task and the remainder
        backgroundColor: [
          theme === "light" ? "#4c9bdb" : "#2b88c3", // Blue for pending task
          theme === "light" ? "#e0e0e0" : "#555555", // Gray for the remainder in light/dark theme
        ],
        borderColor: [
          theme === "light" ? "#3090b7" : "#1a6b91",
          theme === "light" ? "#b0b0b0" : "#999999",
        ],
        borderWidth: 1,
      },
    ],
  };

  const paymentChartData = {
    labels: ["Total Payment"],
    datasets: [
      {
        data: [state.total, 100 - state.total], // Representing total payment and the remainder
        backgroundColor: [
          theme === "light" ? "#4c9bdb" : "#2b88c3", // Blue for total payment
          theme === "light" ? "#e0e0e0" : "#555555", // Gray for the remainder in light/dark theme
        ],
        borderColor: [
          theme === "light" ? "#3090b7" : "#1a6b91",
          theme === "light" ? "#b0b0b0" : "#999999",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Buyer Stats Overview",
        color: theme === "light" ? "#000" : "#fff", // Dynamic title color
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: theme === "light" ? "#000" : "#fff", // Y axis color
        },
      },
      x: {
        ticks: {
          color: theme === "light" ? "#000" : "#fff", // X axis color
        },
      },
    },
  };

  return (
    <div className={`${bgColor} rounded-lg flex justify-center items-center`}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
          {/* Displaying the stats in different charts */}

          {/* Available Coins - Bar Chart */}
          <div className={`${cardBg} overflow-hidden shadow sm:rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <h3 className={`text-center text-xl font-bold ${textColor}`}>
                Available Coins
              </h3>
              <Bar data={coinChartData} options={chartOptions} />
            </div>
          </div>

          {/* Pending Task - Pie Chart */}
          <div className={`${cardBg} overflow-hidden shadow sm:rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <h3 className={`text-center text-xl font-bold ${textColor}`}>
                Pending Task
              </h3>
              <Pie data={taskChartData} options={chartOptions} />
            </div>
          </div>

          {/* Total Payment - Doughnut Chart */}
          <div className={`${cardBg} overflow-hidden shadow sm:rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <h3 className={`text-center text-xl font-bold ${textColor}`}>
                Total Payment
              </h3>
              <Doughnut data={paymentChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerState;
