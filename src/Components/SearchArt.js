import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchArt = ({ style }) => {
  const inputSearchRef = useRef();
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchId, setSearchId] = useState("");
  const [click, setClick] = useState(1);
  const [current, setCurrent] = useState(0);

  const apikey = process.env.REACT_APP_APIKEY;
  const harvardArtMuseumUrl = `https://api.harvardartmuseums.org/object?apikey=${apikey}`;

  // `${harvardArtMuseumUrl}&classification=${inputSearchRef.current.value}&size=5&page=${click}`

  // get input word
  const handleSearch = () => {
    setStatus("loading");
    setData([]);
    setSearchKey(`${inputSearchRef.current.value}`);
    console.log(inputSearchRef.current.value);
    // fetch based on input data
    const makeAPICall = async () => {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://api.harvardartmuseums.org/object?apikey=${apikey}&size=59`
        );
        const searchResult = await res.json();

        // const regex = new RegExp(searchKey, "i");
        // // console.log(searchKey);
        // const checkSearch = searchResult.records.filter((c) => {
        //   if (regex.test(c.name)) {
        //     return true;
        //   }
        //   return false;
        // });
        // console.log(checkSearch[0].id);
        // setSearchId(`${checkSearch[0].id}`);

        const resp = await fetch(
          `${harvardArtMuseumUrl}&title=${searchKey}&size=5&page=${click}`
        );
        const searchResultData = await resp.json();
        setStatus("resolved");
        console.log(searchResultData.records);

        // filter
        // const filterData = searchResultData.records.filter((r) => {
        //   if (
        //     !r.hasOwnProperty("primaryimageurl") ||
        //     r.primaryimageurl === null
        //   ) {
        //     return false;
        //   }
        //   return true;
        // });
        // console.log(filterData);

        // find artist name if exists
        for (let obj of searchResultData.records) {
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

  // fetch based on input data
  // const makeAPICall = async () => {
  //   setStatus("loading");
  //   try {
  //     const res = await fetch(
  //       `https://api.harvardartmuseums.org/classification?apikey=${apikey}&size=59`
  //     );
  //     const searchResult = await res.json();

  //     const regex = new RegExp(searchKey, "i");
  //     const checkSearch = searchResult.records.filter((c) => {
  //       // regex.test(c.name);
  //       if (regex.test(c.name)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //     console.log(checkSearch[0].id);
  //     // setSearchId(`${checkSearch[0].id}`);

  //     const resp = await fetch(
  //       `${harvardArtMuseumUrl}&classification=${checkSearch[0].id}&size=5&page=${click}`
  //     );
  //     const searchResultData = await resp.json();
  //     setStatus("resolved");
  //     console.log(searchResultData.records);

  //     // filter
  //     const filterData = searchResultData.records.filter((r) => {
  //       if (
  //         !r.hasOwnProperty("primaryimageurl") ||
  //         r.primaryimageurl === null
  //       ) {
  //         return false;
  //       }
  //       return true;
  //     });
  //     console.log(filterData);

  //     // find artist name if exists
  //     for (let obj of filterData) {
  //       if (obj.hasOwnProperty("people") && obj.people[0].length !== 0) {
  //         const artists = [];
  //         for (let p of obj.people) {
  //           artists.push(p.name);
  //         }
  //         setData((data) => [
  //           ...data,
  //           {
  //             title: obj.title,
  //             artist: artists.join(", "),
  //             culture: obj.culture,
  //             period: obj.period,
  //             date: obj.dated,
  //             classification: obj.classification,
  //             medium: obj.medium,
  //             dimensions: obj.dimensions,
  //             description: obj.description,
  //             image: obj.primaryimageurl,
  //           },
  //         ]);
  //       } else {
  //         setData((data) => [
  //           ...data,
  //           {
  //             title: obj.title,
  //             culture: obj.culture,
  //             period: obj.period,
  //             date: obj.dated,
  //             classification: obj.classification,
  //             medium: obj.medium,
  //             dimensions: obj.dimensions,
  //             description: obj.description,
  //             image: obj.primaryimageurl,
  //           },
  //         ]);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // makeAPICall();

  // useEffect(() => {
  // }, [click]);

  // useEffect(() => {
  //   const makeAPICall = async () => {
  //     try {
  //       const resp = await fetch(
  //         `${harvardArtMuseumUrl}&classification=${checkSearch[0].id}&size=5&page=${click}`
  //       );
  //       const searchResultData = await resp.json();
  //       setStatus("resolved");
  //       console.log(searchResultData.records);

  //       // filter
  //       const filterData = searchResultData.records.filter((r) => {
  //         if (
  //           !r.hasOwnProperty("primaryimageurl") ||
  //           r.primaryimageurl === null
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       });
  //       console.log(filterData);

  //       // find artist name if exists
  //       for (let obj of filterData) {
  //         if (obj.hasOwnProperty("people") && obj.people[0].length !== 0) {
  //           const artists = [];
  //           for (let p of obj.people) {
  //             artists.push(p.name);
  //           }
  //           setData((data) => [
  //             ...data,
  //             {
  //               title: obj.title,
  //               artist: artists.join(", "),
  //               culture: obj.culture,
  //               period: obj.period,
  //               date: obj.dated,
  //               classification: obj.classification,
  //               medium: obj.medium,
  //               dimensions: obj.dimensions,
  //               description: obj.description,
  //               image: obj.primaryimageurl,
  //             },
  //           ]);
  //         } else {
  //           setData((data) => [
  //             ...data,
  //             {
  //               title: obj.title,
  //               culture: obj.culture,
  //               period: obj.period,
  //               date: obj.dated,
  //               classification: obj.classification,
  //               medium: obj.medium,
  //               dimensions: obj.dimensions,
  //               description: obj.description,
  //               image: obj.primaryimageurl,
  //             },
  //           ]);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }, [searchId]);

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
    // handleSearch();
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
          <div className="search-info">
            <h2>{data?.[current]?.title}</h2>
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
            {data?.[current]?.period !== null ? (
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

          <div className="search-image">
            <p>
              {current + 1} / {data.length}
            </p>
            <img
              src={
                data?.[current]?.image === null ? "" : data?.[current]?.image
              }
              alt="img"
            />
          </div>
        </>
      );
    }
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
      {display()}
      <br />
      <div className="nav">
        <Link to="/art" style={style}>
          Generate Set
        </Link>
        <Link to="/" style={style}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SearchArt;
