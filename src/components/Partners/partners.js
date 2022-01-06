import React from 'react'
import keitaro from "../Keitaro.jpeg";
import atom from "../atom.png"
import atomBlack from "../atom_black.png";

import "./pantners.css";

const Pantners = () => {
  return(
    <div className="partners_wrapper">
        <a href="https://keitaro.io/" rel="noopener noreferrer" target="_blank">
          <img
            className="partners_img"
            src={keitaro}
            alt="keitaro"
          ></img>
        </a>
        <a href="https://at.university/">
          <img
            style={{width: "95px"}}
            className="partners_img"
            src={atomBlack}
            alt="atom"
          ></img>
        </a>
    </div>
  )
    
}

export default Pantners;