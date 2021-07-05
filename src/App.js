import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home.js";
import ChooseSet from "./Components/ChooseSet.js";
import ArtObject from "./Components/ArtObject.js";
import SearchArt from "./Components/SearchArt.js";

function App() {
  const linkStyle = {
    margin: "10px 10px",
    padding: "10px",
    borderRadius: "5px",
    background: "rgb(223, 211, 195)",
    color: "rgb(89, 110, 121)",
    fontSize: "14px",
    textDecoration: "none",
  };

  return (
    <div className="App">
      <main>
        <Switch>
          {/* Home page */}
          <Route exact path="/">
            <Home style={linkStyle} />
          </Route>

          {/* Art sets */}
          <Route path="/art/:category">
            <ArtObject style={linkStyle} />
          </Route>
          <Route path="/art">
            <ChooseSet style={linkStyle} />
          </Route>

          {/* Search page */}
          <Route path="/search">
            <SearchArt style={linkStyle} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
