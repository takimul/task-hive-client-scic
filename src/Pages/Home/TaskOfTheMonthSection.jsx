import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const TaskOfTheMonthSection = () => {
  const { theme } = useContext(ThemeContext); // Access current theme

  // Conditional styling based on theme
  const sectionBg = theme === "light" ? "bg-gray-100" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const textMuted = theme === "light" ? "text-gray-600" : "text-gray-400";

  return (
    <section className={`${sectionBg} py-16`}>
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className={`text-3xl font-bold ${textColor}`}>Task of the Month</h2>
        <p className={`mt-4 text-lg ${textMuted}`}>
          Discover the task that got the most attention this month.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <div className={`${cardBg} p-8 rounded-lg shadow-lg max-w-3xl`}>
            <h3 className={`text-2xl font-semibold ${textColor}`}>
              Web Design for Startup
            </h3>
            <p className={`mt-4 ${textMuted}`}>
              This task garnered the most interest this month. The employer, a
              new startup, needed a high-quality website for their brand. The
              worker selected for this task did an amazing job, and the employer
              was thrilled with the outcome!
            </p>

            <div className="mt-6">
              <p className={`text-lg font-bold ${textColor}`}>Task Creator:</p>
              <p className={`text-sm ${textMuted}`}>
                James Barker, Startup Founder
              </p>
            </div>

            <div className="mt-4">
              <p className={`text-lg font-bold ${textColor}`}>Task Worker:</p>
              <p className={`text-sm ${textMuted}`}>
                Alice Johnson, Web Designer
              </p>
            </div>

            {/* <div className="mt-6 flex justify-center gap-6">
              <button
                className={`${
                  theme === "light"
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-lg`}
              >
                View Task
              </button>
              <button
                className={`${
                  theme === "light"
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-green-600 hover:bg-green-700"
                } text-white py-2 px-4 rounded-lg`}
              >
                Hire a Worker
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskOfTheMonthSection;
