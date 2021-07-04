import * as React from "react";
import { Link } from "react-router-dom";

const SearchArt = () => {
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
    <div className="search">
      <p>Search for some art</p>
      <input type="text" placeholder="type a keyword"></input>
      <br />
      <Link to="/" style={linkStyle}>
        Back to Home
      </Link>
    </div>
  );
};

export default SearchArt;
