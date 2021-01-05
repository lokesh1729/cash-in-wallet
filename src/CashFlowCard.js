import React from "react";
import { CASH_IN } from "./Actions";

export default function CashFlowCard({
    createdDate,
    comment,
    amount,
    transactionType,
    balance,
}) {
    return (
        <div className="cardContainer">
            <div className="flexWithBorderPadding">
                <div className="flex-40p">
                    <span className="graySmallSemiboldFont">{createdDate}</span>
                    <p className="boldText cashFlowDetails text-gray-900">
                        {comment}
                    </p>
                </div>
                <span
                    className={`flex-40p text-sm ${
                        transactionType === CASH_IN
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {amount}
                </span>
                <span className="flex-20p cashFlowDetails boldText">
                    {balance}
                </span>
            </div>
        </div>
    );
}
