import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { Header } from "../../components/Header";
import dayjs from "dayjs";
import { useParams } from "react-router";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrders(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!orders) {
    return null;
  }

  const orderProduct = orders.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - orderProduct.orderTimeMs;
  /*  const timePassedMs = dayjs().valueOf() - orderProduct.orderTimeMs; */
  const timePassedMs = totalDeliveryTimeMs * 0.3;
 // For demonstration purposes, assuming 30% time has passed
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  console.log("deliveryPercent", deliveryPercent);
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Tracking Page</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png"></link>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>
          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on " : "Arriving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>
          <div className="product-info">{orderProduct.product.name}</div>
          <div className="product-info">Quantity: {orderProduct.quantity}</div>
          <img
            className="product-image"
            src={orderProduct.product.image}
            alt="Image of the product"
          />
          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
