import { useEffect, useState } from "react";

import api from "../api";

import { useAuth } from "../auth/AuthContext";

import PermissionGate from "../components/PermissionGate";


const emptyForm = {

    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    department: "",
    phone: ""
};


export default function Employees() {

    const { hasPermission } =
        useAuth();


    const [employees, setEmployees] =
        useState([]);

    const [form, setForm] =
        useState(emptyForm);

    const [editingId, setEditingId] =
        useState(null);

    const [message, setMessage] =
        useState("");


    const loadEmployees = async () => {

        const response =
            await api.get("/employees/");

        setEmployees(
            response.data.results ||
            response.data
        );
    };


    useEffect(() => {

        loadEmployees();

    }, []);


    const change = (event) => {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value

        });
    };


    const save = async (event) => {

        event.preventDefault();


        try {

            if (editingId) {

                await api.patch(
                    `/employees/${editingId}/`,
                    form
                );

                setMessage(
                    "Employee updated."
                );

            } else {

                await api.post(
                    "/employees/",
                    form
                );

                setMessage(
                    "Employee created."
                );
            }


            setForm(emptyForm);

            setEditingId(null);

            loadEmployees();

        } catch (error) {

            setMessage(
                error.response?.data?.detail ||
                "Operation failed."
            );
        }
    };


    const edit = (employee) => {

        setEditingId(employee.id);


        setForm({

            employee_id:
                employee.employee_id,

            first_name:
                employee.first_name,

            last_name:
                employee.last_name,

            email:
                employee.email,

            department:
                employee.department,

            phone:
                employee.phone || ""

        });
    };


    const remove = async (id) => {

        if (
            !window.confirm(
                "Delete this employee?"
            )
        ) {

            return;
        }


        try {

            await api.delete(
                `/employees/${id}/`
            );

            setMessage(
                "Employee deleted."
            );

            loadEmployees();

        } catch (error) {

            setMessage(
                error.response?.data?.detail ||
                "Delete failed."
            );
        }
    };


    return (

        <main className="container">

            <h1>
                Employees
            </h1>


            {message && (

                <div className="success">
                    {message}
                </div>

            )}


            <PermissionGate
                permission="CREATE_EMPLOYEE"
            >

                <form
                    className="card"
                    onSubmit={save}
                >

                    <h2>
                        {editingId
                            ? "Edit Employee"
                            : "Add Employee"}
                    </h2>


                    {Object.keys(form).map(
                        (key) => (

                            <input
                                key={key}
                                name={key}
                                placeholder={key
                                    .replaceAll(
                                        "_",
                                        " "
                                    )
                                    .toUpperCase()}
                                value={form[key]}
                                onChange={change}
                                required={
                                    key !== "phone"
                                }
                            />

                        )
                    )}


                    <button
                        className="primary"
                        type="submit"
                    >
                        {editingId
                            ? "Update"
                            : "Create"}
                    </button>


                    {editingId && (

                        <button
                            type="button"
                            onClick={() => {

                                setEditingId(
                                    null
                                );

                                setForm(
                                    emptyForm
                                );

                            }}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </PermissionGate>


            <div className="card">

                <table>

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Department
                            </th>

                            {(hasPermission(
                                "EDIT_EMPLOYEE"
                            ) ||
                                hasPermission(
                                    "DELETE_EMPLOYEE"
                                )) && (

                                <th>
                                    Actions
                                </th>

                            )}

                        </tr>

                    </thead>


                    <tbody>

                        {employees.map(
                            (employee) => (

                                <tr
                                    key={
                                        employee.id
                                    }
                                >

                                    <td>
                                        {
                                            employee.employee_id
                                        }
                                    </td>

                                    <td>
                                        {
                                            employee.first_name
                                        }{" "}
                                        {
                                            employee.last_name
                                        }
                                    </td>

                                    <td>
                                        {
                                            employee.email
                                        }
                                    </td>

                                    <td>
                                        {
                                            employee.department
                                        }
                                    </td>


                                    {(hasPermission(
                                        "EDIT_EMPLOYEE"
                                    ) ||
                                        hasPermission(
                                            "DELETE_EMPLOYEE"
                                        )) && (

                                        <td>

                                            <PermissionGate
                                                permission="EDIT_EMPLOYEE"
                                            >

                                                <button
                                                    onClick={() =>
                                                        edit(
                                                            employee
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                            </PermissionGate>


                                            <PermissionGate
                                                permission="DELETE_EMPLOYEE"
                                            >

                                                <button
                                                    className="danger"
                                                    onClick={() =>
                                                        remove(
                                                            employee.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </PermissionGate>

                                        </td>

                                    )}

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </main>
    );
}