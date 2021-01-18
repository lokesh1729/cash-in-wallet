import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactModal from "react-modal";
import { INITIALIZE } from "./common/Actions";
import "./App.scss";
import CashFlowDetails from "./components/CashFlowDetails";
import CashInModal from "./components/CashInModal";
import CashOutModal from "./components/CashOutModal";
import Button from "./components/button";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import FilterTransactions from "./components/FilterTransactions";
import cashReducer from "./common/CashReducer";

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
            <div className="flex flex-row justify-center bg-white my-4 py-4">
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
            <FilterTransactions />
            <div className="text-base text-blue-500 text-center my-2">
                Showing {transactions.length} entries
            </div>
            <div className="flex flex-col bg-white w-full">
                <div className="text-sm text-gray-800 text-left mx-8 my-2">
                    * by default it shows only the current week transactions.
                    Apply filters to refine results.
                </div>
                <div className="flexWithBorderPadding">
                    <span className="highlight">
                        Total Cash In:{" "}
                        {transactions.length > 0
                            ? transactions[0].totalCashIn
                            : 0}
                    </span>
                    <span className="boldText text-2xl p-2">
                        Balance:{" "}
                        {transactions.length > 0 ? transactions[0].balance : 0}
                    </span>
                    <span className="highlight">
                        Total Cash Out:{" "}
                        {transactions.length > 0
                            ? transactions[0].totalCashOut
                            : 0}
                    </span>
                </div>
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
