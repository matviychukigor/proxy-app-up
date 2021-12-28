import React from 'react'
import keitaro from "../Keitaro.jpeg";

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
    </div>
  )
    
}

export default Pantners;