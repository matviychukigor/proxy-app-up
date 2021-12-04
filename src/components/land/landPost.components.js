import React, { Component } from "react";

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
  };

  componentDidMount() {
    this.proxyService.getLand(this.props.getLand).then((items) => {
      
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
    });
  }

  renderItems() {
    return this.state.itemList.map((item) => {
      const { id, country, post_code } = item;
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
          {country}
          {this.props.land === post_code && <Agree />}
        </div>
      );
    });
  }

  render() {
    if (!this.state.itemList) {
      return <Spinner />;
    }

    return <div className="list">{this.renderItems()}</div>;
  }
}
