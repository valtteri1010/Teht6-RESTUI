import React from "react";

import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home" />
                Etusivu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lisaa" className="nav-link">
                Lisää urheilijan tietoja
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
