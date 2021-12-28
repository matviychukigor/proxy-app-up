import React from 'react'
import keitaro from "../Keitaro.jpeg";

const Pantners = () => {
  return(
    <>
        <a href="https://keitaro.io/" rel="noopener noreferrer" target="_blank">
          <img
            style={{width: "270px", height: "150px", borderRadius: "20px", margin: "20px auto", display: "flex", }}
            src={keitaro}
            alt="keitaro"
          ></img>
        </a>
    </>
  )
    
}

export default Pantners;