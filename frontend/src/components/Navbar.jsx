import { Link } from "react-router-dom";
import './style.css';
import React from "react"
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="logo">Respeak</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/learn">Learn</Link></li>
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/test">Test</Link></li>
                <li><Link to="/profile">My Profile</Link></li>
            </ul>
        </nav>
    );
}
export default Navbar;