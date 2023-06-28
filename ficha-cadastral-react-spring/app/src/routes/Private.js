import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private({ children }) {
    const { signed } = useContext(AuthContext);

    console.log("SIGNED:" + signed);

    if (!signed) {
        return <Navigate to='/' />
    }

    return children;
}