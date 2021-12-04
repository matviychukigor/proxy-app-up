import React from "react";
import tickSvg from "./ghost.ico";

function Agree() {
  return (
    <img
      style={{ marginTop: "3px" }}
      className="tick-image"
      src={tickSvg}
      alt="tick-img"
    />
  );
}

export default Agree;
