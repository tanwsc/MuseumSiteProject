import "./App.css";
import { useState } from "react";
import ArtObject from "./Components/ArtObject.js";

function App() {
  const [click, setClick] = useState(1);

  // change old set with new set
  const handleNewSet = () => {
    setClick((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Art Set {click}</h1>
      <button onClick={handleNewSet}>New Set</button>
      <ArtObject artSet={click} />
    </div>
  );
}

export default App;
