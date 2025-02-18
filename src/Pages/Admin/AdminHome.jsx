import { Helmet } from "react-helmet";
import AdminStat from "./component/AdminStat";
import WithdrawReq from "./component/WithdrawReq";


const AdminHome = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | TaskHive</title>
            </Helmet>
            <AdminStat></AdminStat>

            <WithdrawReq></WithdrawReq>
        </div>
    );
};

export default AdminHome;