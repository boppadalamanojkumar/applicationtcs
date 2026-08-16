import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../api";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    const loadUser = async () => {

        const token =
            localStorage.getItem("access");


        if (!token) {

            setLoading(false);

            return;
        }


        try {

            const response =
                await api.get("/auth/me/");

            setUser(response.data);

        } catch (error) {

            localStorage.removeItem("access");

            localStorage.removeItem("refresh");

            setUser(null);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadUser();

    }, []);


    const login = async (
        email,
        password
    ) => {

        const response =
            await api.post(
                "/auth/login/",
                {
                    email,
                    password
                }
            );


        localStorage.setItem(
            "access",
            response.data.access
        );


        localStorage.setItem(
            "refresh",
            response.data.refresh
        );


        setUser(response.data.user);
    };


    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        setUser(null);
    };


    const hasPermission = (
        permission
    ) => {

        return (
            user?.permissions?.includes(
                permission
            ) ?? false
        );
    };


    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                hasPermission
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(
        AuthContext
    );
}