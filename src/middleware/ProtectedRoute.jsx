import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function ProtectedRoute({ children }) {
  const { user, hasHydrated } = useAuthStore()

  if (!hasHydrated) return null 

  return user ? children : <Navigate to="/login" replace />
}
