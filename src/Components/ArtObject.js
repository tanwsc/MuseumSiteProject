import * as React from "react";
import { useState, useEffect } from "react";

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

const ArtObject = ({ url }) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(1);
  const [current, setCurrent] = useState(0);

  const apikey = process.env.REACT_APP_APIKEY;
  const harvardArtMuseumUrl = `https://api.harvardartmuseums.org/object?apikey=${apikey}${url}&size=5&page=${click}`;

  //////////////////////////////////////////////////////////////// fetch api
  useEffect(() => {
    setData([]);
    setCurrent(0);
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
          if (!r.hasOwnProperty("images") || r.images.length === 0) {
            return false;
          }
          return true;
        });
        console.log(filterData);

        if (filterData.length === 0) {
          return setClick((prev) => prev + 1);
        }

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
                image: `${obj.images[0].iiifbaseuri}/full/pct:50/0/default.jpg`,
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
                image: `${obj.images[0].iiifbaseuri}/full/pct:50/0/default.jpg`,
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

  //////////////////////////////////////////////////////////////// render
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
          <div className="art-info">
            {/* {mapData(data)} */}
            <h2>{data?.[current]?.title}</h2>
            {data?.[current]?.description !== null ? (
              <p>
                <span>Description</span>
                <br />
                {data?.[current]?.description}
              </p>
            ) : null}
            {data?.[current]?.date !== null ? (
              <p>
                <span>Date</span>
                <br />
                {data?.[current]?.date}
              </p>
            ) : null}
            {data?.[current]?.hasOwnProperty("artist") &&
            data?.[current]?.artist !== null ? (
              <p>
                <span>Artist/s</span>
                <br />
                {data?.[current]?.artist}
              </p>
            ) : null}
            {data?.[current]?.classification !== null ? (
              <p>
                <span>Classification</span>
                <br />
                {data?.[current]?.classification}
              </p>
            ) : null}
            {data?.[current]?.culture !== null ? (
              <p>
                <span>Culture</span>
                <br />
                {data?.[current]?.culture}
              </p>
            ) : null}
            {data?.[current]?.period !== null ? (
              <p>
                <span>Period</span>
                <br />
                {data?.[current]?.period}
              </p>
            ) : null}
            {data?.[current]?.medium !== null ? (
              <p>
                <span>Medium</span>
                <br />
                {data?.[current]?.medium}
              </p>
            ) : null}
            {data?.[current]?.dimensions !== null ? (
              <p>
                <span>Dimensions</span>
                <br />
                {data?.[current]?.dimensions}
              </p>
            ) : (
              data?.[current]?.dimensions
            )}
          </div>

          <div className="art-image">
            <div className="img-button">
              <button onClick={handleNewSet}>New Set</button>
              <br />
              <button onClick={handlePrev}>{"<"}</button>
              <button onClick={handleNext}>{">"}</button>
            </div>
            <p>
              {current + 1} / {data.length}
            </p>
            <img src={data?.[current]?.image} alt="Apologies, not found" />
          </div>
        </>
      );
    }
  };

  return <>{display()}</>;
};

export default ArtObject;
