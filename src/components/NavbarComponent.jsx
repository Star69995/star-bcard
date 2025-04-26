import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../providers/ThemeContext';
import Login from './Login';
import { useUser } from '../providers/UserContext';



const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme } = useTheme();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();  // מתבצע קריאה לפונקציה ההתנתקות
    };

    // נגדיר סגנונות מותאמים לפי מצב התצוגה
    const navbarStyle = theme === "dark"
        ? { backgroundColor: "#222f3e" }
        : { backgroundColor: "#e3f2fd" };

    const navbarClass = theme === "dark"
        ? "navbar navbar-expand-md navbar-dark fixed-top w-100"
        : "navbar navbar-expand-md navbar-light fixed-top w-100";

    const brandClass = theme === "dark"
        ? "navbar-brand fw-bold text-info"
        : "navbar-brand fw-bold text-primary";

    // console.log("User:", user);

    return (
        <nav className={navbarClass} style={navbarStyle}>
            <div className="container-fluid">
                {/* Brand */}
                <Link onClick={() => setIsMenuOpen(false)}
                    className={brandClass} to="/">Star-bCard</Link>

                {/* Wrapper for ThemeToggleButton, ensuring it sticks to the right */}
                <div className="ms-auto d-flex align-items-center">

                    <ThemeToggleButton />

                    {user ? <li className="nav-item d-flex align-items-center mx-2">
                        <img
                            src={user.url || '/avatar2.png'}
                            alt="Profile"
                            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                        />
                    </li> : null}

                    {/* Toggle button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen ? "true" : "false"}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    {/* Collapsible content */}
                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link onClick={() => setIsMenuOpen(false)}
                                            className="nav-link mx-2 fw-medium" to="/favorites">FAV CARD</Link>
                                    </li>
                                    {user.isBusiness && (
                                        <li className="nav-item">
                                            <Link onClick={() => setIsMenuOpen(false)}
                                                className="nav-link mx-2 fw-medium" to="/my-cards">MY CARDS</Link>
                                        </li>
                                    )}
                                    {/* if is admin show sandbox */}
                                    {user.isAdmin && (
                                        <li className="nav-item">
                                            <Link onClick={() => setIsMenuOpen(false)}
                                                className="nav-link mx-2 fw-medium" to="/sandbox">SANDBOX</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-outline-danger mx-2">Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link onClick={() => setIsMenuOpen(false)}
                                            className="nav-link mx-2 fw-medium" to="/login">LOGIN</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => setIsMenuOpen(false)}
                                            className="nav-link mx-2 fw-medium" to="/register">REGISTER</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;