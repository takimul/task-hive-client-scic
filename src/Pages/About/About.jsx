import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const About = () => {
  const { theme } = useContext(ThemeContext); // Access the current theme

  // Conditional class names based on the theme
  const heroBgColor = theme === "light" ? "bg-base-200" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const headingColor = theme === "light" ? "text-gray-800" : "text-white";
  const subheadingColor = theme === "light" ? "text-gray-700" : "text-gray-300";
  const listItemColor = theme === "light" ? "text-gray-600" : "text-gray-300";

  return (
    <div>
      <Helmet>
        <title>About | TaskHive</title>
      </Helmet>
      <div
        className={`${heroBgColor} max-w-7xl md:mx-auto my-6 rounded-lg px-6 xl:px-0`}
      >
        <div className="py-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-5xl font-bold text-center ${headingColor}`}>
              About Us
            </h1>

            <p className={`py-6 ${textColor}`}>
              At TaskHive, we believe that everyone should have the opportunity
              to earn money on their own terms. Whether you’re looking to
              supplement your income, gain experience, or simply enjoy the
              flexibility of working from anywhere, TaskHive is here to help you
              achieve your goals. Who We Are TaskHive is a cutting-edge
              microtasking platform designed to connect taskers with a wide
              variety of small, manageable tasks. Our mission is to empower
              individuals worldwide by providing access to work opportunities
              that are flexible, diverse, and rewarding. What We Offer We offer
              a wide range of tasks that cater to different skills and
              interests, from data entry and content moderation to simple
              surveys and app testing. Our platform is user-friendly, secure,
              and built to ensure that both taskers and task creators have a
              smooth and efficient experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className={`text-2xl font-bold mt-6 ${headingColor}`}>
              Why Choose Us?
            </h3>
            <ul className={`py-6 list-disc ml-5 ${listItemColor} text-start`}>
              <li>
                <span className="font-semibold">Flexibility</span>: Work
                whenever and wherever you want. TaskHive allows you to fit work
                around your lifestyle.
              </li>
              <li>
                <span className="font-semibold">Diverse Opportunities</span>:
                With a variety of tasks available, you can choose work that
                suits your skills and interests.
              </li>
              <li>
                <span className="font-semibold">Global Community</span> :Join a
                thriving community of taskers and benefit from the support and
                collaboration of peers around the world.
              </li>
            </ul>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3
              className={`text-2xl font-bold mt-6 ${headingColor} text-center`}
            >
              Our Commitment
            </h3>
            <p className={`py-6 ${textColor}`}>
              We are committed to providing a platform that is fair,
              transparent, and supportive. At TaskHive, your success is our
              success, and we strive to create an environment where everyone can
              thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
