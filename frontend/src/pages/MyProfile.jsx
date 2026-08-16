import { useEffect, useState } from "react";

import api from "../api";


export default function MyProfile() {

    const [employee, setEmployee] =
        useState(null);

    const [error, setError] =
        useState("");


    useEffect(() => {

        api.get("/employees/me/")

            .then((response) => {

                setEmployee(
                    response.data
                );

            })

            .catch((error) => {

                setError(
                    error.response?.data?.detail ||
                    "Could not load profile."
                );

            });

    }, []);


    return (

        <main className="container">

            <div className="card">

                <h1>
                    My Profile
                </h1>


                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                {employee && (

                    <div>

                        <p>
                            <b>Employee ID:</b>{" "}
                            {employee.employee_id}
                        </p>


                        <p>
                            <b>Name:</b>{" "}
                            {employee.first_name}{" "}
                            {employee.last_name}
                        </p>


                        <p>
                            <b>Email:</b>{" "}
                            {employee.email}
                        </p>


                        <p>
                            <b>Department:</b>{" "}
                            {employee.department}
                        </p>


                        <p>
                            <b>Phone:</b>{" "}
                            {employee.phone ||
                                "Not provided"}
                        </p>

                    </div>

                )}

            </div>

        </main>
    );
}