import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = ({ children }) => {
  const userInfo = localStorage.getItem('user_profile');
  const userRole = JSON.parse(userInfo).roles;
  if (!userRole.includes['ADMIN']) {
    return (<>{children}</>)
  } else {
    return (<NotPermitted />)
  }
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.authentication);
  const location = useLocation();

  return (
    <>
      {isLoading === true ?
        <Spin spinning={true} />
        :
        <>
          {isAuthenticated === true ?
            <>
              <RoleBaseRoute>
                {children}
              </RoleBaseRoute>
            </>
            :
            <Navigate to='/auth/login' replace state={{ from: location }} />
          }
        </>
      }
    </>
  )
}

export default ProtectedRoute;