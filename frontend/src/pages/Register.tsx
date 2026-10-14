
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import "./Auth.css";

type DemoUser = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const users: DemoUser[] = JSON.parse(
        localStorage.getItem("careerly-demo-users") || "[]"
      );

      const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existingUser) {
        setError("This email is already registered. Please sign in.");
        return;
      }

      const newUser: DemoUser = {
        name: name.trim(),
        email: email.trim(),
        password,
      };

      localStorage.setItem(
        "careerly-demo-users",
        JSON.stringify([...users, newUser])
      );

      localStorage.setItem(
        "careerly-demo-current-user",
        JSON.stringify({
          name: newUser.name,
          email: newUser.email,
        })
      );

      navigate("/dashboard");
    } catch {
      setError("Unable to create your account. Please try again.");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-card">
          <div className="auth-icon">
            <UserRound size={30} />
          </div>

          <p className="auth-eyebrow">START YOUR JOURNEY</p>

          <h1>Create your account</h1>

          <p className="auth-subtitle">
            Join Careerly and discover your next opportunity.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="register-name">Full name</label>
              <div className="auth-input-wrap">
                <UserRound size={20} />
                <input
                  id="register-name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={20} />
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <div className="auth-input-wrap">
                <Lock size={20} />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-confirm-password">
                Confirm password
              </label>
              <div className="auth-input-wrap">
                <Lock size={20} />
                <input
                  id="register-confirm-password"
                  type="password"
                  placeholder="Enter password again"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="auth-submit">
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <Link to="/" className="auth-home-link">
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Register;