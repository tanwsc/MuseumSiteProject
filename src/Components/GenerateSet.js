import * as React from "react";
// import { useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import ArtObject from "./ArtObject.js";

const GenerateSet = ({ style }) => {
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
    "ink&opaquewatercolour": "&medium=2028955",
  };
  // console.log(allOptions[params.category]);

  const url = allOptions[params.category];

  return (
    <div className="art-main">
      <div className="nav">
        <Link to="/art" style={style}>
          Choose Set
        </Link>
        <Link to="/" style={style}>
          Back to Home
        </Link>
      </div>
      <ArtObject url={url} />
    </div>
  );
};

export default GenerateSet;
