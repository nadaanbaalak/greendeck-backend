import React, { Component } from "react";
import ProductGrid from "./productGrid";
import SidePanel from "./sidePanel";
import axios from "axios";

class Display extends Component {
  state = {
    products: [],
    productsCount: 12,
    skipCount: 0,
    filters: [],
    brandName: "",
    discountRange: [0, 100],
    inStock: false,
    startDate: null,
    endDate: null,
  };

  handleRangeChange = (value) => {
    this.setState({ discountRange: value });
  };

  handleSwitchChange = () => {
    this.setState({ inStock: !this.state.inStock });
  };

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

  handleBrandChange = (e) => {
    this.setState({ brandName: e.target.value });
  };

  handleFetch = async () => {
    try {
      const { filters, skipCount, productsCount } = this.state;
      const response = await axios.post("/api/products", {
        filters,
        skipCount,
        productsCount,
      });
      this.setState({
        products: [...this.state.products, ...response.data],
        skipCount: skipCount + productsCount,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleFilter = async () => {
    const {
      brandName,
      startDate,
      endDate,
      discountRange,
      inStock,
    } = this.state;

    let filters = [];
    filters.push({
      key: "similar_products.meta.avg_discount",
      value: [discountRange[0] / 100, discountRange[1] / 100],
      operator: "between",
    });

    if (brandName !== "") {
      filters.push({
        key: "brand.name",
        value: brandName,
        operator: "contains",
      });
    }

    if (inStock === true) {
      filters.push({
        key: "stock.available",
        value: inStock,
        operator: "equal",
      });
    }

    if (startDate !== null && endDate !== null) {
      filters.push({
        key: "created_at",
        value: [startDate, endDate],
        operator: "between",
      });
    }
    this.setState({ filters: filters });
    try {
      const { skipCount, productsCount } = this.state;
      const response = await axios.post("/api/products", {
        filters,
        skipCount,
        productsCount,
      });

      this.setState({
        products: [...response.data],
        skipCount: productsCount,
        filters: filters,
      });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    try {
      const { filters, skipCount, productsCount } = this.state;
      const response = await axios.post("/api/products", {
        filters,
        skipCount,
        productsCount,
      });
      console.log(response.data);
      this.setState({
        products: [...this.state.products, ...response.data],
        skipCount: this.state.skipCount + this.state.productsCount,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-2">
              <SidePanel
                onRangeChange={this.handleRangeChange}
                onSwitchChange={this.handleSwitchChange}
                onStartDateChange={this.handleStartDateChange}
                onEndDateChange={this.handleEndDateChange}
                onBrandChange={this.handleBrandChange}
                onClick={this.handleFilter}
                formData={this.state}
              />
            </div>
            <div className="col-md-10">
              <ProductGrid
                products={this.state.products}
                onFetchRequest={this.handleFetch}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
