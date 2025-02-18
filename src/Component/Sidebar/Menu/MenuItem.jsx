import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";

const MenuItem = ({ label, address, icon: Icon }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  // Conditional class names based on the current theme
  const activeBgColor = theme === "light" ? "bg-gray-300" : "bg-gray-700";
  const hoverBgColor =
    theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-600";
  const textColor = theme === "light" ? "text-gray-600" : "text-white";
  const activeTextColor = theme === "light" ? "text-gray-700" : "text-gray-100";
  const borderColor = theme === "light" ? "border-black" : "border-gray-400";

  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform ${hoverBgColor} ${textColor} ${
          isActive
            ? `${activeBgColor} border-l-2 ${borderColor} ${activeTextColor}`
            : ""
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
