import React, { useState } from "react";
import { Container, Button } from "reactstrap";

import { buttonsQIWI, buttonsCard } from "./data";
import Label from "./label.component";
import CheckQiwi from "./modal_qiwi.component";
import CheckModal from "./modal_card.component";

import "./donate.css";

import bitcoin from "./img/bitcoin.png";
import ether from "./img/ethr.png";
import dash from "./img/dash.png";
import lite from "./img/lite.png";
import doge from "./img/doge.png";
import visa from "./img/visa.png";
import qiwi from "./img/qiwi.png";
import yandex from "./img/yandex.png";

import proxyService from "../../services/proxy.service";

export default function Donate() {

  const [services] = useState(new proxyService())

  const [checkQiwi, setCheckQiwi] = useState(null);
  const [checkCard, setCheckCard] = useState(null);

  const [qiwiValue, setqiwiValue] = useState("");
  const [cardValue, setCardValue] = useState("");
  const [cryptoValue, setCryptoValue] = useState("");
  const [isLabel, setIsLabel] = useState({
    id: "",
    type: "",
    value: "",
  });
  const handlerQIWi = (e) => {
    let newMsg = e.currentTarget.value;
    setqiwiValue(newMsg.replace(/[^0-9]/g, ""));
  };

  const handlerCard = (e) => {
    let newMsg = e.currentTarget.value;
    setCardValue(newMsg.replace(/[^0-9]/g, ""));
  };

  const handlerCrypto = (e) => {
    let newMsg = e.currentTarget.value;
    setCryptoValue(newMsg.replace(/[^0-9]/g, ""));
  };

  const onClickHandlerQiwi = (e) => {
    let click = e.currentTarget.id;
    const value = e.currentTarget.value;
    setIsLabel({
      id: click,
      type: "Qiwi",
      value,
    });
  };
  const onClickHandlerCard = (e) => {
    let click = e.currentTarget.id;
    const value = e.currentTarget.value;
    setIsLabel({
      id: click,
      type: "Card",
      value,
    });
  };

  const payCrypto = () => {
    services.getCrypto(cryptoValue)
      .then((response) => {
        window.open(response);
      })
  }

  const payCard = () => {
    setCheckCard(true)
    services.getCard(cardValue, isLabel.value)
      .then((response) => {
        setCheckCard(response.order_id)
        window.open(response.url);
      })
  }

  const payQiwi = () => {
    setCheckQiwi(true)
    services.getQiwi(qiwiValue, isLabel.value)
      .then((response) => {
        setCheckQiwi(response.order_id)
        window.open(response.url);
      }) 
  }

  return (
    <Container>
      <div className="wrapper">
        <div className="donat-header">Donate</div>
        <hr style={{ margin: "0" }} />
        <div className="donat-body">
          <div className="qiwi-wrapper donat-card">
            <div className="donat-card_header">Qiwi/Yandex</div>
            {buttonsQIWI.map((item, index) => {
              if (item.emoji === null)
                return (
                  <Button
                    color="info"
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    onClick={onClickHandlerQiwi}
                    className="donate-btn_country"
                  >
                    {item.name}
                    {item.type === isLabel.type && item.id === isLabel.id ? (
                      <Label />
                    ) : (
                      ""
                    )}
                  </Button>
                );
              return (
                <Button
                  color="info"
                  key={item.id}
                  id={item.id}
                  onClick={onClickHandlerQiwi}
                  className="donate-btn_country"
                  value={item.value}
                >
                  {item.name}
                  <span role="img" aria-label={item.name}>
                    {item.emoji}
                  </span>
                  {item.type === isLabel.type && item.id === isLabel.id ? (
                    <Label />
                  ) : (
                    ""
                  )}
                </Button>
              );
            })}
            <div className="label">amount</div>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={qiwiValue}
              onChange={handlerQIWi}
              className="donat-input"
            ></input>
            <Button 
              color="success" 
              className="donate-btn"
              onClick={payQiwi}
            >
              Pay
            </Button>
            <CheckQiwi cardVerify={checkQiwi}/>
            <img src={qiwi} alt="qiwi" className="donate-img"></img>
            <img src={yandex} alt="yandex" className="donate-img"></img>
          </div>

          <div className="card-wrapper donat-card">
            <div className="donat-card_header">Card</div>
            {buttonsCard.map((item, index) => {
              return (
                <Button
                  color="info"
                  key={item.id}
                  id={item.id}
                  placeholder="0"
                  value={item.value}
                  className="donate-btn_country"
                  onClick={onClickHandlerCard}
                >
                  {item.name}
                  <span role="img" aria-label={item.name}>
                    {item.emoji}
                  </span>
                  {item.type === isLabel.type && item.id === isLabel.id ? (
                    <Label />
                  ) : (
                    ""
                  )}
                </Button>
              );
            })}

            <div className="label">amount</div>
            <input
              type="number"
              min="0"
              value={cardValue}
              placeholder="0"
              onChange={handlerCard}
              className="donat-input"
            ></input>
            <Button 
              color="success" 
              className="donate-btn"
              onClick={payCard}  
            >
              Pay
            </Button>
            <CheckModal cardVerify={checkCard}/>
            <img src={visa} alt="visa" className="donate-img"></img>
          </div>

          <div className="cryptocurrensy-wrapper donat-card">
            <div className="donat-card_header">Cryptocurrency</div>
            <div className="label">amount</div>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={cryptoValue}
              onChange={handlerCrypto}
              className="donat-input"
            ></input>
            <Button 
              color="success" 
              className="donate-btn"
              onClick={payCrypto}>
              Pay
            </Button>
            <div className="img-wrapper">
              <img src={bitcoin} alt="bitcoin" className="donate-img"></img>
              <img src={ether} alt="etherium" className="donate-img"></img>
              <img src={dash} alt="dash" className="donate-img"></img>
              <img src={doge} alt="doge" className="donate-img"></img>
              <img src={lite} alt="lite" className="donate-img"></img>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
