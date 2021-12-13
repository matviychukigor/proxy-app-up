import React, { Component } from "react";

import Spinner from "../spinner/spinner.component";

import proxyService from "../../services/proxy.service";

import logo from "../logo.png";
import ghost from "../../ghost.ico";

import "./history.css";
import "../modal/modal.css";
import "../showProxy/card.css"

export default class History extends Component {
  proxyService = new proxyService();

  constructor(props) {
    super(props);
    this.showHistory();
    this.modalOnRefaund = this.modalOnRefaund.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
  }

  state = {
    historyList: null,
    modalClass: "modal-closed",
    refaundProxy: null,
  };

  componentDidMount() {
    document.title = "History";
  }

  //Modal to ressel

  modalOnResell(ip) {
    console.log(ip)
    this.setState({ modalClass: "modal-open" });
      this.proxyService
      .prolong()
      .then((ref) => {
        console.log(ref);
        if(ref.error === 0){
          this.setState({ refaundProxy: ip });
        }
        if(ref.error > 0){
          this.setState({ refaundProxy: "please try again or later" });
        }
      })
      .catch((error) => {
        this.setState({ refaundProxy: "please try again or later" });
      });
  }

  modalClosed() {
    this.setState({ modalClass: "modal-closed" });
    console.log("closed");
  }

  showMsgResell() {
    if (this.state.refaundProxy === null) {
      return <Spinner />;
    }

    return (
      <div>
        <span className="label">Congradulation! Your proxy: </span>
        <input
          className="sellIpInput"
          defaultValue={this.state.refaundProxy}
        ></input>
        <span className="label"> is prolong</span>
      </div>
    );
  }

  //Finish ressel modal

  //Modal to refaund

  modalOnRefaund(ip) {}

  renderHistoryTable() {
    return this.state.historyList.map((item) => {
      const { date, city, typename, proxy, region, id, price } = item;

      return (
        <div key={id} className="card">
          <div className="container_card">
              <div className="conteoner_title">
                  <div className="label_text">Date:</div>
                  <div className="label_text">City:</div>
                  <div className="label_text">Type:</div>
                  <div className="label_text">Proxy:</div>
                  <div className="label_text">Region:</div>
                  <div className="label_text">Price:</div>
              </div>

              <div className="conteoner_proxy">
                  <div className="proxy_text">{date}</div>
                  <div className="proxy_text">{city}</div>
                  <div className="proxy_text">{typename}</div>
                  <div className="proxy_text">{proxy}</div>
                  <div className="proxy_text">{region}</div>
                  <div className="proxy_text">{price}$</div>
              </div>
              
          </div>
          <hr style={{color: "#fff", height: "2px", margin: "5px"}}/>
          <div className="card_btn">
              <div className="btn_buy">
                <div className="label_text buy">Prolong: </div>
                  <button
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      this.modalOnResell(proxy);
                    }}      
                  >
                  {price}$
                  </button>

                  <div id="myModal" className={this.state.modalClass}>
                  <div className="modal-content" style={{ width: "45%" }}>
                    <span
                      onClick={() => {
                        this.modalClosed();
                      }}
                      className="close"
                    >
                      &times;
                    </span>
                    <span className="closeText">{this.showMsgResell()}</span>
                  </div>

                </div>
              </div>
              <div className="btn_buyBack">
                  <div className="label_text back">Refaund: </div>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                  >
                  REFAUND
                  </button>
              </div>
          </div>
        </div>
      );
    });
  }

  showHistory() {
    this.proxyService
      .historyProxy()
      .then((history) => {
        let historyList = [];
        for (let i in history) {
          const date = history[i].date.substr(0, 19).split("T");
          historyList.push({
            city: history[i].city,
            date: date[0] + " " + date[1],
            typename: history[i].typename,
            proxy: history[i].proxy,
            region: history[i].region,
            id: history[i].id,
            price: history[i].ammount.toFixed(2),
          });
        }
        this.setState({
          historyList: historyList.reverse(),
        });
      })
      .catch((error) => {
        if (error) {
          window.location.assign("/login");
        }
      });
  }

  render() {
    if (!this.state.historyList) {
      return (
        <>
          <img
            style={{ display: "block", margin: "0 auto" }}
            src={logo}
            alt="search"
          ></img>
          <div>
            <Spinner />
          </div>
        </>
      );
    }

    const items = this.renderHistoryTable();
    return (
      <div className="historyWrapper">
        <img className="history-logo hide" src={logo} alt="search" />
        <img className="history-logo show_small-img" src={ghost} alt="search" />
        <div className="test_wrapper">
          {items}
        </div>
      </div>
    );
  }
}
