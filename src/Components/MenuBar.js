import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

const MenuBar = ({ style, window }) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
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
    </>
  );
};

export default MenuBar;
