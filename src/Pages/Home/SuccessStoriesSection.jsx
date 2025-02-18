import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const SuccessStoriesSection = () => {
  const { theme } = useContext(ThemeContext); // Access current theme

  // Conditional styling based on theme
  const sectionBg = theme === "light" ? "bg-gray-100" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const textMuted = theme === "light" ? "text-gray-600" : "text-gray-400";

  return (
    <section className={`${sectionBg} py-16`}>
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className={`text-3xl font-bold ${textColor}`}>Success Stories</h2>
        <p className={`mt-4 text-lg ${textMuted}`}>
          Real stories from our community where users have thrived using
          TaskHive.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Story 1 */}
          <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
            <h3 className={`text-xl font-semibold ${textColor}`}>
              Earning While Learning
            </h3>
            <p className={`mt-2 ${textMuted}`}>
              "As a student, I needed extra income. I found a task that matched
              my skills and was able to earn while finishing my studies.
              TaskHive made it easy to connect with the right employers!"
            </p>
            <div className="mt-4">
              <p className={`font-bold ${textColor}`}>Sarah Johnson</p>
              <p className={`text-sm ${textMuted}`}>Student & Task Worker</p>
            </div>
          </div>

          {/* Story 2 */}
          <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
            <h3 className={`text-xl font-semibold ${textColor}`}>
              Building My Startup
            </h3>
            <p className={`mt-2 ${textMuted}`}>
              "As a startup founder, I was able to find talented individuals on
              TaskHive who helped me with development and marketing tasks. This
              platform was instrumental in my business growth!"
            </p>
            <div className="mt-4">
              <p className={`font-bold ${textColor}`}>Mark Lee</p>
              <p className={`text-sm ${textMuted}`}>Founder & CEO</p>
            </div>
          </div>

          {/* Story 3 */}
          <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
            <h3 className={`text-xl font-semibold ${textColor}`}>
              Task Efficiency in Action
            </h3>
            <p className={`mt-2 ${textMuted}`}>
              "TaskHive helped me delegate tasks efficiently while focusing on
              other key areas of my business. The worker I hired delivered
              excellent results within the timeline!"
            </p>
            <div className="mt-4">
              <p className={`font-bold ${textColor}`}>Sophia Zhang</p>
              <p className={`text-sm ${textMuted}`}>Business Owner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
