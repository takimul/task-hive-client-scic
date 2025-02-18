import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Navbar/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen pt-24"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;