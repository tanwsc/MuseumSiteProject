import * as React from "react";
import { useParams } from "react-router";
import Container from "@material-ui/core/Container";
import ArtObject from "./ArtObject.js";
import MenuBar from "./MenuBar.js";

const GenerateSet = ({ style, window }) => {
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
    <>
      <MenuBar style={style} window={window} />
      <Container className={style.genMain}>
        <ArtObject style={style} url={url} />
      </Container>
    </>
  );
};

export default GenerateSet;
