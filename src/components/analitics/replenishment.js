import React, {useEffect, useState} from "react";
import proxyService from "../../services/proxy.service";

const Replenishment = ({checkUser}) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        const servise = new proxyService();
        servise.getUserReplenishment(checkUser)
        .then((res) => {
            setInfo(res.data)
        })
    }, [checkUser])

    return(
        <div className="analitic_wrapper">
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
                    {info.reverse().map((k, i) => {
                    return(
                    <div key={i} className="test_wrapper">
                        <div  className="card">
                            <div className="container_card">
                                <div className="conteoner_title">
                                    <div className="label_text">ID:</div>
                                    <div className="label_text">merchant_id:</div>
                                    <div className="label_text">invoice_currency:</div>
                                    <div className="label_text">date:</div>
                                    <div className="label_text">invoice_amount:</div>
                                    <div className="label_text">invoice_id:</div>
                                    <div className="label_text">invoice_status:</div>
                                    <div className="label_text">order_id:</div>
                                </div>

                                <div className="conteoner_proxy">
                                    <div className="proxy_text">{k.id}</div>
                                    <div className="proxy_text invoice_id">{k.merchant_id === null ? "---" : k.merchant_id}</div>
                                    <div className="proxy_text">{k.invoice_currency === null ? "---" : k.invoice_currency}</div>
                                    <div className="proxy_text">{k.date_time.slice(0, -7)}</div>
                                    <div className="proxy_text">{k.invoice_amount}</div>
                                    <div className="proxy_text invoice_id">{k.invoice_id === null ? "---" : k.invoice_id}</div>
                                    <div className="proxy_text">{k.invoice_status === null ? "---" : k.invoice_status}</div>
                                    <div className="proxy_text">{k.order_id}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            )}
        </div>
    )
}

export default Replenishment;