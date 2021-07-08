import * as React from "react";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { CardActionArea } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MenuBar from "./MenuBar.js";

// classifications
// &classification=17 - photographs
// &classification=21 - drawings
// &classification=23 - prints
// &classification=26 - paintings
// &classification=80 - paintings with calligraphy

// &medium=2028195 - ink
// &medium=2028177 - oil
// &medium=2028387 - textile materials
// &medium=2028206 - watercolour
// &medium=2028955 - ink and opaque watercolour

const allOptions = [
  // { id: "photographs", link: "&classification=17" },
  {
    name: "Drawings",
    id: "drawings",
    link: "&classification=21",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/20029233/square/pct:50/0/default.jpg",
  },
  {
    name: "Prints",
    id: "prints",
    link: "&classification=23",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/20455962/square/pct:50/0/default.jpg",
  },
  {
    name: "Paintings",
    id: "paintings",
    link: "&classification=26",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/17804275/square/pct:50/0/default.jpg",
  },
  {
    name: "Calligraphy Paintings",
    id: "paintingswcalligraphy",
    link: "&classification=80",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/18744888/square/pct:50/0/default.jpg",
  },
  {
    name: "Ink",
    id: "ink",
    link: "&medium=2028195",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/17456990/square/pct:50/0/default.jpg",
  },
  {
    name: "Oil",
    id: "oil",
    link: "&medium=2028177",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/18780202/square/pct:50/0/default.jpg",
  },
  {
    name: "Textile",
    id: "textile",
    link: "&medium=2028387",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/18720497/square/pct:50/0/default.jpg",
  },
  {
    name: "Watercolour",
    id: "watercolour",
    link: "&medium=2028206",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/17456550/square/pct:50/0/default.jpg",
  },
  {
    name: "Ink and Watercolour",
    id: "ink&opaquewatercolour",
    link: "&medium=2028955",
    image:
      "https://ids.lib.harvard.edu/ids/iiif/8922859/square/pct:50/0/default.jpg",
  },
];

const ChooseSet = ({ style, window }) => {

  return (
    <>
      <MenuBar style={style} window={window} />
      <Container className={style.cardGrid} maxWidth="md">
        <Typography variant="h2" className={style.typoHeaders}>
          Selected curations for you
        </Typography>
        <Grid container spacing={4}>
          {allOptions.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card className={style.card}>
                <CardActionArea component={Link} to={`/art/${item.id}`}>
                  <CardMedia
                    className={style.cardMedia}
                    image={`${item.image}`}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      className={`${style.cardButton}`}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ChooseSet;
