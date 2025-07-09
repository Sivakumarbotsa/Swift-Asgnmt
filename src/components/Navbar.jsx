import React from 'react';
import './Navbar.css';

const Navbar = ({ userName = 'Swift' }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">Swift</div>
      <div className="navbar-right">
        <div className="user-icon">{userName[0]}</div>
        <span className="user-name">{userName}</span>
      </div>
    </nav>
  );
};

export default Navbar;
