
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./_app";
import ReactDOM from 'react-dom/client';
import HomePage from "./pages/home";
import TransactionHistory from "./pages/transaction_history";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:subject",
        element: <HomePage />,
      },
      {
        path: "/history-transaction",
        element: <TransactionHistory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);