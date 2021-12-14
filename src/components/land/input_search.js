import React, { useState } from "react";
import { countries, } from "./countries";

const SearchInput = ({setLand}) => {
    const [openInput, setOpenInput] = useState(true)
    const [inputValue, setInputValue] = useState("")
    /* const [postCountry, setPostCountry] = useState("") */
    const country = [];

    countries.map((item) =>{
        if(item.country !== "all"){
            country.push(item)
        }
        return item
    })


    const filterCountry = country.filter(item => {
        return item.country.toLowerCase().includes(inputValue.toLowerCase())
    })
    const inputOpen = () => {
        setOpenInput(!openInput)
    }

    const onChange = (event) => {
        setInputValue(event.target.value)
    }

    return(
        <div className="input_wrapper">
            <input onClick={inputOpen} className="input_country" type="text" onChange={onChange} value={inputValue} placeholder="Search country..."/>
            <ul className={openInput ? "hide_input" : "country_wrapper"}>
                {filterCountry.map((item, index) => {
                    return(
                        <li 
                            key={index} 
                            className="country_name" 
                            onClick={() =>{
                                setOpenInput(!openInput)
                                setInputValue(`${item.country}${item.emoji}`)
                                setLand(item.post)
                                /* setPostCountry(item.post) */
                            }}
                        >
                            {item.country}{item.emoji}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchInput;