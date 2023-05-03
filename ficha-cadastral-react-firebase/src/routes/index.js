import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Private from "./Private";

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
        </Routes>
    );
}