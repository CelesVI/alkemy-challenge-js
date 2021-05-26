import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  //Navbar: parte de arriba donde está crear operación.
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Alkemy</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Crear Operación</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}