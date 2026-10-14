import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Menu,
  X,
  LogOut,
  UserRound,
  Heart,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

type DemoUser = {
  name: string;
  email: string;
};

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = localStorage.getItem(
          "careerly-demo-current-user"
        );
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("careerly-demo-current-user");
    setUser(null);
    setMobileOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMobileOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-link${isActive ? " active" : ""}`;

  return (
    <header className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <BriefcaseBusiness size={21} />
          </span>
          <span>Careerly</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-links${mobileOpen ? " mobile-open" : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/jobs" className={linkClass} onClick={closeMenu}>
            Jobs
          </NavLink>

          <NavLink
            to="/saved-jobs"
            className={linkClass}
            onClick={closeMenu}
          >
            <Heart size={16} />
            Saved Jobs
          </NavLink>

          <NavLink
            to="/companies"
            className={linkClass}
            onClick={closeMenu}
          >
            Companies
          </NavLink>

          <NavLink to="/about" className={linkClass} onClick={closeMenu}>
            About
          </NavLink>

          <div className="nav-buttons">
            {user ? (
              <>
                <span className="navbar-user">
                  <UserRound size={17} />
                  {user.name}
                </span>

                <button className="login-btn" onClick={logout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="login-btn"
                  onClick={closeMenu}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="signup-btn"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
