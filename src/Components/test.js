import * as React from "react";
import { useState, useEffect } from "react";

const apikey = process.env.REACT_APP_APIKEY;
const harvardArtMuseumApi = `https://api.harvardartmuseums.org/object?apikey=${apikey}&classification=75&size=1`;

const APITest = () => {
  const [data, setData] = useState({
    title: "",
    period: "",
    date: "",
    classification: "",
    medium: "",
    dimensions: "",
    image: "",
  });
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetch(harvardArtMuseumApi)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Bad Response from server");
        }
      })
      .then((data) => {
        console.log(data);
        setData({
          title: data.records[0].title,
          period: data.records[0].period,
          date: data.records[0].dated,
          classification: data.records[0].classification,
          medium: data.records[0].medium,
          dimensions: data.records[0].dimensions,
          image: data.records[0].primaryimageurl,
        });
      });
  }, [toggle]);

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.period}</p>
      <p>{data.date}</p>
      <p>{data.classification}</p>
      <p>{data.medium}</p>
      <p>{data.dimensions}</p>
      <img src={data.image} alt="img" />
    </div>
  );
};

export default APITest;
