import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactModal from "react-modal";

export default function FilterModal({ isModalOpen, toggleModal }) {
    function resetState() {}

    return (
        <ReactModal
            className="ReactModal"
            isOpen={isModalOpen}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={toggleModal}
            onAfterOpen={resetState}
        >
            <div className="flex flex-col justify-start items-start mx-2 my-4">
                <div className="flex flex-row justify-start items-center pb-4 border-b border-solid border-gray-300 w-full">
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-base text-gray-500 cursor-pointer"
                        onClick={toggleModal}
                    />
                    <div className="text-base text-gray-900 font-medium ml-4 font-mono">
                        Filters
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}
