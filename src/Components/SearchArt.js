import * as React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const SearchArt = () => {
  const inputSearchRef = useRef();

  const linkStyle = {
    margin: "10px 10px",
    padding: "10px",
    borderRadius: "5px",
    background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  };

  // get input word
  const handleSearch = () => {
    console.log(inputSearchRef.current.value);

    // const makeAPICall = async () => {
    //   setStatus("loading");
    //   try {
    //     const res = await fetch(`${harvardArtMuseumUrl}title=${searchKey}`);
    //     const searchResult = await res.json();
    //     setStatus("resolved");
    //     console.log(searchResult.records);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  };

  return (
    <div className="search">
      <p>Search for some art</p>
      <input
        type="text"
        ref={inputSearchRef}
        placeholder="title keyword"
      ></input>
      <button onClick={handleSearch}>Search</button>
      <br />
      <Link to="/" style={linkStyle}>
        Back to Home
      </Link>
    </div>
  );
};

export default SearchArt;
