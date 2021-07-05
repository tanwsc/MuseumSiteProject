import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
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
const objectDetail = [
  "title",
  // "people",
  "period",
  "dated",
  "classification",
  "medium",
  "dimensions",
  "description",
  // "primaryimageurl",
];

const ArtObject = ({ style }) => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(1);
  const [current, setCurrent] = useState(0);

  const params = useParams();
  const allOptions = {
    // photographs: "&classification=17",
    drawings: "&classification=21",
    prints: "&classification=23",
    paintings: "&classification=26",
    paintingswcalligraphy: "&classification=80",
    ink: "&medium=2028195",
    oil: "&medium=2028177",
    textile: "&medium=2028387",
    watercolour: "&medium=2028206",
    inkopaquewatercolour: "&medium=2028955",
  };
  // console.log(allOptions[params.category]);

  const apikey = process.env.REACT_APP_APIKEY;
  const harvardArtMuseumUrl = `https://api.harvardartmuseums.org/object?apikey=${apikey}${
    allOptions[`${params.category}`]
  }&size=5&page=${click}`;

  //////////////////////////////////////////////////////////////// fetch api
  useEffect(() => {
    const makeAPICall = async () => {
      setStatus("loading");
      try {
        const res = await fetch(harvardArtMuseumUrl);
        const museum = await res.json();
        setStatus("resolved");
        // console.log(museum.records);

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
        // console.log(filterData);

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
      // console.log(data);
      return (
        <>
          <div className="art-info">
            {/* {mapData(data)} */}
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
    <div className="art-main">
      <div>
        <Link to="/" style={style}>
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
// for (let art of data) {
//   for (let k in art) {
//     console.log(k, art[k]);
//     if (art[k] === null) {
//       delete k
//     }
//   }
// }
// return data.map((art, index) => {
// for (let k in art) {
//   if (art[k] !== null) {
//     // console.log(k);
//     // console.log(k, art[k]);
//     return (
//       <>
//         <p>
//           {k}
//           <br />
//           <span>{art?.[k]}</span>
//         </p>
//       </>
//     );
//   }
// }

// return (
// <div key={index}>
//   <h3>{art.title}</h3>
//   <p>{art.description}</p>
//   <p>{art.date}</p>
//   <p>{art.artist}</p>
//   <p>{art.classification}</p>
//   <p>{art.culture}</p>
//   <p>{art.period}</p>
//   <p>{art.medium}</p>
//   <p>{art.dimensions}</p>
//   <img src={art.image} alt="img" />
// </div> );
//   });
// };
// mapData(data);