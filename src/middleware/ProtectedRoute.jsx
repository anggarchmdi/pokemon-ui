import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function ProtectedRoute({ children }) {
    const token = useUserStore((s) => s.token);
    return token ? children : <Navigate to="/login" replace />
}