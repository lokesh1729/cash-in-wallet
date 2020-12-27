import React, { useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { CASH_IN, CASH_OUT } from "./Actions";
import "./App.css";
import { CashInModal } from "./CashInModal";
import { CashOutModal } from "./CashOutModal";
import Button from "./components/button";

function cashReducer(state, action) {
    switch (action.type) {
        case CASH_IN:
            return {
                ...state,
                cashIn: { comment: action.comment, value: action.value },
            };
        case CASH_OUT:
            return {
                ...state,
                cashOut: { comment: action.comment, value: action.value },
            };
        default:
            throw new Error();
    }
}

function App() {
    const [cashInModalOpen, _toggleCashInModal] = useState(false);
    const [cashOutModalOpen, _toggleCashOutModal] = useState(false);
    const [totalCash, cashDispatch] = useReducer(cashReducer, {
        cashIn: { comment: "", value: 0 },
        cashOut: { comment: "", value: 0 },
    });
    function toggleCashInModal() {
        _toggleCashInModal(!cashInModalOpen);
    }
    function toggleCashOutModal() {
        _toggleCashOutModal(!cashOutModalOpen);
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
                    <Button
                        buttonText="Add Cash In ↓"
                        onClick={toggleCashInModal}
                    />
                    <Button
                        buttonText="Add CashOut ↑"
                        onClick={toggleCashOutModal}
                        variant="danger"
                    />
                </div>
            </div>
            <p className="text-4xl text-black mt-8 text-center">
                Balance: {totalCash.cashIn.value - totalCash.cashOut.value}
            </p>
            <CashInModal
                cashInModalOpen={cashInModalOpen}
                cashDispatch={cashDispatch}
                toggleCashIn={toggleCashInModal}
            />
            <CashOutModal
                cashOutModalOpen={cashOutModalOpen}
                cashDispatch={cashDispatch}
                toggleCashOut={toggleCashOutModal}
            />
        </div>
    );
}

export default App;
