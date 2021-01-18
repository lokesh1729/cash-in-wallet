import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import ReactModal from "react-modal";
import { CASH_IN, CASH_OUT } from "../common/Actions";

export default function FilterModal({ isModalOpen, toggleModal }) {
    const cashInRef = useRef();
    const cashOutRef = useRef();
    const [isCashInClicked, setIsCashInClicked] = useState(false);
    const [isCashOutClicked, setIsCashOutClicked] = useState(false);

    function resetState() {}

    function toggleDisplay(event) {
        if (
            event.target.classList.contains("bg-gray-300") &&
            event.target.classList.contains("text-black")
        ) {
            event.target.classList.add("bg-indigo-500");
            event.target.classList.add("text-white");
            event.target.classList.remove("bg-gray-300");
            event.target.classList.remove("text-black");
        } else if (
            event.target.classList.contains("bg-indigo-500") &&
            event.target.classList.contains("text-white")
        ) {
            event.target.classList.add("bg-gray-300");
            event.target.classList.add("text-black");
            event.target.classList.remove("bg-indigo-500");
            event.target.classList.remove("text-white");
        }
    }

    function disableOtherDisplay(displayType) {
        if (displayType === CASH_IN) {
            cashInRef.current.classList.add("bg-gray-300");
            cashInRef.current.classList.add("text-black");
            cashInRef.current.classList.remove("bg-indigo-500");
            cashInRef.current.classList.remove("text-white");
            setIsCashInClicked(false);
        } else if (displayType === CASH_OUT) {
            cashOutRef.current.classList.add("bg-gray-300");
            cashOutRef.current.classList.add("text-black");
            cashOutRef.current.classList.remove("bg-indigo-500");
            cashOutRef.current.classList.remove("text-white");
            setIsCashOutClicked(false);
        }
    }

    return (
        <ReactModal
            className="FilterModal"
            isOpen={isModalOpen}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
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
                    <div className="mediumBoldBlack ml-4 font-mono">
                        Filters
                    </div>
                </div>
                <div className="mediumBoldBlack my-2">Date Range</div>
                <div className="flex flex-row justify-start items-center my-2">
                    <div className="normalBlack pr-2">From</div>
                    <input type="date" className="input w-40 h-12 p-2" />
                    <span className="normalBlack px-2">-</span>
                    <div className="normalBlack pr-2">To</div>
                    <input type="date" className="input w-40 h-12 p-2" />
                </div>
                <div className="mediumBoldBlack my-2">Show Only</div>
                <div className="flex flex-row justify-between items-center my-2">
                    <span
                        ref={cashInRef}
                        onClick={(event) => {
                            toggleDisplay(event);
                            setIsCashInClicked(!isCashInClicked);
                            disableOtherDisplay(CASH_OUT);
                        }}
                        className="bg-gray-300 w-20 text-sm text-black text-center font-medium rounded-2xl p-2 cursor-pointer"
                    >
                        Cash In
                    </span>
                    <span
                        ref={cashOutRef}
                        onClick={(event) => {
                            toggleDisplay(event);
                            setIsCashOutClicked(!isCashOutClicked);
                            disableOtherDisplay(CASH_IN);
                        }}
                        className="bg-gray-300 w-20 text-sm text-black text-center font-medium rounded-2xl p-2 ml-2 cursor-pointer"
                    >
                        Cash Out
                    </span>
                </div>
                <div className="mediumBoldBlack my-2">Sort Only</div>
                <div className="flex flex-row justify-between items-center my-2">
                    <input type="radio" id="sortByAscDate" name="sortBy" />
                    <label
                        htmlFor="sortByAscDate"
                        className="text-black text-base ml-2"
                    >
                        Old to New
                    </label>
                </div>
                <div className="flex flex-row justify-between items-center my-2">
                    <input type="radio" name="sortBy" id="sortByDescDate" />
                    <label
                        htmlFor="sortByDescDate"
                        className="normalBlack ml-2"
                    >
                        New to Old
                    </label>
                </div>
                <button className="btn-blue w-full my-2">Apply Filters</button>
            </div>
        </ReactModal>
    );
}
