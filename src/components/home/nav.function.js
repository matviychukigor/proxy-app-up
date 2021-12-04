import React, {useState} from 'react';
import {Nav, Button, NavItem} from "reactstrap";

export default function Navbar({buttonsData, setLand, setIndex}) {
    const [active, setActive] = useState("1")

    return (
        <>
            <Nav>
                {buttonsData.map((item) => {
                    return (
                    <NavItem key={item.id}>
                        <Button
                        className="mr-2 btns"
                        active={active === item.id}
                        onClick={() => {
                            setActive(item.id);
                            setLand(item.value);
                            setIndex(item.id)
                        }}
                        >
                        {item.name}
                        </Button>
                    </NavItem>
                    );
                })}
            </Nav>
        </>
    )
}
