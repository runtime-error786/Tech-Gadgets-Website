
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
       
        <div className="text-center f1">
            <input type="text" value={SearchUser1}
            onChange={(e) => setSearchTerm(e.target.value)}  placeholder="Explore E-Mart" className="form-control" />
        </div>
    );
};

export default SearchBar;
