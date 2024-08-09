import logo from "./logo.svg";
import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import ThemeRoutes from "./ThemeRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ConnectionManager from "./utils/SoketConnection/ConnectionManager";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <ConnectionManager />
          <ThemeRoutes />
          <ToastContainer
            autoClose={2000}
            style={{ zIndex: "99999999999999" }}
          />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
