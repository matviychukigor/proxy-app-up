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
                    {info.reverse().map((k, i) => {
                    return(
                    <div key={i} className="test_wrapper">
                        <div  className="card">
                            <div className="container_card">
                                <div className="conteoner_title">
                                    <div className="label_text">№:</div>
                                    <div className="label_text">ID:</div>
                                    <div className="label_text">Type pay:</div>
                                    <div className="label_text">Account:</div>
                                    <div className="label_text">Date:</div>
                                    <div className="label_text">Amount:</div>
                                    <div className="label_text">Buyer:</div>
                                    <div className="label_text">City:</div>
                                    <div className="label_text">ProxyID:</div>
                                    <div className="label_text">Region:</div>
                                    <div className="label_text">Ping:</div>
                                    <div className="label_text">Origin price:</div>
                                    <div className="label_text">Res bal:</div>
                                    <div className="label_text">Type name:</div>
                                    <div className="label_text">ZIP:</div>
                                </div>

                                <div className="conteoner_proxy">
                                    <div className="proxy_text">{i+1}</div>
                                    <div className="proxy_text">{k.id}</div>
                                    <div className="proxy_text">{k.type_pay}</div>
                                    <div className="proxy_text">{k.account}</div>
                                    <div className="proxy_text">{`${k.date.split("T")[0]} ${k.date.split("T")[1].slice(0, -7)}`}</div>
                                    <div className="proxy_text">{k.ammount.toFixed(2)}</div>
                                    <div className="proxy_text">{k.buyer}</div>
                                    <div className="proxy_text">{k.city}</div>
                                    <div className="proxy_text">{k.id_proxy}</div>
                                    <div className="proxy_text">{k.region}</div>
                                    <div className="proxy_text">{k.ping}</div>
                                    <div className="proxy_text">{k.origin_price}</div>
                                    <div className="proxy_text">{k.res_balance.toFixed(2)}</div>
                                    <div className="proxy_text">{k.typename}</div>
                                    <div className="proxy_text">{k.zip}</div>
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

export default UserPays;