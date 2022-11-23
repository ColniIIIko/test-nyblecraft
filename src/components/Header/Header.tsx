import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header>
      <Link to='/notes'>
        <h1>Notes App</h1>
      </Link>
    </header>
  );
}

export default Header;
