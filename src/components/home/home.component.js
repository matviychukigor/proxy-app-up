import React, { Component } from "react";
import { buttonsData, dropDownValueLeft, dropDownValueRight } from "./data";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Button,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
import LandPost from "../land/landPost.components";
import ShowProxy from "../showProxy/showProxy.component";
import SearchInput from "../land/input_search";

import searchimg from "../search-worldwide.png";
import logo from "../logo.png";

import proxyService from "../../services/proxy.service";

import "./home.css";

export default class Proxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      city: null,
      isp: null,
      speed: null,
      zip: null,
      region: null,
      typename: null,
      lands: [],
      showImg: true,
      clickBTN: false,
      disabledBtn: false,
      redirectState: null,
      searchProxy: false, //state який міняє картінку на спінер коли іде поіск проксі
      Zip: "all",
      City: "all",
      proxyLand: "europe",
      selectLand: "all",
      typeIp: "all",
      blacklist: "all",
      blacklistValue: "all",
      valueType: "Residential",
      typeIpValue: "all",
      serverError: false
    };
    this.toggle = this.toggle.bind(this);
    this.searchBtn = this.searchBtn.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateZIP = this.updateZIP.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
  }

  proxyService = new proxyService();

  componentDidMount() {
    document.title = "Home";
  }

  updateCity(e) {
    const term = e.target.value;
    term === ""
      ? this.setState({ City: "all" })
      : this.setState({ City: term });
  }

  updateZIP(e) {
    const term = e.target.value;
    term === "" ? this.setState({ Zip: "all" }) : this.setState({ Zip: term });
  }

  toggle(tab, land) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        proxyLand: land,
      });
    }
  }

  getSpinner(data) {
    if (data === true) {
      this.setState({ disabledBtn: true });
    }
    if (data === false) {
      this.setState({ disabledBtn: false });
    }
  }

  searchBtn(toogle) {
    if (this.state.searchProxy === toogle) {
      this.setState({
        showImg: false,
        clickBTN: !this.state.clickBTN,
        disabledBtn: true,
      });
    }
    const {
      blacklistValue,
      typeIpValue,
      selectLand,
      proxyLand,
      City,
      Zip,
      clickBTN,
    } = this.state;
    return (
      <ShowProxy
        getSpinner={this.getSpinner}
        clickBTN={clickBTN}
        blacklist={blacklistValue}
        typeIp={typeIpValue}
        selectLand={selectLand}
        proxyLand={proxyLand}
        City={City}
        Zip={Zip}
        getDisable={this.getSpinner}
      />
    );
  }

  setLand(data = "all") {
    this.setState({ selectLand: data });
  }

  setProxyLand(data = "europe"){
    this.setState({proxyLand: data})
  }

  render() {
    const proxList = this.searchBtn();

    return (
      <div className="home-wrapper">
        <img className="home-logo hide" src={logo} alt="search" />
        <Nav tabs>
          {buttonsData.map((item) => {
            return (
              <NavItem className="main_btn" key={item.id}>
                <Button
                  className="mr-2 btns"
                  active={this.state.activeTab === item.id}
                  onClick={() => {
                    this.setLand();
                    this.toggle(item.id, item.value);
                  }}
                >
                  {item.name}
                </Button>
              </NavItem>
            );
          })}
        </Nav>
        <SearchInput
          setLand={this.setLand.bind(this)}
          setProxyLand={this.setProxyLand.bind(this)}
        />
        <TabContent
          className="tabContent mb-3"
          activeTab={this.state.activeTab}
        >
          {buttonsData.map((item) => {
            return (
              <TabPane key={item.id} tabId={item.id}>
                <LandPost
                  setLand={this.setLand.bind(this)}
                  land={this.state.selectLand}
                  getLand={item.value}
                />
              </TabPane>
            );
          })}
        </TabContent>
        <div className="select-block">
          <UncontrolledButtonDropdown>
            <DropdownToggle caret className="typeIp">
              IP type - {this.state.typeIp}
            </DropdownToggle>
            <DropdownMenu>
              {dropDownValueLeft.map((item) => {
                return (
                  <DropdownItem
                    key={item.id}
                    value={item.value}
                    onClick={() =>
                      this.setState({
                        typeIpValue: item.value,
                        typeIp: item.name,
                      })
                    }
                  >
                    {item.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledButtonDropdown>
            <DropdownToggle caret className="typeIp">
              Blacklists - Show {this.state.blacklist}
            </DropdownToggle>
            <DropdownMenu>
              {dropDownValueRight.map((item) => {
                return (
                  <DropdownItem
                    key={item.id}
                    value={item.value}
                    onClick={() =>
                      this.setState({
                        blacklistValue: item.value,
                        blacklist: item.name,
                      })
                    }
                  >
                    {item.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          {/* <Button
            onClick={() => {
              this.propsTest();
            }}
          >
            Test
          </Button> */}
        </div>
        <Form>
          <Row form>
            {/* <Col md={6} sm={3}>
              <Label for="exampleCity">City</Label>
            </Col>
            <Col md={6} sm={3}>
              <Label for="exampleZip">Zip</Label>
            </Col> */}
            <Col md={4} sm={4} className="City">
              <FormGroup className="city-wrapper">
                <Input
                  key="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  id="City"
                  onChange={this.updateCity}
                />
              </FormGroup>
            </Col>
            <Col md={4} sm={4} className="ZIP">
              <FormGroup className="zip-wrapper">
                <Input
                  key="zip"
                  type="text"
                  name="zip"
                  id="Zip"
                  placeholder="Zip"
                  onChange={this.updateZIP}
                />
              </FormGroup>
            </Col>
            <Col md={3} sm={4} className="btn-wrapper">
              <Button
                className="btn-class"
                onClick={() => {
                  this.searchBtn(false);
                }}
                disabled={this.state.disabledBtn || this.state.serverError ? true : false}
              >
                Search Proxy
                {this.state.disabledBtn || this.state.serverError ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  " "
                )}
              </Button>
            </Col>
          </Row>
        </Form>
        
        {this.state.showImg && !this.state.showSpiner ? (
          <>
            <hr />
            <img
              className="search-label"
              style={{ width: "170px", display: "block", margin: "0 auto" }}
              src={searchimg}
              alt="search"
            ></img>
          </>
        ) : (
          <div>{proxList}</div>
        )}
      </div>
    );
  }
}
