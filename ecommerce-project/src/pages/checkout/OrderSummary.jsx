import { CartItemDetails } from "./cartItemDetails";

export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div>
                <CartItemDetails cartItem={cartItem} deliveryOptions={deliveryOptions} selectedDeliveryOption={selectedDeliveryOption} />
              </div>

            </div>
          );
        })}
    </div>
  );
}
