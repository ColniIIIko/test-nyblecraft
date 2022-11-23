import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <div className='not-found'>
      <p>Page not found 😞</p>
      <Link
        to='/notes'
        className='not-found__go-home'
      >
        go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
