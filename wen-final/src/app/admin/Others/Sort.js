import React from "react";

const SortControls = ({ sortAscending, toggleSort }) => {
    return (
        <button onClick={toggleSort} className="sort-button">
            {sortAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
    );
};

export default SortControls;
