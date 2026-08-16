import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";


export default function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const [error, setError] = useState("");


    const submit = async (event) => {

        event.preventDefault();

        setError("");


        try {

            await login(
                form.email,
                form.password
            );

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "Login failed"
            );
        }
    };


    return (

        <div className="login-page">

            <form
                className="card login-card"
                onSubmit={submit}
            >

                <h1>
                    Login
                </h1>


                <p>
                    Fine-Grained User Permissions
                </p>


                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                <label>
                    Email
                </label>


                <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            email: event.target.value
                        })
                    }
                    required
                />


                <label>
                    Password
                </label>


                <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            password: event.target.value
                        })
                    }
                    required
                />


                <button
                    className="primary"
                    type="submit"
                >
                    Login
                </button>

            </form>

        </div>
    );
}