import * as React from "react";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArtObject from "./ArtObject.js";
import MenuBar from "./MenuBar.js";

const SearchArt = ({ style, window }) => {
  const inputSearchRef = useRef();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");

  const url = `&title=${searchKey}&fields=objectnumber,title,people,period,dated,classification,culture,medium,dimensions,description,images`;

  // get input word
  const handleSearch = (e) => {
    // e.preventDefault();
    setSearchKey(`${inputSearchRef.current.value}`);
    history.push(`/search?q=${inputSearchRef.current.value}`);
    console.log(inputSearchRef.current.value);
  };

  return (
    <>
      <MenuBar style={style} window={window} />
      <Container>
        <Typography variant="h2" className={style.searchHeader}>
          Search for some art
        </Typography>
        <input
          type="text"
          ref={inputSearchRef}
          placeholder="title keyword"
        ></input>
        <Button className={style.searchButton} onClick={handleSearch}>
          Search
        </Button>
        {/* <form noValidate autoComplete="off" onSubmit={handleSearch}>
          <TextField
            className={style.search}
            variant="outlined"
            label="title"
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            placeholder="title keyword"
          />
          <Button className={style.button} type="submit">
            Search
          </Button>
        </form> */}
      </Container>
      <Container>
        {searchKey === "" ? null : <ArtObject style={style} url={url} />}
      </Container>
    </>
  );
};

export default SearchArt;
