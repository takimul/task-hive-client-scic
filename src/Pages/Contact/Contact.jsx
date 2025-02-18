import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  // Conditional styles based on the current theme
  const sectionBg = theme === "light" ? "bg-base-200" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-900" : "text-gray-200";
  const headingColor = theme === "light" ? "text-gray-900" : "text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  return (
    <div>
      <div
        className={`hero  max-w-7xl mx-auto my-6 rounded-lg px-6 xl:px-0 ${sectionBg}`}
      >
        <div className="py-10">
          <div className="max-w-4xl">
            <h1 className={`text-5xl font-bold text-center ${headingColor}`}>
              Contact Us
            </h1>
            <p className={`py-6 text-center font-semibold ${textColor}`}>
              We would love to hear from you! Whether you have questions,
              feedback, or want to learn more about how you can get involved,
              feel free to reach out to us through any of the following
              channels:
            </p>
          </div>

          <div className="max-w-4xl">
            <h3
              className={`text-2xl font-bold mt-6 ${headingColor} text-center`}
            >
              General Inquiries
            </h3>
            <p className={`py-6 text-center ${textColor}`}>
              For general questions or information, please email us at: Email:
              info@TaskHive.org
            </p>
          </div>

          <div className="max-w-4xl">
            <h3
              className={`text-2xl font-bold mt-6 text-center ${headingColor}`}
            >
              Phone
            </h3>
            <p className={`py-6 text-center ${textColor}`}>
              You can also reach us by phone during our office hours, Monday to
              Friday, 9 AM to 5 PM: Phone: (123) 456-7890
            </p>
          </div>
          <div className="max-w-4xl">
            <h3
              className={`text-2xl font-bold mt-6 text-center ${headingColor}`}
            >
              Visit Us
            </h3>
            <p className={`py-6 text-center ${textColor}`}>
              We welcome visitors to our office by appointment. Please call or
              email us to schedule a visit: Address: TaskHive. 123 Community
              Lane Hometown, State, ZIP Code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
