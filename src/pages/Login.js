import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
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
        if (form.password.length === 0) return "Password is required";

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
            await loginUser({
                username: form.username.trim(),
                password: form.password,
            });

            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: "420px", margin: "40px auto", padding: "16px" }}>
            <h1>Login</h1>

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

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;
