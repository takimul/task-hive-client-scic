import { Helmet } from "react-helmet";
import WorkerStat from "./component/WorkerStat";
import WorkerTable from "./component/WorkerTable";



const WorkerHome = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | TaskHive</title>
            </Helmet>
            <WorkerStat></WorkerStat>
            <WorkerTable></WorkerTable>
        </div>
    );
};

export default WorkerHome;