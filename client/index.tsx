import * as React from "react";
import * as ReactDOM from "react-dom";
import Application from "./application";
import setIntervalOverride from "./setIntervalOverride";

require("./index.scss");

// Overrides the default behaviour of "setInterval" to keep users from writing scripts that
// fx. clicks the button automatically.
window.setInterval = setIntervalOverride;

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);