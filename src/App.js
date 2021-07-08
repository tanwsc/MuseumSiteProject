import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home.js";
import ChooseSet from "./Components/ChooseSet.js";
import GenerateSet from "./Components/GenerateSet.js";
import SearchArt from "./Components/SearchArt.js";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "rgb(240, 236, 227)",
      main: "rgb(223, 211, 195)",
      dark: "rgb(205, 172, 129)",
    },
  },
  typography: {
    htmlFontSize: 14,
    fontSize: 12,
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "1.6rem",
    },
    h3: {
      fontSize: "1.4rem",
    },
  },
  focused: {
    color: "rgb(223, 211, 195)",
  },
});

const useStyles = makeStyles({
  button: {
    margin: "10px 10px",
    padding: "6px 12px",
    width: "160px",
    borderRadius: "5px",
    background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  },
  typoHeaders: {
    margin: "120px auto 40px auto",
    // fontSize: "1.4em",
  },
  nav: {
    margin: "20px auto",
  },
  navBar: {
    backgroundColor: "rgb(223, 211, 195)",
    alignItems: "center",
  },
  artMain: {
    margin: "50px auto 50px auto",
    justifyContent: "center",
    alignItems: "center",
  },
  searchMain: {
    justifyContent: "center",
    alignItems: "center",
  },
  genMain: {
    marginTop: "90px",
  },
  artHeader: {
    margin: "20px auto 40px auto",
    // fontSize: "1.4em",
    fontStyle: "italic",
    color: "rgb(136, 110, 77)",
  },
  artInfo: {
    // maxHeight: "100vh",
    overflowY: "scroll",
  },
  artData: {
    margin: "20px auto 10px auto",
    padding: "20px",
    backgroundColor: "rgb(223, 211, 195)",
  },
  artImage: {
    margin: "60px auto 10px auto",
    // maxHeight: "100vh",
    overflowY: "scroll",
  },
  artButton: {
    margin: "10px 10px",
    padding: "6px 12px",
    height: "100px",
    borderRadius: "5px",
    // background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "16px",
    textDecoration: "none",
  },
  cardGrid: {
    margin: "40px auto",
    alignItems: "center",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "rgb(223, 211, 195)",
    border: "none",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardButton: {
    margin: "10px 10px",
    padding: "6px 12px",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    fontStyle: "italic",
    textDecoration: "none",
  },
  searchHeader: {
    margin: "120px auto 10px auto",
  },
  searchButton: {
    margin: "10px 10px",
    padding: "6px 12px",
    width: "auto",
    borderRadius: "5px",
    background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  },
  footer: {
    // margin: "20px auto",
    padding: "20px 0",
    width: "100%",
    position: "absolute",
    left: "0",
    bottom: "0",
    textAlign: "center",
    background: "rgb(240, 236, 227)",
    color: "rgb(136, 110, 77)",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <main>
          <Switch>
            {/* Home page */}
            <Route exact path="/">
              <Home style={classes} />
            </Route>

            {/* Art sets */}
            <Route path="/art/:category">
              <GenerateSet style={classes} />
            </Route>
            <Route path="/art">
              <ChooseSet style={classes} />
            </Route>

            {/* Search page */}
            <Route path="/search">
              <SearchArt style={classes} />
            </Route>
          </Switch>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
