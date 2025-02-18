import { useContext } from "react";
import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { ThemeContext } from "../../provider/ThemeProvider";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  // Conditional class names based on the theme
  const footerStyle =
    theme === "light"
      ? "bg-slate-200 text-base-content"
      : "bg-gray-800 text-white";
  const linkStyle =
    theme === "light" ? "link link-hover" : "link link-hover text-gray-300";
  const iconStyle =
    theme === "light"
      ? "text-black hover:text-gray-600"
      : "text-white hover:text-gray-400";

  return (
    <footer
      className={`footer footer-center rounded p-10 mt-10 ${footerStyle}`}
    >
      <nav className="grid grid-flow-col gap-4">
        <Link to={"/about"} className={linkStyle}>
          About us
        </Link>
        <Link to={"/contact"} className={linkStyle}>
          Contact
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a
            href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-takimul"
            className={iconStyle}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/takimul-hasan"
            className={iconStyle}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/takimul.nihal"
            className={iconStyle}
          >
            <FaFacebook />
          </a>
        </div>
      </nav>
      <aside>
        <p
          className={theme === "light" ? "text-base-content" : "text-gray-300"}
        >
          Copyright © {new Date().getFullYear()} - All rights reserved by
          TaskHive.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
