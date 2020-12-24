import React from "react";
import ReactModal from "react-modal";
import Button from "./components/button";

export function CashOutModal({
    cashOutModalOpen,
    changeCashOut,
    toggleCashOut,
}) {
    return (
        <ReactModal
            className="ReactModal"
            isOpen={cashOutModalOpen}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            onRequestClose={toggleCashOut}
        >
            <div className="h-full flex flex-col justify-center items-center">
                <input
                    min={0}
                    defaultValue={0}
                    type="number"
                    className="input w-32 mb-8 text-2xl"
                    onChange={(event) => changeCashOut(event.target.value)}
                />
                <Button
                    variant="danger"
                    buttonText="Add CashOut ↑"
                    onClick={toggleCashOut}
                />
            </div>
        </ReactModal>
    );
}
