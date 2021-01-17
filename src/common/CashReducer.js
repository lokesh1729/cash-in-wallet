import { CASH_IN, CASH_OUT, INITIALIZE } from "./Actions";

export default function cashReducer(state, action) {
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
