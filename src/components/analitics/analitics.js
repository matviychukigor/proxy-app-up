import React, { useState } from "react";
import { Tab, Tabs } from 'react-bootstrap';

import logo from "../logo.png"
import "./analitics.css";

import InfoCard from "./card";

import PaginationTabUser from "./table_user_pagination";
import UserPays from "./user_pays";
import Replenishment from "./replenishment";
import UserPayments from "./user_payments";


const Analitics = () => {

    const [ checkUser, setChekUser ] = useState("")

    return (
            <div className="analitic_wrapper">
                <img className="logo_ghost" src={logo} alt="search"></img>
                
                <InfoCard/>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="payments" title="Пополнения">
                        <UserPayments/>
                    </Tab>
                    <Tab eventKey="home" title="Просмотр всех users">
                        <PaginationTabUser
                            setChekUser={setChekUser}
                            checkUser={checkUser}
                        />
                    </Tab>
                    <Tab eventKey="profile" title="Информация о покупках юзера">
                        <UserPays
                            checkUser={checkUser}
                        />
                    </Tab>
                    <Tab eventKey="replenishment" title="Информация о пополнениях юзера">
                        <Replenishment
                            checkUser={checkUser}
                        />
                    </Tab>
                </Tabs>
            </div>
    )
}

export default Analitics;