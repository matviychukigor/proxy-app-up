import React, {useEffect, useState} from "react";

import proxyService from "../../services/proxy.service";

import Spinner from "../spinner/spinner.component";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory  from "react-bootstrap-table2-paginator";


const Tabs = () => {
    const [services] = useState(new proxyService())

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); 

    const [inputValue, setInputValue] = useState("");

    const getUsers = () => {
        services.getAllUsers()
            .then((res) => {
                setUsers(res)
                setLoading(false)
            })
            /* .then((user) => {
                console.log(users)
            }) */
    }

    const colums = [
        { dataField: "id", text: "id", },
        { dataField: "nickname", text: "nickname", },
        { dataField: "email", text: "email", },
        { dataField: "balance", text: "balance", },
    ]

    const pagination = paginationFactory({
        hideSizePerPage: true
    }) 

    const filterUser = users.filter(user => {
        return user.nickname.includes(inputValue)
    })

    useEffect(() => {
        getUsers(1000);
    })

    return(
        <div>
            <div className="form">
                <form className="search form">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="search__input"
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                </form>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                <BootstrapTable
                    className="tableDark"
                    keyField="nickname"
                    data={filterUser}
                    columns={colums}
                    pagination={ pagination }
                />
            ) }
        </div>
    )
}

export default Tabs;