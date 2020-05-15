import React from "react";

import { EuiCard, EuiFlexItem, EuiText } from "@elastic/eui";

const Card = (props) => (
  <EuiFlexItem>
    <EuiCard
      style={{ width: "18rem", margin: "5px" }}
      textAlign="left"
      image={
        <div>
          <img src={props.item.media.standard[0].url} alt="" />
        </div>
      }
      title={
        <EuiText>
          <h3>{props.item.name}</h3>
        </EuiText>
      }
      footer={
        <EuiText>
          <h4>{props.item.price.offer_price.value}</h4>
        </EuiText>
      }
    />
  </EuiFlexItem>
);

export default Card;
