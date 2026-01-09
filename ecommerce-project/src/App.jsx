import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage.jsx";
import { CheckoutPage } from "./pages/checkout/CheckoutPage.jsx";
import { OrdersPage } from "./pages/orders/OrdersPage.jsx";
import { TrackingPage } from "./pages/tracking/TrackingPage.jsx";
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx';
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  {
    /* Obtendo dados do Carrinho de Compras */
  }
  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };
    fetchAppData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path={`tracking/:orderId/:productId`} element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}
export default App;
