import * as React from "react";
import { useState, useEffect } from "react";

// import ArtObjects from "./ArtObjects";

const apikey = process.env.REACT_APP_APIKEY;
const harvardArtMuseumApi = `https://api.harvardartmuseums.org/object?apikey=${apikey}&classification=21&size=10`;

// classifications
// 17 - photographs
// 21 - drawings
// 23 - prints
// 26 - paintings
// 80 - paintings with calligraphy

const ArtObject = () => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState([]);

  // keys to check for
  const objectDetail = [
    "title",
    "people",
    "period",
    "dated",
    "classification",
    "medium",
    "dimensions",
    "description",
    "primaryimageurl",
  ];

  //////////////////////////////////////////////////////////////// fetch api
  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const res = await fetch(harvardArtMuseumApi);
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
        // .filter((r) => {
        //   for (let keys of objectDetail) {
        //     if (r[keys] === null) {
        //       return false;
        //     }
        //   }
        //   return true;
        // })
        // .filter((r) => {
        //   for (let keys of objectDetail) {
        //     if (r[keys] === "") {
        //       return false;
        //     }
        //   }
        //   return true;
        // })
        // .filter((r) => {
        //   if (r.people.length === 0) {
        //     return false;
        //   } else if (r.people[0].name === null || r.people[0].name === "") {
        //     return false;
        //   }
        //   return true;
        // });
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
  }, []);
  console.log(data);

  //////////////////////////////////////////////////////////////// map out data
  // only available keys and key values in each obj
  const mapData = (data) => {
    return data.map((art, index) => {
      // console.log(art);
      return (
        <div key={index}>
          <h3>{art.title}</h3>
          <p>{art.description}</p>
          <p>{art.date}</p>
          <p>{art.artist}</p>
          <p>{art.classification}</p>
          <p>{art.culture}</p>
          <p>{art.period}</p>
          <p>{art.medium}</p>
          <p>{art.dimensions}</p>
          <img src={art.image} alt="img" />
        </div>
      );
    });
  };

  // display status
  const display = () => {
    if (status === "loading") {
      return "Loading";
    } else if (status === "resolved") {
      console.log("resolved");
      return mapData(data);
    }
  };

  return <div>{display()}</div>;
};

export default ArtObject;
