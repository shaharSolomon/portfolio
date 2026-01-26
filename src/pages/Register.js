import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    function validate() {
        const username = form.username.trim();

        if (username.length === 0) return "Username is required";
        if (username.length < 3) return "Username must be at least 3 characters";

        if (form.password.length === 0) return "Password is required";
        if (form.password.length < 3) return "Password must be at least 3 characters";

        if (form.confirmPassword.length === 0) return "Confirm password is required";
        if (form.password !== form.confirmPassword) return "Passwords do not match";

        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            await registerUser({
                username: form.username.trim(),
                password: form.password,
            });

            navigate("/login");
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: "420px", margin: "40px auto", padding: "16px" }}>
            <h1>Register</h1>

            {error && (
                <div
                    style={{
                        marginBottom: "12px",
                        padding: "10px",
                        border: "1px solid red",
                    }}
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;
