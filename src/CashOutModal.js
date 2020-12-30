import React, { useState } from "react";
import ReactModal from "react-modal";
import { CASH_OUT } from "./Actions";
import Button from "./components/button";

export default function CashOutModal({
    cashOutModalOpen,
    cashDispatch,
    toggleCashOut,
}) {
    const [cashOut, changeCashOut] = useState(0);
    const [cashOutComment, changeCashOutComment] = useState("");
    function addCashOut() {
        cashDispatch({
            type: CASH_OUT,
            amount: cashOut,
            comment: cashOutComment,
        });
        toggleCashOut();
    }
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
                    onChange={(event) =>
                        changeCashOut(parseInt(event.target.value))
                    }
                />
                <input
                    type="text"
                    className="input w-64 mb-8 text-xl"
                    placeholder="enter comment (optional)"
                    onChange={(event) =>
                        changeCashOutComment(event.target.value)
                    }
                />
                <Button
                    variant="danger"
                    buttonText="Add CashOut ↑"
                    onClick={addCashOut}
                />
            </div>
        </ReactModal>
    );
}
