import React, { useEffect, useState } from "react";
import proxyService from "../../services/proxy.service";

const InfoCard = () => {

    const [ infoSite, setInfoSite ] = useState({})

    useEffect(() => {
        const servise = new proxyService();
        servise.getInfoForSite()
        .then((res) => {
            setInfoSite(res)
        })
    }, [])

    return(
        <div className="cardWrapper">
            <div className="card analitic_card text-white bg-danger mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">All profit: {infoSite.all_profit}$</div>
            </div>
            <div className="card analitic_card text-white bg-warning mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">All count pays: {infoSite.all_count_pays}$</div>
            </div>
            <div className="card analitic_card text-white bg-primary mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">All donate: {infoSite.all_donate}$</div>
            </div>
        </div>
    )
}

export default InfoCard;