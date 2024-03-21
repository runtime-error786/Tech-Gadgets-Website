import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SortAction } from "@/Redux/Action";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const SortControls = () => {
    const Sort = useSelector((state) => state.SortUser);
    const dispatch = useDispatch();

    const handleSortToggle = (event, newAlignment) => {
        dispatch(SortAction(!Sort))    
    }

    return (
        <div className="sort-controls">
            <ToggleButtonGroup
                color="primary"
                value={Sort ? "ascending" : "descending"}
                exclusive
                onChange={handleSortToggle}
                aria-label="Sorting"
            >
                <ToggleButton value="ascending">ASC</ToggleButton>
                <ToggleButton value="descending">DES</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default SortControls;
