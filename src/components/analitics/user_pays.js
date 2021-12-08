import React, {useEffect, useState} from "react";

import proxyService from "../../services/proxy.service";

const UserPays = ({checkUser}) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        const servise = new proxyService();
        servise.getUserPayment(checkUser)
        .then((res) => {
            setInfo(res.data)
        })
    }, [checkUser])

    const header = ["№","id", "Type pay", "Acount", "Date", "Amount", "Buyer", "City", "ProxyID", "Region", "Ping", "Origin price", "res bal", "Type name", "ZIP" ];

    return(
        <div>
            {info === undefined ? (
                <div className="info_card-wrapper">
                    <div className="info_card-analitic">
                        <div className="card text-white bg-danger mb-3" style= {{maxWidth: "18rem"}}>
                            <div className="card-header">Check user to see payment of user and try again</div>
                        </div>
                    </div>
                </div>
                ):(
                <div className="table_wrapper">
                    <table style={{width: "70%"}} className="table table-striped table-dark">
                        <thead>
                            <tr >{header.map((h, i) => <th style={{textAlign: "center"}} scope="col" key={i}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                        {info.map((k, i) => {
                            return (
                            <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{k.id}</td>
                                <td style={{textAlign: "center"}}> {k.type_pay}</td>
                                <td style={{textAlign: "center"}}>{k.account}</td>
                                <td style={{textAlign: "center"}}>{k.date}</td>
                                <td style={{textAlign: "center"}}>{k.ammount.toFixed(2)}</td>
                                <td style={{textAlign: "center"}}>{k.buyer}</td>
                                <td style={{textAlign: "center"}}>{k.city}</td>
                                <td style={{textAlign: "center"}}>{k.id_proxy}</td>
                                <td style={{textAlign: "center"}}>{k.region}</td>
                                <td style={{textAlign: "center"}}>{k.ping}</td>
                                <td style={{textAlign: "center"}}>{k.origin_price}</td>
                                <td style={{textAlign: "center"}}>{k.res_balance.toFixed(2)}</td>
                                <td style={{textAlign: "center"}}>{k.typename}</td>
                                <td style={{textAlign: "center"}}>{k.zip}</td>
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

export default UserPays;