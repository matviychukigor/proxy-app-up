import React, { useEffect, useState } from "react";
import proxyService from "../../services/proxy.service";

const InfoCard = () => {

    const [ infoSite, setInfoSite ] = useState({})
    const [ dayProfit, setDayProf ] = useState({})
    const [ monthProfit, setMonthProf ] = useState()
    const [ monthCount, setMonthCount ] = useState()
    const [ monthSum, setMonthSum ] = useState()

    useEffect(() => {
        const servise = new proxyService();
        servise.getStatistics()
        .then((response) => {
            setDayProf(response.day)
            setMonthProf(response.moon.profit.toFixed(2))
            setMonthSum(response.moon.sum_pays.toFixed(2))
            setMonthCount(response.moon.count.toFixed(2))
        });
        servise.getInfoForSite()
        .then((res) => {
            setInfoSite(res)
        })
    }, [])

    return(
        <div className="cardWrapper">
            <div className="card analitic_card text-white bg-success mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">Day profit: {dayProfit.profit}$, sum pays: {dayProfit.sum_pays === null ? "0" : dayProfit.sum_pays}$, count: {dayProfit.count}$</div>
            </div>
            <div className="card analitic_card text-white bg-info mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">Month profit: {monthProfit}$, sum pays: {monthSum}$, count: {monthCount}$</div>
            </div>
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