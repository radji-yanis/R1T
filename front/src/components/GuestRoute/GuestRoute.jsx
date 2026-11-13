import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from "../Loader/Loader.jsx";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader/>;
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}