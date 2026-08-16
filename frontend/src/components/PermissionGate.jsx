import { useAuth } from "../auth/AuthContext";


export default function PermissionGate({
    permission,
    children
}) {

    const {
        hasPermission
    } = useAuth();


    if (!hasPermission(permission)) {

        return null;
    }


    return children;
}