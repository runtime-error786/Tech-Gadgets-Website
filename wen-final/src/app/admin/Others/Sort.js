import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SortAction } from "@/Redux/Action";

const SortControls = () => {
    const SortUser = useSelector((state) => state.SortUser);
    const dispatch = useDispatch();

    let Sortitem = (e)=>{
        console.log(!SortUser)
        dispatch(SortAction(!SortUser))
    }
    return (
        <button onClick={Sortitem} className="sort-button">
            {SortUser ? "Sort Descending" : "Sort Ascending"}
        </button>
    );
};

export default SortControls;
