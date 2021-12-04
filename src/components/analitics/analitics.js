import React from "react";
import { Tab, Tabs } from 'react-bootstrap';

import logo from "../logo.png"
import "./analitics.css";

import InfoCard from "./card";
import UserTable from "./user_table";

const Analitics = () => {

    
    return (
        <div className="analitic_wrapper">
            <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
            
            <InfoCard/>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Home">
                    <UserTable/>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <InfoCard/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Analitics;