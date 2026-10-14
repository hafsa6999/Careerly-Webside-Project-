
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  UserRound,
  Eye,
  EyeOff,
} from "lucide-react";
import "./Auth.css";

type DemoUser = {
  name: string;
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const users: DemoUser[] = JSON.parse(
        localStorage.getItem("careerly-demo-users") || "[]"
      );

      const matchedUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (!matchedUser) {
        setError("Incorrect email or password. Please try again.");
        return;
      }

      localStorage.setItem(
        "careerly-demo-current-user",
        JSON.stringify({
          name: matchedUser.name,
          email: matchedUser.email,
        })
      );

      navigate("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-card">
          <div className="auth-icon">
            <UserRound size={30} />
          </div>

          <p className="auth-eyebrow">WELCOME BACK</p>

          <h1>Sign in to Careerly</h1>

          <p className="auth-subtitle">
            Sign in to continue your Careerly journey.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>

              <div className="auth-input-wrap">
                <Mail size={20} />

                <input
                  id="login-email"
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
              <label htmlFor="login-password">Password</label>

              <div className="auth-input-wrap">
                <Lock size={20} />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="auth-submit">
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>

          <Link to="/" className="auth-home-link">
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Login;