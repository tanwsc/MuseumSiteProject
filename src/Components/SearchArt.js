import * as React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import ArtObject from "./ArtObject.js";

const SearchArt = ({ style }) => {
  const inputSearchRef = useRef();
  const [searchKey, setSearchKey] = useState("");

  const url = `&title=${searchKey}&fields=objectnumber,title,people,period,dated,classification,culture,medium,dimensions,description,images`;

  // get input word
  const handleSearch = () => {
    setSearchKey(`${inputSearchRef.current.value}`);
    console.log(inputSearchRef.current.value);
  };

  return (
    <div className="search-main">
      <div className="search-box">
        <h2>Search for some art</h2>
        <input
          type="text"
          ref={inputSearchRef}
          placeholder="title keyword"
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchKey === "" ? null : <ArtObject url={url} />}
      <br />
      <div className="nav">
        <Link to="/art" style={style}>
          Choose Set
        </Link>
        <Link to="/" style={style}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SearchArt;
