import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { Header } from "../../components/Header";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    getOrdersData();
  }, []);
  return (
    <>
      <title>Tracking Page</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>
          {orders.map((order) => {
            return (
              <>
                <div key={order.id}>{order.id}</div>
                {order.products.map((orderProduct) => {
                  return (
                    <Fragment key={orderProduct.productId}>
                      <div className="delivery-date">
                        {dayjs(
                          orderProduct.product.estimatedDeliveryTimeMs
                        ).format("dddd, MMMM D")}
                      </div>
                      <div className="product-info">
                        {orderProduct.product.name}
                      </div>
                      <div className="product-info">
                        Quantity: {orderProduct.quantity}
                      </div>
                      <img
                        className="product-image"
                        src={orderProduct.product.image}
                      />
                    </Fragment>
                  );
                })}
              </>
            );
          })}
          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
