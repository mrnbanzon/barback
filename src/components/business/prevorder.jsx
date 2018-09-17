import React from "react";
import PrevOrderItem from "./prevorderitem.jsx";
import axios from "axios";
import styled from "styled-components";

// styled components for css styling
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ClickableWrapper = styled.button`
  border: none;
`;

const Image = styled.img`
  height: 200px;
`;

class PreviousOrders extends React.Component {
  state = {
    previousOrders: []
  };

  componentDidMount() {
    this.getPreviousOrders();
  }

  getPreviousOrders() {
    axios.get("http://localhost:7337/api/orders/complete").then(response => {
      var currentOderArray = Object.values(response.data);
      this.setState({
        previousOrders: currentOderArray
      });
      console.log("These are the previous orders: ", this.state.previousOrders);
    });
  }

  render() {
    return (
      <div className="previous-orders">
        <h2>Previous Orders</h2>
        <Container>
          <ul>
            {Object.keys(this.state.previousOrders).map(orders => {
              return (
                <div>
                  <h4>Order #{this.state.previousOrders[orders][0].OrderId}</h4>
                  {this.state.previousOrders[orders].map(orderDetails => {
                    return (
                      <div>
                        <div className="menu-item-image">
                          <Image src={orderDetails.MenuItem.imageUrl} />
                        </div>{" "}
                        <br />
                        <div className="menu-item-name">
                          {orderDetails.MenuItem.name}
                          <br />
                          Quantity: {orderDetails.quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </ul>
        </Container>
        {/* {this.state.previousOrders.map((order, index) => {
          return (
            <div className="previous-order-item" key={index}>
              <PrevOrderItem order={order} />
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default PreviousOrders;
