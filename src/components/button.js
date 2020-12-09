import React from "react";

export default function Button(props) {
    const { buttonText } = props;
    const { variant } = props;
    return (
        <button
            className={variant === "danger" ? "btn-red" : "btn-blue"}
            type="button"
        >
            {buttonText}
        </button>
    );
}
