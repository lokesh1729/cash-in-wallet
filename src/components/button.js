import React from "react";

export default function Button(props) {
    const { buttonText } = props;
    const { variant } = props;
    const { onClick } = props;
    return (
        <button
            className={variant === "danger" ? "btn-red" : "btn-blue"}
            type="button"
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
