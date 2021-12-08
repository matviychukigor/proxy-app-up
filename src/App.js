import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Header.css";

import ghost from "./ghost.ico"

import AuthService from "./services/auth.service";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Home from "./components/home/home.component";
import History from "./components/history/history.components";
import FAQ from "./components/faq/faq.component";
import Donate from "./components/donate/donate.component";
import Analitics from "./components/analitics/analitics";

import axios from "axios";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      disabled: false,
      role: null, 
      burger: true
    };
    this.refaundBalance = this.refaundBalance.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      if(user.role === "admin"){
        this.setState({
          role: "admin",
          currentUser: user,
        })
      } else {
        this.setState({
          currentUser: user,
        });
      }
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  refaundBalance() {
    this.setState({disabled: true})
    axios.get(process.env.REACT_APP_API_URL + "users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    })
    .then((response) => {
      localStorage.setItem("user_info", JSON.stringify(response.data));
      this.setState({disabled: false, currentUser: response.data})
    })
  }

  getCurrentUser(data) {
    console.log(data)
  }

  render() {
    const { currentUser, role, burger } = this.state;

    return (
      <div>
        <div className="area"></div>
        
        <nav className={burger ? "main-menu" : "main-menu main-menu-active"}>
        <img className="ico_phone-burger" src={ghost} alt="ghost"></img>
        <button onClick={() => {
              this.setState({burger: !burger})
              console.log(burger)
            }} className="icon">
              <i className="fa fa-bars"></i>
        </button>
          <div className="nav_phone">
            <img className="ico_phone" src={ghost} alt="ghost"></img>
            <div className="header_burger">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
          </div>
          <div className="navbar-nav mr-auto"></div>
          
          {currentUser ? (
            <div className="menu_element">
              
              <li className="logo_with_text">
                <div className="logo">
                <img className="ico" src={ghost} alt="ghost"></img>
                <span className="nav-text site_name">Ghost Proxy </span>
                </div>
              </li>
              
              <li>
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/home"} className="nav-text">
                  <i className="fa fa-search fa-2x"></i>
                  <span className="nav-text">Search proxy</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/history"} className="nav-text">
                  <i className="fa fa-book fa-2x"></i>
                  <span className="nav-text">History</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/donate"} className="nav-text">
                  <i className="fa fa-money fa-2x"></i>
                  <span className="nav-text">Donate</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/FAQ"} className="nav-text">
                  <i className="fa fa-question-circle fa-2x"></i>
                  <span className="nav-text">FAQ</span>
                </Link>
              </li>
              <li>
                  <i className="fas fa fa-user fa-2x user_detal-img"></i>
                    <span className="nav-text user_info">{currentUser.nickname} </span>
                    <span className="nav-text user_info">{currentUser.balance.toFixed(2)} $</span>
                    
              </li>
              <Button 
                className="updateBtn updateBtn_phone" 
                disabled={this.state.disabled}  
                onClick={this.refaundBalance}>
                  Update balance{this.state.disabled ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ): (
                    " "
                  )}
              </Button>
              <li>
                <a onClick={() => {this.setState({burger: !burger})}} href="https://t.me/GhostProxy_support"  rel="noopener noreferrer" target="_blank">
                  <i className="fa fa-telegram" aria-hidden="true"></i>
                  <span className="nav-text user_info">Support</span>
                </a>
              </li>
              {role === "admin" ? (
                <li>
                  <Link onClick={() => {this.setState({burger: !burger})}} to={"/Analitics"} className="nav-text">
                    <i className="fa fa-area-chart" aria-hidden="true"></i>
                    <span className="nav-text">Analitics</span>
                  </Link>
                </li>
              ) : (
                <div></div>
              )}
              <li className="logout_phone">
                <a href="/login" className="nav-text" onClick={this.logOut}>
                  <i className="fa fa-power-off fa-2x"></i>
                  <span className="nav-text">LogOut</span>
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/login"} className="nav-text">
                  <i className="fa fa-sign-in fa-2x"></i>
                  <span className="nav-text">Login</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/register"} className="nav-text">
                  <i className="fa fa-arrow-up fa-2x"></i>
                  <span className="nav-text">Sign Up</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => {this.setState({burger: !burger})}} to={"/FAQ"} className="nav-text">
                  <i className="fa fa-question-circle fa-2x"></i>
                  <span className="nav-text">FAQ</span>
                </Link>
              </li>
            </div>
          )}
          
        </nav>
        
        <div className="custom">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/history" component={History} />
            <Route exact path="/FAQ" component={FAQ} />
            <Route exact path="/donate" component={Donate} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/analitics" component={Analitics} />
          </Switch>
        </div>

        {/*<AuthVerify logOut={this.logOut}/> */}
        
      </div>
    );
  }
}

export default App;
