import React, { useState } from "react";
import ReactModal from "react-modal";
import { CASH_IN } from "./Actions";
import Button from "./components/button";

export default function CashInModal({
    cashInModalOpen,
    cashDispatch,
    toggleCashIn,
}) {
    const [cashIn, changeCashIn] = useState(0);
    const [cashInComment, changeCashInComment] = useState("");
    function addCashIn() {
        cashDispatch({
            type: CASH_IN,
            amount: cashIn,
            comment: cashInComment,
        });
        toggleCashIn();
    }
    function resetState() {
        changeCashIn(0);
        changeCashInComment("");
    }
    return (
        <ReactModal
            className="ReactModal"
            isOpen={cashInModalOpen}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={toggleCashIn}
            onAfterOpen={resetState}
        >
            <div className="h-full flex flex-col justify-center items-center">
                <input
                    min={0}
                    defaultValue={0}
                    onChange={(event) =>
                        changeCashIn(parseInt(event.target.value))
                    }
                    type="number"
                    className="input w-32 mb-8 text-2xl"
                />
                <input
                    type="text"
                    className="input w-64 mb-8 text-xl"
                    placeholder="enter comment (optional)"
                    onChange={(event) =>
                        changeCashInComment(event.target.value)
                    }
                />
                <Button buttonText="Add CashIn ↓" onClick={addCashIn} />
            </div>
        </ReactModal>
    );
}
