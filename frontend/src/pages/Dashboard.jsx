import { useAuth } from "../auth/AuthContext";


export default function Dashboard() {

    const { user } = useAuth();


    return (

        <main className="container">

            <div className="card">

                <h1>
                    Dashboard
                </h1>


                <p>
                    Welcome,{" "}
                    {user?.first_name ||
                        user?.email}
                </p>


                <h2>
                    Your Permissions
                </h2>


                {user?.permissions?.length ? (

                    <div className="permission-list">

                        {user.permissions.map(
                            (permission) => (

                                <span
                                    className="badge"
                                    key={permission}
                                >
                                    {permission}
                                </span>

                            )
                        )}

                    </div>

                ) : (

                    <p>
                        No permissions assigned.
                    </p>

                )}

            </div>

        </main>
    );
}