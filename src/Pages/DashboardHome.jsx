import useRole from "../hooks/useRole";
import AdminHome from "./Admin/AdminHome";
import BuyerHome from "./Buyer/Home/BuyerHome";
import WorkerHome from "./Worker/WorkerHome";

const DashboardHome = () => {
  const [role] = useRole();

  return (
    <div className="p-2">
      {role === "Worker" && <WorkerHome></WorkerHome>}
      {role === "Buyer" && <BuyerHome></BuyerHome>}
      {role === "admin" && <AdminHome></AdminHome>}
    </div>
  );
};

export default DashboardHome;
