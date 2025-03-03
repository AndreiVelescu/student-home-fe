import './App.css';
import { AuthProvider } from './Context/AuthContext';
import AppRouter from './Routes';






export default function MyApp() {
  return (
      <AuthProvider>
             <AppRouter/>
      </AuthProvider>
  );
};
