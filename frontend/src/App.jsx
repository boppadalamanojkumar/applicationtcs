import { Navigate, Route, Routes, Link } from "react-router-dom";

import { AuthProvider, useAuth } from "./auth/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import PermissionGate from "./components/PermissionGate";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import MyProfile from "./pages/MyProfile";
import Permissions from "./pages/Permissions";


function Navigation() {

    const {
        user,
        logout,
        hasPermission
    } = useAuth();


    if (!user) {
        return null;
    }


    return (

        <nav className="navbar">

            <div className="brand">
                Permission System
            </div>


            <div className="navlinks">

                <Link to="/">
                    Dashboard
                </Link>


                {hasPermission("VIEW_EMPLOYEE") && (

                    <Link to="/employees">
                        Employees
                    </Link>

                )}


                {hasPermission("VIEW_SELF") && (

                    <Link to="/profile">
                        My Profile
                    </Link>

                )}


                {hasPermission("ASSIGN_PERMISSION") && (

                    <Link to="/permissions">
                        Permissions
                    </Link>

                )}


                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}


function AppRoutes() {

    return (

        <>

            <Navigation />


            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/"
                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }
                />


                <Route
                    path="/employees"
                    element={

                        <ProtectedRoute>

                            <PermissionGate
                                permission="VIEW_EMPLOYEE"
                            >

                                <Employees />

                            </PermissionGate>

                        </ProtectedRoute>

                    }
                />


                <Route
                    path="/profile"
                    element={

                        <ProtectedRoute>

                            <PermissionGate
                                permission="VIEW_SELF"
                            >

                                <MyProfile />

                            </PermissionGate>

                        </ProtectedRoute>

                    }
                />


                <Route
                    path="/permissions"
                    element={

                        <ProtectedRoute>

                            <PermissionGate
                                permission="ASSIGN_PERMISSION"
                            >

                                <Permissions />

                            </PermissionGate>

                        </ProtectedRoute>

                    }
                />


                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </>
    );
}


export default function App() {

    return (

        <AuthProvider>

            <AppRoutes />

        </AuthProvider>

    );
}