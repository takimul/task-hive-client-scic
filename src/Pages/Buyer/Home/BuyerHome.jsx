import { Helmet } from "react-helmet";
import BuyerState from "./BuyerState";

import AllTask from "./component/AllTask";


const BuyerHome = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | TaskHive</title>
            </Helmet>
            {/* here is state component */}
            <BuyerState></BuyerState>

            {/* here is table component */}
            <AllTask></AllTask>


        </div>
    );
};

export default BuyerHome;