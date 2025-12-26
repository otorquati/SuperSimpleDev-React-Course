import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import { TrackingPage } from "./pages/TrackingPage.jsx";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  {
    /* Obtendo dados do Carrinho de Compras */
  }
  useEffect(() => {
  axios.get("/api/cart-items").then((response) => {
    setCart(response.data);
  });
}, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}
export default App;
