import React from "react";

const InfoCard = () => {
    return(
        <div className="cardWrapper">
            <div className="card text-white bg-danger mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">Header</div>
                <div className="card-body">
                    <h5 className="card-title">Danger card title</h5>
                    <p className="card-text">Some quick example text to </p>
                </div>
            </div>
            <div className="card text-white bg-warning mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">Header</div>
                <div className="card-body">
                    <h5 className="card-title">Danger card title</h5>
                    <p className="card-text">Some quick example text to </p>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">Header</div>
                <div className="card-body">
                    <h5 className="card-title">Danger card title</h5>
                    <p className="card-text">Some quick example text to </p>
                </div>
            </div>
            <div className="card text-white bg-success mb-3" style= {{maxWidth: "18rem"}}>
                <div className="card-header">Header</div>
                <div className="card-body">
                    <h5 className="card-title">Danger card title</h5>
                    <p className="card-text">Some quick example text to </p>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;