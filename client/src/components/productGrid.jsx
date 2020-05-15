import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { EuiFlexGroup } from "@elastic/eui";
import Spinner from "./spinner";
import Card from "./product";

const ProductGrid = (props) => {
  return (
    <div className="container">
      <InfiniteScroll
        dataLength={props.products.length}
        next={props.onFetchRequest}
        hasMore={true}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="productGrid">
          {props.products.map((product) => (
            <Card item={product} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductGrid;
