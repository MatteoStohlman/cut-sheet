import * as React from "react";
import { render } from "react-dom";
import PartForm from "./partForm";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <PartForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
