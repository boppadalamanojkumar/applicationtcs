import { useEffect, useState } from "react";

import api from "../api";


export default function Permissions() {

    const [users, setUsers] =
        useState([]);

    const [functions, setFunctions] =
        useState([]);

    const [message, setMessage] =
        useState("");


    const load = async () => {

        const [
            userResponse,
            functionResponse
        ] = await Promise.all([

            api.get("/users/"),

            api.get("/functions/")

        ]);


        setUsers(
            userResponse.data
        );


        setFunctions(
            functionResponse.data
        );
    };


    useEffect(() => {

        load();

    }, []);


    const changePermission = async (
        userId,
        functionId,
        checked
    ) => {

        try {

            if (checked) {

                await api.post(
                    `/users/${userId}/permissions/`,
                    {
                        function_id:
                            functionId
                    }
                );

                setMessage(
                    "Permission assigned."
                );

            } else {

                await api.delete(
                    `/users/${userId}/permissions/${functionId}/`
                );

                setMessage(
                    "Permission removed."
                );
            }


            load();

        } catch (error) {

            setMessage(
                error.response?.data?.detail ||
                "Permission operation failed."
            );
        }
    };


    return (

        <main className="container">

            <div className="card">

                <h1>
                    Permission Management
                </h1>


                {message && (

                    <div className="success">
                        {message}
                    </div>

                )}


                {users.map((user) => (

                    <div
                        className="user-permissions"
                        key={user.id}
                    >

                        <h3>

                            {user.first_name}{" "}
                            {user.last_name}

                            {" — "}

                            {user.email}

                        </h3>


                        <div>

                            {functions.map(
                                (fn) => (

                                    <label
                                        key={fn.id}
                                        style={{
                                            display:
                                                "block",
                                            margin:
                                                "10px 0"
                                        }}
                                    >

                                        <input
                                            type="checkbox"
                                            checked={
                                                user.permissions.includes(
                                                    fn.code
                                                )
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                changePermission(
                                                    user.id,
                                                    fn.id,
                                                    event
                                                        .target
                                                        .checked
                                                )
                                            }
                                        />

                                        {" "}

                                        {fn.code}

                                    </label>

                                )
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </main>
    );
}