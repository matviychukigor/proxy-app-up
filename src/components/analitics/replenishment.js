import React, {useEffect, useState} from "react";
import proxyService from "../../services/proxy.service";

const Replenishment = ({checkUser}) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        const servise = new proxyService();
        servise.getUserReplenishment(checkUser)
        .then((res) => {
            console.log(res.data)
            setInfo(res.data)
        })
    }, [checkUser])

    const header = ["id","merchant_id", "invoice_currency", "date", "invoice_amount", "invoice_id", "invoice_status", "order_id" ];

    return(
        <div>
            {info === undefined ? (<div>Please check user to see payment of user</div>):(
                <div className="table_wrapper">
                    <table style={{width: "70%"}} className="table table-striped table-dark">
                        <thead>
                            <tr >{header.map((h, i) => <th style={{textAlign: "center", width: "60px"}} scope="col" key={i}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                        {info.map((k, i) => {
                            return (
                            <tr key={i}>
                                {/* <th scope="row">{i+1}</th> */}
                                <td>{k.id}</td>
                                <td style={{textAlign: "center"}}>{k.merchant_id === null ? "---" : k.merchant_id}</td>
                                <td style={{textAlign: "center"}}>{k.invoice_currency === null ? "---" : k.invoice_currency}</td>
                                <td style={{textAlign: "center"}}>{k.date_time}</td>
                                <td style={{textAlign: "center"}}>{k.invoice_amount}</td>
                                {/* <td style={{textAlign: "center"}}>{k.invoice_created}</td>
                                <td style={{textAlign: "center"}}>{k.invoice_currency}</td>
                                <td style={{textAlign: "center"}}>{k.invoice_expires}</td> */}
                                <td style={{textAlign: "center"}}>{k.invoice_id === null ? "---" : k.invoice_id}</td>
                                <td style={{textAlign: "center"}}>{k.invoice_status === null ? "---" : k.invoice_status}</td>
                                {/* <td style={{textAlign: "center"}}>{k.invoice_url}</td> */}
                                <td style={{textAlign: "center"}}>{k.order_id}</td>
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

export default Replenishment;