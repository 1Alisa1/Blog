import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

type RequareAuthProps = {
  children: React.ReactElement;
}

const RequareAuth = ({children}: RequareAuthProps) => {
  const location = useLocation();
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/login' state={{from: location}} />;
  }

  return children;
  
}

export default RequareAuth;