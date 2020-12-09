import React, { useState } from "react";
import ReactModal from "react-modal";
import "./App.css";
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
            <ReactModal
                className="ReactModal"
                isOpen={cashInModalOpen}
                shouldCloseOnOverlayClick
                shouldCloseOnEsc
            >
                <div className="h-full flex flex-col justify-center items-center">
                    <input
                        min={0}
                        defaultValue={0}
                        onChange={(event) => changeCashIn(event.target.value)}
                        type="number"
                        className="input w-36 mb-8"
                    />
                    <Button buttonText="Add CashIn ↓" onClick={toggleCashIn} />
                </div>
            </ReactModal>
            <ReactModal
                className="ReactModal"
                isOpen={cashOutModalOpen}
                shouldCloseOnOverlayClick
                shouldCloseOnEsc
            >
                <div className="h-full flex flex-col justify-center items-center">
                    <input
                        min={0}
                        defaultValue={0}
                        type="number"
                        className="input w-36 mb-8"
                        onChange={(event) => changeCashOut(event.target.value)}
                    />
                    <Button
                        buttonText="Add CashOut ↑"
                        onClick={toggleCashOut}
                    />
                </div>
            </ReactModal>
        </div>
    );
}

export default App;
