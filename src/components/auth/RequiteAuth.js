import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const RequireAuth = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth)
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;