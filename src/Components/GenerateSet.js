import * as React from "react";
// import { useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";

import ArtObject from "./ArtObject.js";

// const HideOnScroll = (props) => {
//   const { children, window } = props;

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// };

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

  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    // <div className="art-main">
    //   <div className="nav">
    //     <Button className={style.button} component={Link} to="/art">
    //       Choose Set
    //     </Button>
    //     <Button className={style.button} component={Link} to="/">
    //       Back to Home
    //     </Button>
    //   </div>
    //   <ArtObject style={style} url={url} />
    // </div>
    <>
      <Slide
        appear={false}
        direction="down"
        in={!trigger}
        className={style.navBar}
      >
        <AppBar>
          <Toolbar>
            <Button className={style.button} component={Link} to="/">
              Back to Home
            </Button>
            <Button className={style.button} component={Link} to="/art">
              Choose Set
            </Button>
            <Button className={style.button} component={Link} to="/search">
              Search for Art
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
      <Container className={style.artMain}>
        <ArtObject style={style} url={url} />
      </Container>
    </>
  );
};

export default GenerateSet;
