import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import { ProfileImageProvider } from "./Context/ProfileImageContext";
import AppRouter from "./Routes";

export default function MyApp() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
