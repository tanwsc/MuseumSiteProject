import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Home = ({ style }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" className={style.typoHeaders}>
        mini curates
      </Typography>
      <Typography variant="body1" className={style.typoBody}>
        Welcome to Mini Curates. Start by picking out a category that we've
        prepared for you. You'll receive a bite-sized selection of artpieces for
        you to browse through. Want more? You can always request for a new set
        to look at. Want something a bit more specific? You can look up a
        keyword of a title and we'll find something for you.
      </Typography>
      <br />
      <Typography variant="body1" className={style.typoBody}>
        All the data on this site is provided by an API from Harvard Art Museum.
        This site is not endorsed by them.
      </Typography>
      <br />
      <Typography variant="body1" className={style.typoBody}>
        We hope you enjoy your stay.
      </Typography>
      <Box className={style.nav}>
        <Button className={style.button} component={Link} to="/art">
          Choose Set
        </Button>
        <Button className={style.button} component={Link} to="/search">
          Search for Art
        </Button>
      </Box>
      <footer className={style.footer}>
        <Typography variant="caption">
          © 2021. A small project by Charlene Tan.
        </Typography>
      </footer>
    </Container>
  );
};

export default Home;
