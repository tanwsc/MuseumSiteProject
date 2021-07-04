import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home.js";
import ChooseSet from "./Components/ChooseSet.js";
import ArtObject from "./Components/ArtObject.js";
import SearchArt from "./Components/SearchArt.js";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          {/* Home page */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* Art sets */}
          <Route path='/art'>
            <ChooseSet />
          </Route>
          <Route path="/art/:category">
            <ArtObject />
          </Route>

          {/* Search page */}
          <Route path="/search">
            <SearchArt />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
