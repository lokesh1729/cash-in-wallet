import React from "react";
import CashFlowCard from "./CashFlowCard";

export default function CashFlowDetails({ transactions }) {
    return (
        <div className="flex flex-col justify-start items-center">
            <div className="cardContainer">
                <div className="flexWithBorderPadding">
                    <span className="graySmallSemiboldFont flex-40p">
                        Details
                    </span>
                    <span className="graySmallSemiboldFont flex-40p">
                        Amount
                    </span>
                    <span className="graySmallSemiboldFont flex-20p">
                        Balance
                    </span>
                </div>
            </div>
            <div className="h-48 md:h-64 lg:h-80 xl:h-96 2xl:h-108 w-full overflow-scroll">
                {transactions.map((transaction, index) => (
                    <div className="mb-2 w-full" key={index}>
                        <CashFlowCard
                            createdDate={transaction.createdDate}
                            comment={transaction.comment}
                            amount={transaction.amount}
                            transactionType={transaction.transactionType}
                            balance={transaction.balance}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
