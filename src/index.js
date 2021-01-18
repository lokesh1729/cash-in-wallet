import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Helmet, HelmetProvider } from "react-helmet-async";

const app = (
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <title>
                    Cash In Wallet - An app to manage cash in your wallet
                </title>
            </Helmet>
            <App />
        </HelmetProvider>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
