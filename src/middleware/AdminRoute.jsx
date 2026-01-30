import { Navigate } from "react-router-dom";

function AdminRoute ({children}) {
    const {user, token} = useUserStore();

    if(!token || user) 
        return <Navigate to="login" />;

    if(user.role !== "admin")
        return <Navigate to="#" />;

    return children;
}

export default AdminRoute;