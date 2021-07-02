import * as React from "react";
import { useState, useEffect } from "react";

// import ArtObjects from "./ArtObjects";

const apikey = process.env.REACT_APP_APIKEY;
const harvardArtMuseumApi = `https://api.harvardartmuseums.org/object?apikey=${apikey}&classification=75&size=100`;

const APITest = () => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState([]);

  const objectDetail = [
    "title",
    `people`,
    "period",
    "dated",
    "classification",
    "medium",
    "dimensions",
    "description",
    "primaryimageurl",
  ];

  // useEffect(() => {
  //   fetch(harvardArtMuseumApi)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error("Bad Response from server");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setData({
  //         title: data.records[0].title,
  //         period: data.records[0].period,
  //         date: data.records[0].dated,
  //         classification: data.records[0].classification,
  //         medium: data.records[0].medium,
  //         dimensions: data.records[0].dimensions,
  //         image: data.records[0].primaryimageurl,
  //       });
  //     });
  // }, []);

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const res = await fetch(harvardArtMuseumApi);
        const museum = await res.json();
        setStatus("resolved");
        console.log(museum.records);

        const filterData = museum.records
          .filter((r) => {
            for (let keys of objectDetail) {
              if (!r.hasOwnProperty(keys)) {
                return false;
              }
            }
            return true;
          })
          .filter((r) => {
            for (let keys of objectDetail) {
              if (r[keys] === null) {
                return false;
              }
            }
            return true;
          })
          .filter((r) => {
            for (let keys of objectDetail) {
              if (r[keys] === "") {
                return false;
              }
            }
            return true;
          })
          .filter((r) => {
            if (r.people.length === 0) {
              return false;
            } else if (r.people[0].name === null || r.people[0].name === "") {
              return false;
            }
            return true;
          });
        console.log(filterData);

        setData((data) => [
          ...data,
          {
            title: museum.records[0].title,
            // artist: museum.records[0].people[0].name,
            period: museum.records[0].period,
            date: museum.records[0].dated,
            classification: museum.records[0].classification,
            medium: museum.records[0].medium,
            dimensions: museum.records[0].dimensions,
            description: museum.records[0].description,
            image: museum.records[0].primaryimageurl,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    makeAPICall();
  }, []);
  console.log(data);

  const mapData = (data) => {
    return data.map((art, index) => {
      console.log(art);
      return (
        <div key={index}>
          <h3>{art.title}</h3>
          {/* <p>{art.artist}</p> */}
          <p>{art.period}</p>
          <p>{art.date}</p>
          <p>{art.classification}</p>
          <p>{art.medium}</p>
          <p>{art.dimensions}</p>
          <p>{art.description}</p>
          <img src={art.image} alt="img" />
        </div>
      );
    });
  };

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

export default APITest;
