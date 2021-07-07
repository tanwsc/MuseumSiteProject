import * as React from "react";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import ArtObject from "./ArtObject.js";

const SearchArt = ({ style }) => {
  const inputSearchRef = useRef();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");

  const url = `&title=${searchKey}&fields=objectnumber,title,people,period,dated,classification,culture,medium,dimensions,description,images`;

  // get input word
  const handleSearch = () => {
    setSearchKey(`${inputSearchRef.current.value}`);
    history.push(`/search?q=${inputSearchRef.current.value}`);
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
        <Button className={style.button} onClick={handleSearch}>
          Search
        </Button>
      </div>
      {searchKey === "" ? null : <ArtObject style={style} url={url} />}
      <br />
      <div className="nav">
        <Button
          className={style.button}
          component={Link}
          to="/art"
          style={style}
        >
          Choose Set
        </Button>
        <Button className={style.button} component={Link} to="/" style={style}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default SearchArt;
