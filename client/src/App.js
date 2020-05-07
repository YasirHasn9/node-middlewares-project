import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [state, useState] = React.useState();
  React.useEffect(() => {
    axios
      .get("https://middlewars.herokuapp.com/users")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>react</h1>
      </header>
    </div>
  );
}

export default App;
