import React, { Component } from "react";

import proxyService from "../../services/proxy.service";

import Spinner from "../spinner/spinner.component";

import "../modal/modal.css";
import "./card.css"


export default class ShowProxy extends Component {
  proxyService = new proxyService();

  constructor(props) {
    super(props);
    this.state = {
      modalClass: "modal-closed",
      proxysList: false,
      sellProxy: null,
      error: false,
      disabled: false,
      not_found: false
    };
    this.modalOnRent = this.modalOnRent.bind(this);
    this.modalOnBuy = this.modalOnBuy.bind(this);
    this.modalClosed = this.modalClosed.bind(this);

    this.props.getSpinner(!this.state.proxysList);
    this.props.getDisable(!this.state.disabled);

    /* this.buyBtn = this.buyBtn.bind(this); */
  }

  componentDidMount() {
    console.log("SEARCH...");
    const { Zip, City, proxyLand, selectLand, typeIp, blacklist } = this.props;
    /* console.log("Zip: " + Zip + "City: " + City + "proxyland: " + proxyLand + "selectLand: " + selectLand + "typeIp: " + typeIp + "blacklist: " + blacklist) */
    this.proxyService
      .getContinent(proxyLand, typeIp, blacklist, City, Zip, selectLand)
      .then((proxys) => {
        if(proxys.error === 0){
          console.log(proxys);
          const prox = proxys.data;
          let proxyList = [];
          for (let i in prox) {
            proxyList.push({
              real_ip: prox[i].real_ip,
              domain: prox[i].domain,
              id: prox[i].id,
              city: prox[i].city,
              isp: prox[i].isp,
              speed: prox[i].speed,
              zip: prox[i].zip,
              region: prox[i].region,
              typename: prox[i].typename,
              price: prox[i].price.toFixed(2),
              rent_price: prox[i].rent_price.toFixed(2),
            });
          }
          this.setState({
            proxysList: proxyList,
          });
          this.props.getSpinner(!this.state.proxysList);
        }
        if(proxys.error === 5) {
          this.setState({not_found: true, disabled: true})
          this.props.getSpinner(false) 
        } 
        if(proxys.error > 0 && proxys.error !== 5) {
          this.setState({error: true, disabled: true})
          this.props.getSpinner(false) 
        } 
        
      })
      .catch((error) =>{
        this.setState({error: true, disabled: true})
        this.props.getSpinner(false)
      })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.clickBTN !== this.props.clickBTN) {
      this.setState({
        proxysList: null,
        error: false,
        not_found: false
      });
      this.componentDidMount();
    }
    return true;
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevProps) {
    let btn = true;
    if (btn !== nextProps.clickBTN) {
      btn = !btn;
    }
  }

  modalOnRent(ip) {
    this.setState({ modalClass: "modal-open" });
      this.proxyService.resellProxy(ip)
      .then((sell) => {
        if (sell.MESSAGE === "insufficient funds") {
          this.setState({ sellProxy: sell.MESSAGE });
        } else {
          this.setState({ sellProxy: sell.CART[0].value });
        }
      });
  }

  modalOnBuy(id) {
    this.setState({ modalClass: "modal-open" });
      this.proxyService.buyProxy(id).then((sell) => {
        if (sell.MESSAGE === "insufficient funds") {
          this.setState({ sellProxy: sell.MESSAGE });
        } else {
          this.setState({ sellProxy: sell.CART[0].value });
        }
      });
  }

  modalClosed() {
    this.setState({ modalClass: "modal-closed" });
    console.log("closed");
  }

  showSellProxy() {
    if (this.state.sellProxy === null) {
      return <Spinner />;
    } else if (this.state.sellProxy === "insufficient funds") {
      return <div>You don't have enought money!!!</div>;
    }
    return (
      <div>
        <span className="label">Your proxy: </span>
        <input
          className="sellIpInput"
          defaultValue={this.state.sellProxy}
        ></input>
      </div>
    ); /* "Your proxy: " + this.state.sellProxy; */
  }

  tableRender() {
    return this.state.proxysList.map((item) => {
      const {
        real_ip,
        domain,
        id,
        city,
        isp,
        speed,
        zip,
        region,
        typename,
        rent_price,
        price,
      } = item;

      return (
        <div className="card">
          <div className="container_card">
              <div className="conteoner_title">
                  <div className="label_text">IP:</div>
                  <div className="label_text">Domain:</div>
                  <div className="label_text">City:</div>
                  <div className="label_text">ISP:</div>
                  <div className="label_text">Speed:</div>
                  <div className="label_text">ZIP:</div>
                  <div className="label_text">Region:</div>
                  <div className="label_text">Type:</div>
              </div>

              <div className="conteoner_proxy">
                  <div className="proxy_text">{real_ip}</div>
                  <div className="proxy_text">{domain}</div>
                  <div className="proxy_text">{city}</div>
                  <div className="proxy_text">{isp}</div>
                  <div className="proxy_text">{speed}</div>
                  <div className="proxy_text">{zip}</div>
                  <div className="proxy_text">{region}</div>
                  <div className="proxy_text">{typename}</div>
              </div>
              
          </div>
          <hr style={{color: "#fff", height: "2px", margin: "5px"}}/>
          <div className="card_btn">
              <div className="btn_buy">
                  <div className="label_text buy">Buy</div>
                  <button
                    type="button" 
                    class="btn btn-primary"
                    onClick={() => {
                      this.modalOnRent(id);
                    }}
                  >
                  {rent_price}$
                  </button>
              </div>
              <div className="btn_buyBack">
                  <div className="label_text back">Buy back</div>
                  <button 
                    type="button" 
                    class="btn btn-primary"
                    onClick={() => {
                      this.modalOnBuy(id);
                    }}
                  >
                  {price}$
                  </button>
              </div>
          </div>
          <div id="myModal" className={this.state.modalClass}>
            <div className="modal-content">
              <span
                onClick={() => {
                  this.modalClosed();
                }}
                className="close"
              >
                &times;
              </span>
              <span className="closeText">{this.showSellProxy()}</span>
            </div>
          </div>
        </div>
        
      );
    });
  }

  render() {
    if(this.state.error === true){
      return (
        <div className="alert alert-danger alert-custom" role="alert">
          Please try later or try again
        </div>
      )
    }

    if(this.state.not_found === true){
      return (
        <div className="alert alert-warning alert-custom" role="alert">
          Sorry but for your query not found socks at now, please search other proxys
        </div>
      )
    }

    if (!this.state.proxysList) {
      return <Spinner />;
    }

    const items = this.tableRender();
    return (
      <div className="proxyWrapper custom_container">
        <div className="test_wrapper">
          {items}
        </div>
      </div>
    );
  }
}
