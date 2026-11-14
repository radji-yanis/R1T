import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from "../Loader/Loader.jsx";
import Navbar from "../Navbar/Navbar.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader/>;
  if (!user) {
    return <Navigate to="/connexion" replace state={{ from: location.pathname }} />;
  }
  return <div style={{ paddingBottom: "var(--navbar-height)" }}>
    {children}
    <Navbar />
  </div>;
}