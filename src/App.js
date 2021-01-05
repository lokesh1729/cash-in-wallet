import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactModal from "react-modal";
import { CASH_IN, CASH_OUT, INITIALIZE } from "./Actions";
import "./App.css";
import CashFlowDetails from "./CashFlowDetails";
import CashInModal from "./CashInModal";
import CashOutModal from "./CashOutModal";
import Button from "./components/button";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCZfP0suzdKmbsl_-YrOfmhTUXKdifg6hM",
    authDomain: "cash-in-wallet-a601a.firebaseapp.com",
    databaseURL: "https://cash-in-wallet-a601a-default-rtdb.firebaseio.com",
    projectId: "cash-in-wallet-a601a",
    storageBucket: "cash-in-wallet-a601a.appspot.com",
    messagingSenderId: "465348753",
    appId: "1:465348753:web:8dd9bef6f9e3689a1bb730",
    measurementId: "G-T2V3SSPVLR",
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

function cashReducer(state, action) {
    const result = {
        comment: action.comment,
        amount: action.amount,
        transactionType: action.type,
        createdDate: new Date().toDateString(),
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
                    totalCashOut:
                        state.length === 0 ? 0 : state[0].totalCashOut,
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
                    totalCashIn: state.length === 0 ? 0 : state[0].totalCashIn,
                },
                ...state,
            ];
        case INITIALIZE:
            return action.defaultItems;
        default:
            throw new Error("a valid action object is required");
    }
}

function App() {
    const [cashInModalOpen, _toggleCashInModal] = useState(false);
    const [cashOutModalOpen, _toggleCashOutModal] = useState(false);
    const [transactions, cashDispatch] = useReducer(cashReducer, []);
    const isFirstRun = useRef(true);
    function toggleCashInModal() {
        _toggleCashInModal(!cashInModalOpen);
    }
    function toggleCashOutModal() {
        _toggleCashOutModal(!cashOutModalOpen);
    }
    useEffect(() => {
        firebase
            .database()
            .ref("/transactions/")
            .once("value")
            .then((snapshot) => {
                const val = snapshot.val();
                if (val !== null) {
                    cashDispatch({
                        type: INITIALIZE,
                        defaultItems: val,
                    });
                }
            });
    }, []);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
        } else {
            firebase
                .database()
                .ref("/transactions/")
                .set(transactions)
                .then((data) => console.log(data));
        }
    }, [transactions]);
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
            <div className="flexWithBorderPadding justify-around bg-white w-full">
                <span className="highlight">
                    Total Cash In:{" "}
                    {transactions.length > 0 ? transactions[0].totalCashIn : 0}
                </span>
                <span className="boldText text-2xl p-2">
                    Balance:{" "}
                    {transactions.length > 0 ? transactions[0].balance : 0}
                </span>
                <span className="highlight">
                    Total Cash Out:{" "}
                    {transactions.length > 0 ? transactions[0].totalCashOut : 0}
                </span>
            </div>
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
