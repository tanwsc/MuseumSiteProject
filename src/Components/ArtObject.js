import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// classifications
// 17 - photographs
// 21 - drawings
// 23 - prints
// 26 - paintings
// 80 - paintings with calligraphy

// mediums
// 2028195 - ink
// 2028177 - oil
// 2028387 - textile materials
// 2028206 - watercolour
// 2028955 - ink and opaque watercolour

// keys to check for
// const objectDetail = [
//   "title",
//   "people",
//   "period",
//   "dated",
//   "classification",
//   "medium",
//   "dimensions",
//   "description",
//   "primaryimageurl",
// ];

const ArtObject = () => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(1);
  const [current, setCurrent] = useState(0);

  const apikey = process.env.REACT_APP_APIKEY;
  const harvardArtMuseumUrl = `https://api.harvardartmuseums.org/object?apikey=${apikey}&medium=2028177&size=5&page=${click}`;
  // NOTE: make useReducer for generating sets

  const linkStyle = {
    margin: "10px 10px",
    padding: "10px",
    borderRadius: "5px",
    background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  };

  //////////////////////////////////////////////////////////////// fetch api
  useEffect(() => {
    const makeAPICall = async () => {
      setStatus("loading");
      try {
        const res = await fetch(harvardArtMuseumUrl);
        const museum = await res.json();
        setStatus("resolved");
        console.log(museum.records);

        //////////////////////////////////////////////////////////////// filter data
        // if key + value exist
        // not null || undefined || empty
        const filterData = museum.records.filter((r) => {
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
  }, [harvardArtMuseumUrl]);
  console.log(data);

  //////////////////////////////////////////////////////////////// navigate obj
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
    if (status === "loading") {
      return <p>Loading</p>;
    } else if (status === "resolved") {
      console.log("resolved");
      console.log(data);
      return (
        <>
          <div className="art-info">
            <h3>{data?.[current]?.title}</h3>
            <p>{data?.[current]?.description}</p>
            <p>{data?.[current]?.date}</p>
            <p>{data?.[current]?.artist}</p>
            <p>{data?.[current]?.classification}</p>
            <p>{data?.[current]?.culture}</p>
            <p>{data?.[current]?.period}</p>
            <p>{data?.[current]?.medium}</p>
            <p>{data?.[current]?.dimensions}</p>
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
    <div className="art-main">
      <div>
        <Link to="/" style={linkStyle}>
          Back to Home
        </Link>
        <button onClick={handleNewSet}>New Set</button>
      </div>
      <div className="nav-button">
        <button onClick={handlePrev}>{"<"}</button>
        <button onClick={handleNext}>{">"}</button>
      </div>
      {display()}
    </div>
  );
};

export default ArtObject;

//////////////////////////////////////////////////////////////// map out data
// only available keys and key values in each obj
// const mapData = (data) => {
//   return data.map((art, index) => {
//     // console.log(art);
//     return (
//       <div key={index}>
//         <h3>{art.title}</h3>
//         <p>{art.description}</p>
//         <p>{art.date}</p>
//         <p>{art.artist}</p>
//         <p>{art.classification}</p>
//         <p>{art.culture}</p>
//         <p>{art.period}</p>
//         <p>{art.medium}</p>
//         <p>{art.dimensions}</p>
//         <img src={art.image} alt="img" />
//       </div>
//     );
//   });
// };
