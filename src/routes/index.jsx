import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute";
import AdminRoute from "../middleware/AdminRoute";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import AdminDashboard from "../views/admin/AdminDashboard ";
import NotFound from "../views/notfound/NotFound";
import Home from "../views/pages/home/Home";
import Cart from "../views/pages/cart/Cart";
import Pokemon from "../views/pages/pokemon/Pokemon";
import PokemonDetail from "../views/pages/pokemon/PokemonDetail";
import About from "../views/pages/about/About";
import Profile from "../views/profile/Profile";
import Collection from "../views/collection/Collection";


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
                <Route path="/" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    </ProtectedRoute>}  />
                <Route path="/pokemon" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Pokemon />
                        </MainLayout>
                    </ProtectedRoute>}  />
                <Route path="/about" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <About />
                        </MainLayout>
                    </ProtectedRoute>}  />
                <Route path="/collection" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Collection />
                        </MainLayout>
                    </ProtectedRoute>}  />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    </ProtectedRoute>}  />
                <Route path="/pokemon/:name" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <PokemonDetail />
                        </MainLayout>
                    </ProtectedRoute>}  />
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Cart />
                        </MainLayout>
                    </ProtectedRoute>}  />
            </Routes>
        </BrowserRouter>
    )
}