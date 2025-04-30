import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../providers/ThemeContext';
import { useUser } from '../providers/UserContext';
import {
	FaHome,
	FaInfoCircle,
	FaHeart,
	FaBriefcase,
	FaLock
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterComponent = () => {
	const { theme } = useTheme();
	const { user } = useUser();

	const navbarStyle = theme === "dark"
		? { backgroundColor: "#222f3e", borderTop: '1px solid #444' }
		: { backgroundColor: "#e3f2fd", borderTop: '1px solid #ccc' };

	const navbarClass = theme === "dark"
		? "navbar navbar-dark w-100 justify-content-center"
		: "navbar navbar-light w-100 justify-content-center";


	return (
		<footer className={navbarClass} style={navbarStyle}>
			<ul className="nav justify-content-center w-100 text-center">
				<li className="nav-item mx-3">
					<Link className="nav-link" to="/">
						<FaHome size={18} /><br />Home
					</Link>
				</li>
				<li className="nav-item mx-3">
					<Link className="nav-link" to="/about">
						<FaInfoCircle size={18} /><br />About
					</Link>
				</li>

				{user && (
					<>
						<li className="nav-item mx-3">
							<Link className="nav-link" to="/favorites">
								<FaHeart size={18} /><br />Favorites
							</Link>
						</li>
						{user.isBusiness && (
							<li className="nav-item mx-3">
								<Link className="nav-link" to="/my-cards">
									<FaBriefcase size={18} /><br />My Cards
								</Link>
							</li>
						)}
						{user.isAdmin && (
							<li className="nav-item mx-3">
								<Link className="nav-link" to="/sandbox">
									<FaLock size={18} /><br />Sandbox
								</Link>
							</li>
						)}
					</>
				)}
			</ul>
		</footer>
	);
};

export default FooterComponent;
