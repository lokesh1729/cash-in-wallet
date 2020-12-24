import React from "react";
import ReactModal from "react-modal";
import Button from "./components/button";

export function CashInModal({ cashInModalOpen, changeCashIn, toggleCashIn }) {
    return (
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
                    className="input w-32 mb-8 text-2xl"
                />
                <Button buttonText="Add CashIn ↓" onClick={toggleCashIn} />
            </div>
        </ReactModal>
    );
}
