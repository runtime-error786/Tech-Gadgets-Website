import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SearchAction } from "@/Redux/Action";
const SearchBar = () => {
    const SearchUser1 = useSelector((state) => state.SearchUser);
    const dispatch = useDispatch();

    let setSearchTerm = (e)=>{
        dispatch(SearchAction(e))
    }

    return (
        <input
            type="text"
            placeholder="Search by name"
            value={SearchUser1}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
        />
    );
};

export default SearchBar;
