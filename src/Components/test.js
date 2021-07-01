import * as React from "react";
import { useState, useEffect } from "react";

const apikey = "d9d10c6f-db49-492f-b90f-6319d07b951f";
const harvardArtMuseumApi = `https://api.harvardartmuseums.org/object?apikey=${apikey}&size=5`;

const APITest = () => {
  const [data, setData] = useState();

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
        setData(data);
      });
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export default APITest;
