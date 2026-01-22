import { DeliveryOptions } from "./DeliveryOptions";
import dayjs from "dayjs";
import { CartItemDetails } from "./cartItemDetails";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            });

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTime).format("MMMM D, YYYY")}
              </div>
              <div className="cart-item-details-grid">
                <CartItemDetails 
                cartItem={cartItem} 
                loadCart={loadCart} />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
