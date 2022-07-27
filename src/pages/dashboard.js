import IndicatorCard from "../card/indicatorCard";
import Navbar from "../navigation/navbar";
import StatusDevices from "../table/statusDevices";
import StatusMonitoring from "../table/statusMonitoring";

const Dashboard = () => {
  // const [token, setToken] = useState("");

    return (
        <div>
            <IndicatorCard/>
            <StatusMonitoring/>
            <StatusDevices/>
        </div>
    )
};

export default Dashboard;