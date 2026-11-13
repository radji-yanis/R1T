import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from "../Loader/Loader.jsx";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader/>;
  if (user) {
    const destination = location.state?.from?.pathname || "/";
    return <Navigate to={destination} replace state={{ connected: true }} />;
  }
  return children;
}