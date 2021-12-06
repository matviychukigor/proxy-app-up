import React, {useState, useEffect} from "react";

import proxyService from "../../services/proxy.service";
import Spinner from "../spinner/spinner.component";

import { Button } from "reactstrap";

const PaginationTabUser = () => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true); 

    const [inputValue, setInputValue] = useState("");

    const [ checkedNick, setCheckedNick ] = useState("");
    const [ changeValueBalance, setBalanceChange ] = useState("");
    const [ upgradeValueBalance, setBalanceUpgrade ] = useState("");

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

    const changeBalance = () => {
        setBalanceChange("")
        setInputValue("")
        servise.changeBalance(checkedNick, changeValueBalance)
        .then((res) => {
            console.log(res)
        })
    }

    const upgradeBalance = () => {
        setBalanceUpgrade("")
        setInputValue("")
        servise.upgradeBalance(checkedNick ,upgradeValueBalance)
        .then((res) => console.log(res))
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
                            onClick={changeBalance}>
                                Update balance
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
                            onClick={upgradeBalance}>
                                Upgrade balance
                            </Button>
                        </div>
                    
                    </div>
                </form>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                <table className="table table-striped table-dark">
                    <thead>
                        <tr >{header.map((h, i) => <th scope="col" key={i}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                    {filterUser.map((k, i) => {
                        return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{k.id}</td>
                            <td>{k.nickname}</td>
                            <td>{k.email}</td>
                            <td>{k.balance.toFixed(2)}</td>
                            <td>
                                <div className ="form-check">
                                    <input 
                                        className="form-check-input position-static" 
                                        type="radio" 
                                        name="blankRadio" 
                                        id="blankRadio1" 
                                        value={k.nickname}
                                        onChange={(event) => setCheckedNick(event.target.value)} 
                                        aria-label="..."
                                    />
                                </div>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            )} 
        </div>
    )
}

export default PaginationTabUser;