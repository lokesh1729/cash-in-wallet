import {
    faFilter,
    faSearch,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FilterModal from "./FilterModal";

export default function FilterTransactions() {
    const [isModalOpen, _toggleModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    function toggleModal() {
        _toggleModal(!isModalOpen);
    }
    return (
        <div
            id="filterTransacionsWrapper"
            className="bg-white w-full my-2 py-2 flex flex-row justify-center"
        >
            <div className="flex flex-row justify-center items-center relative">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute text-sm text-gray-500 left-2"
                />
                <input
                    id="searchTransactions"
                    type="search"
                    value={searchTerm}
                    placeholder="Search"
                    className="w-80 h-10 pl-7 pr-8 py-3 appearance-none rounded leading-normal text-base text-gray-600 shadow-md mr-2"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                {searchTerm.length > 0 && (
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="absolute text-base text-gray-500 left-72 cursor-pointer"
                        onClick={() => setSearchTerm("")}
                    />
                )}
                <FontAwesomeIcon
                    icon={faFilter}
                    className="ml-2 text-blue-500 cursor-pointer"
                    onClick={toggleModal}
                />
                <FilterModal
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                />
            </div>
        </div>
    );
}
