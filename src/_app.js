import { Outlet } from "react-router-dom";
import HeaderPage from "./components/HeaderPage";
import { Web3Provider } from "./context/web3Context";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div>
      <Web3Provider>
      <div>
        <HeaderPage />
      </div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
      </Web3Provider>
    </div>
  );
}