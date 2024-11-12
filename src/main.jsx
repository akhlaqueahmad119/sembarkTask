import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
