import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchArt = ({ style }) => {
  const inputSearchRef = useRef();
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(1);
  const [current, setCurrent] = useState(0);

  const apikey = process.env.REACT_APP_APIKEY;
  const harvardArtMuseumUrl = `https://api.harvardartmuseums.org/object?apikey=${apikey}`;

  // get input word
  const handleSearch = () => {
    setStatus("loading");
    setData([]);
    console.log(inputSearchRef.current.value);

    // fetch based on input data
    const makeAPICall = async () => {
      setStatus("loading");
      try {
        const res = await fetch(
          `${harvardArtMuseumUrl}&title=${inputSearchRef.current.value}&size=5&page=${click}`
        );
        const searchResult = await res.json();
        setStatus("resolved");
        console.log(searchResult.records);

        // filter
        const filterData = searchResult.records.filter((r) => {
          if (
            !r.hasOwnProperty("primaryimageurl") ||
            r.primaryimageurl === null
          ) {
            return false;
          }
          return true;
        });
        console.log(filterData);

        // find artist name if exists
        for (let obj of filterData) {
          if (obj.hasOwnProperty("people") && obj.people[0].length !== 0) {
            const artists = [];
            for (let p of obj.people) {
              artists.push(p.name);
            }
            setData((data) => [
              ...data,
              {
                title: obj.title,
                artist: artists.join(", "),
                culture: obj.culture,
                period: obj.period,
                date: obj.dated,
                classification: obj.classification,
                medium: obj.medium,
                dimensions: obj.dimensions,
                description: obj.description,
                image: obj.primaryimageurl,
              },
            ]);
          } else {
            setData((data) => [
              ...data,
              {
                title: obj.title,
                culture: obj.culture,
                period: obj.period,
                date: obj.dated,
                classification: obj.classification,
                medium: obj.medium,
                dimensions: obj.dimensions,
                description: obj.description,
                image: obj.primaryimageurl,
              },
            ]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    makeAPICall();
  };

  // when next, render next obj in arr
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };
  // prev, render previous
  const handlePrev = () => {
    setCurrent(
      current === 0 ? data.length - 1 : (prev) => (prev - 1) % data.length
    );
  };
  // change old set with new set
  const handleNewSet = () => {
    setCurrent(0);
    setData([]);
    setClick((prev) => prev + 1);
  };

  // display status
  const display = () => {
    if (status === "idle") {
      return null;
    } else if (status === "loading") {
      return <p>Loading</p>;
    } else if (status === "resolved") {
      console.log("resolved");
      // console.log(data);
      return (
        <>
          <div className="nav-button">
            <button onClick={handleNewSet}>New Set</button>
            <br />
            <button onClick={handlePrev}>{"<"}</button>
            <button onClick={handleNext}>{">"}</button>
          </div>
          <div className="art-info">
            <h3>{data?.[current]?.title}</h3>
            {data?.[current]?.description !== null ? (
              <p>{data?.[current]?.description}</p>
            ) : null}
            {data?.[current]?.date !== null ? (
              <p>{data?.[current]?.date}</p>
            ) : null}
            {data?.[current]?.hasOwnProperty("artist") &&
            data?.[current]?.artist !== null ? (
              <p>{data?.[current]?.artist}</p>
            ) : null}
            {data?.[current]?.classification !== null ? (
              <p>{data?.[current]?.classification}</p>
            ) : null}
            {data?.[current]?.culture !== null ? (
              <p>{data?.[current]?.culture}</p>
            ) : null}
            {data?.[current]?.date !== null ? (
              <p>{data?.[current]?.period}</p>
            ) : null}
            {data?.[current]?.medium !== null ? (
              <p>{data?.[current]?.medium}</p>
            ) : null}
            {data?.[current]?.dimensions !== null ? (
              <p>{data?.[current]?.dimensions}</p>
            ) : (
              data?.[current]?.dimensions
            )}
          </div>

          <div className="art-image">
            <p>
              {current + 1} / {data.length}
            </p>
            <img src={data?.[current]?.image} alt="img" />
          </div>
        </>
      );
    }
  };

  return (
    <div className="search">
      <h2>Search for some art</h2>
      <input
        type="text"
        ref={inputSearchRef}
        placeholder="title keyword"
      ></input>
      <button onClick={handleSearch}>Search</button>
      <div>{display()}</div>
      <br />
      <Link to="/" style={style}>
        Back to Home
      </Link>
    </div>
  );
};

export default SearchArt;
