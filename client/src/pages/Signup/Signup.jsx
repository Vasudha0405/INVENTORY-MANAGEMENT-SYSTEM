import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Signup.scss";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (role === "employee" && !email.endsWith("@instock.com")) {
        setError("Employee accounts must use an @instock.com email address.");
        setLoading(false);
        return;
      }
      await signup(name, email, password, role);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1 className="signup__title">Sign Up</h1>
        {error && <p className="signup__error">{error}</p>}
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__field">
            <label className="signup__label" htmlFor="name">Name</label>
            <input
              className="signup__input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="signup__field">
            <label className="signup__label" htmlFor="email">Email</label>
            <input
              className="signup__input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "employee" ? "name@instock.com" : "Enter your email"}
              required
            />
          </div>
          <div className="signup__field">
            <label className="signup__label" htmlFor="password">Password</label>
            <input
              className="signup__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="signup__field">
            <label className="signup__label">Role</label>
            <div className="signup__roles">
              <label className="signup__role">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span>User</span>
              </label>
              <label className="signup__role">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={role === "employee"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span>Employee</span>
              </label>
            </div>
          </div>
          <button className="signup__button" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="signup__link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
