import React, { Component } from "react";
import { countries, } from "./countries";

import proxyService from "../../services/proxy.service";
import Spinner from "../spinner/spinner.component";

import "./landPost.css";

import Agree from "./agree.component";

export default class LandPost extends Component {
  proxyService = new proxyService();

  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }

  state = {
    itemList: null,
    filterListValue: "",
  };

  componentDidMount() {
    const arrayItems = countries.map((item, index) => {
      return {country: item.country, emoji: item.emoji, post_code: item.post, region: item.region, id: index++}
    })

    let filterLand = []
    arrayItems.map(item => {
      if (this.props.getLand === item.region){
        filterLand.push(item)
      }
      return item
    })
    
    filterLand.map((item) => {
        this.setState({
          itemList: filterLand,
        })
        return item
    })
    /* this.proxyService.getLand(this.props.getLand).then((items) => {
      console.log(items)
      if (Array.isArray(items)) {
        const arrayItems = items.map((item, index) => {
          return { country: item, post_code: item, id: index++ };
        });
        this.setState({
          itemList: arrayItems,
        });
      } else {
        const objectItems = Object.entries(items).map(([key, value], index) => {
          const regEx = /[^a-zA-Z]/g;
          return {
            country: key.replace(regEx, ""),
            post_code: value,
            id: index++,
          };
        });
        this.setState({
          itemList: objectItems,
        });
      }
    }); */
  }

  renderItems() {
    return this.state.itemList.map((item) => {
      const { id, country, post_code, emoji } = item;
      return (
        <div
          key={id}
          className={`list__item ${
            this.props.land === post_code && "selected"
          }`}
          postcode={post_code}
          onClick={(e) => {
            if (this.props.land === post_code) {
              this.props.setLand();
              return;
            }
            this.props.setLand(e.target.getAttribute("postcode"));
          }}
        >
          {`${country} ${emoji}`}
          {this.props.land === post_code && <Agree />}
        </div>
      );
    });
  }

  render() {
    if (!this.state.itemList) {
      return <Spinner />;
    }

    return  (
      <div className="land_wrapper">
        {/* <input 
          placeholder="Search land" 
          type="text" 
          style={{marginLeft: "80px"}}
          value={this.state.filterListValue}
          onChange={(e) => this.setState({filterListValue: e.target.value})}
        /> */}
        <div className="list">{this.renderItems()}</div>
      </div>
    );
  }
}
