import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import { CashInModal } from "./CashInModal";
import { CashOutModal } from "./CashOutModal";
import Button from "./components/button";

function App() {
    const [cashInModalOpen, toggleCashInModal] = useState(false);
    const [cashOutModalOpen, toggleCashOutModal] = useState(false);
    const [cashIn, changeCashIn] = useState(0);
    const [cashOut, changeCashOut] = useState(0);
    function toggleCashIn() {
        toggleCashInModal(!cashInModalOpen);
    }
    function toggleCashOut() {
        toggleCashOutModal(!cashOutModalOpen);
    }
    return (
        <div className="flex flex-col justify-start m-8">
            <Helmet>
                <title>
                    Cash In Wallet - An app to manage cash in your wallet
                </title>
            </Helmet>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row justify-between w-2/3">
                    <Button buttonText="Add Cash In ↓" onClick={toggleCashIn} />
                    <Button
                        buttonText="Add CashOut ↑"
                        onClick={toggleCashOut}
                        variant="danger"
                    />
                </div>
            </div>
            <p className="text-4xl text-black mt-8 text-center">
                Balance: {cashIn - cashOut}
            </p>
            <CashInModal
                cashInModalOpen={cashInModalOpen}
                changeCashIn={changeCashIn}
                toggleCashIn={toggleCashIn}
            />
            <CashOutModal
                cashOutModalOpen={cashOutModalOpen}
                changeCashOut={changeCashOut}
                toggleCashOut={toggleCashOut}
            />
        </div>
    );
}

export default App;
