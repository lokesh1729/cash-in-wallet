import React from "react";
import CashFlowCard from "./CashFlowCard";

export default function CashFlowDetails({ transactions }) {
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="cashFlowContainer">
                <div className="cashFlowCard">
                    <span className="cashFlowDetails flex-40p">Details</span>
                    <span className="cashFlowDetails flex-40p">Amount</span>
                    <span className="cashFlowDetails flex-20p">Balance</span>
                </div>
            </div>
            {transactions.map((transaction, index) => (
                <div className="mb-2 w-full" key={index}>
                    <CashFlowCard
                        // key={index}
                        createdDate={transaction.createdDate}
                        comment={transaction.comment}
                        amount={transaction.amount}
                        transactionType={transaction.transactionType}
                        balance={transaction.balance}
                    />
                </div>
            ))}
        </div>
    );
}
