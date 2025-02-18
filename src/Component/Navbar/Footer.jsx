import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer footer-center bg-slate-200 text-base-content rounded p-10 mt-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to={"/about"} className="link link-hover">
          About us
        </Link>
        <Link to={"/contact"} className="link link-hover">
          Contact
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-takimul">
            
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/takimul-hasan">
          <FaLinkedin />
          </a>
          <a href="https://www.facebook.com/takimul.nihal">
          <FaFacebook />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          TaskHive.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
