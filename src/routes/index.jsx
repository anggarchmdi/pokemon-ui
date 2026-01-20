import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute";
import AdminRoute from "../middleware/AdminRoute";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import AdminDashboard from "../views/admin/AdminDashboard ";
import UserDashboard from "../views/user/UserDashboard ";
import NotFound from "../views/notfound/NotFound ";


export default function AppRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
                <Route path="*" element={<NotFound />} />
                {/* admin */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <MainLayout>
                            <AdminDashboard />
                        </MainLayout>
                    </AdminRoute>} />
                {/* user */}
                <Route path="/user" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <UserDashboard />
                        </MainLayout>
                    </ProtectedRoute>}  />
            </Routes>
        </BrowserRouter>
    )
}