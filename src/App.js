import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home.js";
import ChooseSet from "./Components/ChooseSet.js";
import GenerateSet from "./Components/GenerateSet.js";
import SearchArt from "./Components/SearchArt.js";

// import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// const theme = createMuiTheme({

// });

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
    margin: "40px auto 40px auto",
    fontSize: "1.4em",
  },
  navBar: {
    backgroundColor: "rgb(223, 211, 195)",
    alignItems: "center",
  },
  artMain: {
    margin: "120px auto 50px auto",
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
    // width: "100%",
    borderRadius: "10px",
    // background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  },
});

function App() {
  const classes = useStyles();
  // const linkStyle = {
  //   margin: "10px 10px",
  //   padding: "10px",
  //   borderRadius: "5px",
  //   background: "rgb(223, 211, 195)",
  //   color: "rgb(89, 110, 121)",
  //   fontSize: "14px",
  //   textDecoration: "none",
  // };

  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
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
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
