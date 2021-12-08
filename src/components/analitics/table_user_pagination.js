import React, {useState, useEffect} from "react";

import proxyService from "../../services/proxy.service";
import Spinner from "../spinner/spinner.component";

import { Button } from "reactstrap";

const PaginationTabUser = ({checkUser, setChekUser}) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true); 

    const [inputValue, setInputValue] = useState("");

    /* const [ checkedNick, setCheckedNick ] = useState(""); */
    const [ changeValueBalance, setBalanceChange ] = useState("");
    const [ upgradeValueBalance, setBalanceUpgrade ] = useState("");

    const [ disableChange, setDisChange ] = useState(false);
    const [ disableUpgrade, setDisUpgrade ] = useState(false);

    const servise = new proxyService()
    
    useEffect(() => {
        const servise = new proxyService()
        servise.getAllUsers(1000)
        .then((res) => {
            setUser(res)
            setLoading(false)
        })
    }, [])

    const filterUser = user.filter(user => {
        return user.nickname.includes(inputValue)
    })

    const updateTable = () => {
        console.log("user-btn")
        setLoading(true)
        servise.getAllUsers(1000)
        .then((res) => {
            setUser(res)
            setLoading(false)
        })
    }

    const changeBalance = () => {
        setDisChange(true)
        setBalanceChange("")
        setInputValue("")
        servise.changeBalance(checkUser, changeValueBalance)
        .then((res) => {
            console.log(res)
            setDisChange(false)
        })
    }

    const upgradeBalance = () => {
        setDisUpgrade(true)
        setBalanceUpgrade("")
        setInputValue("")
        servise.upgradeBalance(checkUser ,upgradeValueBalance)
        .then((res) => {
            setDisUpgrade(true)
            console.log(res)
        })
    }

    const header = ["№","id", "nickname", "email", "balance", "Chek_user"];
    return (
        <div>
            <div className="form">
                <form className="search form">
                    <div className="form_inputs">
                        <div className="form_user">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="search__input user_input"
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                        </div>
                        
                        <div className="form_update">
                            <input
                                type="number"
                                placeholder="Change balance"
                                className="search__input balance_input"
                                value={changeValueBalance}
                                onChange={(e) => setBalanceChange(e.target.value)}
                            />   

                            <Button
                            className="btn-class balance_btn"
                            style={{marginLeft: "20px"}}
                            onClick={changeBalance}
                            disabled={disableChange}>
                                Update balance {disableChange ? (<span className="spinner-border spinner-border-sm"></span>) : (" ")}
                            </Button>
                        </div>

                        <div className="form_upgrade">
                            <input
                                type="number"
                                placeholder="Upgrade balance"
                                className="search__input balance_input"
                                value={upgradeValueBalance}
                                onChange={(e) => setBalanceUpgrade(e.target.value)}
                            /> 
                            <Button
                            className="btn-class balance_btn"
                            style={{marginLeft: "20px"}}
                            onClick={upgradeBalance}
                            disabled={disableUpgrade}>
                                Upgrade balance {disableUpgrade ? (<span className="spinner-border spinner-border-sm"></span>) : (" ")}
                            </Button>
                        </div>
                        <Button 
                        onClick={updateTable}
                        style={{marginBottom: "20px", width: "200px"}}>
                            Update table
                        </Button>
                    </div>
                </form>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                <div className="table_wrapper">
                    <table style={{width: "70%"}} className="table table-striped table-dark">
                        <thead>
                            <tr >{header.map((h, i) => <th style={{textAlign: "center"}} scope="col" key={i}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                        {filterUser.map((k, i) => {
                            return (
                            <tr key={i}>
                                <th style={{width: "20px"}} scope="row">{i+1}</th>
                                <td style={{width: "50px"}}>{k.id}</td>
                                <td className="col-4" style={{textAlign: "center"}}> {k.nickname}</td>
                                <td className="col-4" style={{textAlign: "center"}}>{k.email}</td>
                                <td className="col-2" style={{textAlign: "center"}}>{k.balance.toFixed(2)}</td>
                                <td >
                                    <div className ="form-check">
                                        <input 
                                            className="form-check-input position-static" 
                                            type="radio" 
                                            name="blankRadio" 
                                            id="blankRadio1" 
                                            value={k.nickname}
                                            onChange={(event) => setChekUser(event.target.value)} 
                                            aria-label="..."
                                        />
                                    </div>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )} 
        </div>
    )
}

export default PaginationTabUser;