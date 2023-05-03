// theme primereact and css
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "./App.css";

// Firebase
import { auth } from './firebase/firebaseConnection';
import { useAuthState } from "react-firebase-hooks/auth";

import Welcome from "./pages/Welcome";
import AppRouter from "./routes";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <AppRouter /> : <Welcome />}
    </div>
  );
}


