/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loading from "../Component/Loading";
import useRole from "../hooks/useRole";

const  BuyerRoute= ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) {
        return <Loading></Loading>
    }

    if (role === 'Buyer') {
        return children
    } else {
        <Navigate to={'/dashboard'}></Navigate>
    }
};

export default BuyerRoute;