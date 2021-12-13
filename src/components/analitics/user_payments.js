import React, {useState, useEffect} from "react";
import Spinner from "../spinner/spinner.component";

import proxyService from "../../services/proxy.service";

const UserPayments = () => {

    const [ payments, setPayments ] = useState([])
    const [ loading, setLoading ] = useState(true); 

    useEffect(() => {
        const servise = new proxyService()
        servise.getAllPayments()
        .then((res) => {
            setPayments(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }, [])

    return(
        <div className="analitic_wrapper">
            {loading ? (
                <Spinner/>
            ) : (
                <div className="table_wrapper">
                    {payments.reverse().map((k, i) => {
                    return(
                    <div key={i} className="test_wrapper">
                        <div  className="card">
                            <div className="container_card">
                                <div className="conteoner_title">
                                    <div className="payment_text">ID:</div>
                                    <div className="payment_text">merchant_id:</div>
                                    <div className="payment_text">invoice_id:</div>
                                    <div className="payment_text">invoice_amount:</div>
                                    <div className="payment_text">invoice_currency:</div>
                                    <div className="payment_text">invoice_status:</div>
                                    <div className="payment_text">order_id:</div>
                                    <div className="payment_text">date/time</div>
                                </div>

                                <div className="conteoner_proxy">
                                    <div className="payment_text">{k.id}</div>
                                    <div className="payment_text invoice_id">{k.merchant_id === null ? "---" : k.merchant_id }</div>
                                    <div className="payment_text invoice_id">{k.invoice_id === null ? "---" : k.invoice_id}</div>
                                    <div className="payment_text">{k.invoice_amount === null ? "---" : k.invoice_amount}</div>
                                    <div className="payment_text">{k.invoice_currency === null ? "---" : k.invoice_currency}</div>
                                    <div className="payment_text">{k.invoice_status === null ? "---" : k.invoice_status}</div>
                                    <div className="payment_text invoice_id">{k.order_id  === null ? "---" : k.order_id}</div>
                                    <div className="payment_text">{k.date_time.slice(0, -7)}</div>  
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

export default UserPayments;