import * as React from "react";
import { Link } from "react-router-dom";

const Home = ({style}) => {
  return (
    <div className="home">
      <h1>Collections from Harvard Art Museum</h1>
      <p>homepage</p>
      <Link to="/art" style={style}>
        Choose Set
      </Link>
      <Link to="/search" style={style}>
        Search for Art
      </Link>
    </div>
  );
};

export default Home;
