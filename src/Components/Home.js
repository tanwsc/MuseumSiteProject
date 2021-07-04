import * as React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const linkStyle = {
    margin: "10px 10px",
    padding: "10px",
    borderRadius: "5px",
    background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  };

  return (
    <div className="home">
      <h1>Collections from Harvard Art Museum</h1>
      <p>homepage</p>
      <NavLink to="/art" style={linkStyle}>
        Generate Set
      </NavLink>
      <NavLink to="/search" style={linkStyle}>
        Search for Art
      </NavLink>
    </div>
  );
};

export default Home;
