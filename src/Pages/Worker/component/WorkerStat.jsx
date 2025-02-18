import { useContext } from "react";
import Loading from "../../../Component/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import { Line, Bar } from "react-chartjs-2"; // Import the chart library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { ThemeContext } from "../../../provider/ThemeProvider";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WorkerStat = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Get current theme
  const axiosSecure = useAxiosSecure();

  const {
    data: state,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["home-stat", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/worker-state/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Conditional styling for dark mode
  const cardBgClass = theme === "light" ? "bg-white" : "bg-gray-800";
  const textClass = theme === "light" ? "text-gray-900" : "text-white";
  const textAccentClass =
    theme === "light" ? "text-indigo-400" : "text-indigo-300";
  const bgClass = theme === "light" ? "bg-gray-200" : "bg-gray-900";

  // Chart Data for Earnings (Line Chart)
  const chartDataEarnings = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Example months
    datasets: [
      {
        label: "Earnings",
        data: [65, 59, 80, 81, 56, 55, 40], // Example earnings data
        borderColor:
          theme === "light" ? "rgb(59, 130, 246)" : "rgb(29, 78, 216)", // Adjust color based on theme
        backgroundColor:
          theme === "light"
            ? "rgba(59, 130, 246, 0.2)"
            : "rgba(29, 78, 216, 0.2)", // Light blue fill for light theme, blue for dark
        fill: true,
      },
    ],
  };

  // Chart Options for Earnings (Line Chart)
  const chartOptionsEarnings = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme === "light" ? "#333" : "#fff", // Adjust legend text color based on theme
        },
      },
      title: {
        display: true,
        text: "Monthly Earnings",
        color: theme === "light" ? "#333" : "#fff", // Adjust title color based on theme
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "light" ? "#ddd" : "#444", // Adjust grid lines color
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "#ddd" : "#444", // Adjust grid lines color
        },
      },
    },
  };

  // Chart Data for Submissions (Bar Chart)
  const chartDataSubmissions = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Example weeks
    datasets: [
      {
        label: "Submissions",
        data: [5, 10, 7, 15], // Example submission data
        borderColor:
          theme === "light" ? "rgb(34, 197, 94)" : "rgb(22, 163, 74)", // Green color for light theme, dark green for dark
        backgroundColor:
          theme === "light"
            ? "rgba(34, 197, 94, 0.2)"
            : "rgba(22, 163, 74, 0.2)", // Light green fill for light theme, dark green for dark
        borderWidth: 1,
      },
    ],
  };

  // Chart Options for Submissions (Bar Chart)
  const chartOptionsSubmissions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme === "light" ? "#333" : "#fff", // Adjust legend text color based on theme
        },
      },
      title: {
        display: true,
        text: "Weekly Submissions",
        color: theme === "light" ? "#333" : "#fff", // Adjust title color based on theme
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "light" ? "#ddd" : "#444", // Adjust grid lines color
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "#ddd" : "#444", // Adjust grid lines color
        },
      },
    },
  };

  return (
    <div className={`${bgClass} flex justify-center items-center`}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
          {/* Available Coins */}
          <div
            className={`${cardBgClass} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate ${textClass}`}
                >
                  Available coins
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentClass}`}
                >
                  {state.coins}
                </dd>
              </dl>
            </div>
          </div>

          {/* Total Submission */}
          <div
            className={`${cardBgClass} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate ${textClass}`}
                >
                  Total Submission
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentClass}`}
                >
                  {state.total_submission}
                </dd>
              </dl>
            </div>
          </div>

          {/* Total Earnings */}
          <div
            className={`${cardBgClass} overflow-hidden shadow sm:rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt
                  className={`text-sm leading-5 font-medium truncate ${textClass}`}
                >
                  Total Earning
                </dt>
                <dd
                  className={`mt-1 text-3xl leading-9 font-semibold ${textAccentClass}`}
                >
                  {state.total}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Earnings Chart (Line) */}
        <div className="mt-8 bg-white p-4 shadow sm:rounded-lg">
          <Line data={chartDataEarnings} options={chartOptionsEarnings} />
        </div>

        {/* Submissions Chart (Bar) */}
        <div className="mt-8 bg-white p-4 shadow sm:rounded-lg">
          <Bar data={chartDataSubmissions} options={chartOptionsSubmissions} />
        </div>
      </div>
    </div>
  );
};

export default WorkerStat;
