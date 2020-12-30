import React, { useReducer, useState } from "react";
import ReactModal from "react-modal";
import { CASH_IN, CASH_OUT } from "./Actions";
import "./App.css";
import CashFlowDetails from "./CashFlowDetails";
import CashInModal from "./CashInModal";
import CashOutModal from "./CashOutModal";
import Button from "./components/button";

function cashReducer(state, action) {
    const result = {
        comment: action.comment,
        amount: action.amount,
        transactionType: action.type,
        createdDate: new Date(),
    };
    switch (action.type) {
        case CASH_IN:
            return [
                {
                    ...result,
                    balance:
                        state.length === 0
                            ? action.amount
                            : state[0].balance + action.amount,
                    totalCashIn:
                        state.length === 0
                            ? action.amount
                            : state[0].totalCashIn + action.amount,
                    totalCashOut: state.totalCashOut,
                },
                ...state,
            ];
        case CASH_OUT:
            return [
                {
                    ...result,
                    balance:
                        state.length === 0
                            ? action.amount
                            : state[0].balance - action.amount,
                    totalCashOut:
                        state.length === 0
                            ? action.amount
                            : state[0].totalCashOut + action.amount,
                    totalCashIn: state.totalCashIn,
                },
                ...state,
            ];
        default:
            throw new Error();
    }
}

function App() {
    const [cashInModalOpen, _toggleCashInModal] = useState(false);
    const [cashOutModalOpen, _toggleCashOutModal] = useState(false);
    const [transactions, cashDispatch] = useReducer(cashReducer, []);
    function toggleCashInModal() {
        _toggleCashInModal(!cashInModalOpen);
    }
    function toggleCashOutModal() {
        _toggleCashOutModal(!cashOutModalOpen);
    }
    return (
        <div className="flex flex-col justify-start w-screen h-screen bg-gray-200">
            <div className="flex flex-row justify-center bg-white my-8 py-4">
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
            <p className="boldText text-3xl text-center bg-white py-4 my-4">
                Balance: {transactions.length > 0 ? transactions[0].balance : 0}
            </p>
            <CashFlowDetails transactions={transactions} />
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

ReactModal.setAppElement("#root");

export default App;
