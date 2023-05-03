import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRooms from "./pages/ChatRooms";
import Room from "./pages/Room";

// Components
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={< ChatRooms />} />
                <Route path="/room/:id" element={<Room />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}