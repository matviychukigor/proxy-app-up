import React, { useState } from "react";
import { Tab, Tabs } from 'react-bootstrap';

import logo from "../logo.png"
import "./analitics.css";

import InfoCard from "./card";

import PaginationTabUser from "./table_user_pagination";
import UserPays from "./user_pays";
import Replenishment from "./replenishment";


const Analitics = () => {

    const [ checkUser, setChekUser ] = useState("")

    return (
            <div className="analitic_wrapper">
                <img style={{ display: "block", margin: "0 auto" }} src={logo} alt="search"></img>
                
                <InfoCard/>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="See all users">
                        <PaginationTabUser
                            setChekUser={setChekUser}
                            checkUser={checkUser}
                        />
                    </Tab>
                    <Tab eventKey="profile" title="See information of select user">
                        <UserPays
                            checkUser={checkUser}
                        />
                    </Tab>
                    <Tab eventKey="replenishment" title="User replenishment">
                        <Replenishment
                            checkUser={checkUser}
                        />
                    </Tab>
                </Tabs>
            </div>
    )
}

export default Analitics;