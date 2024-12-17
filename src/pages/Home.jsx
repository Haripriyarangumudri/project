import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div id="home">
        <Link to="/findseat">
          <button id="search-btn">Find Seat</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
