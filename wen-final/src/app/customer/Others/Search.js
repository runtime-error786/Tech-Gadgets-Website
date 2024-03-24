import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SearchAction } from "@/Redux/Action";

const SearchBar = () => {
    const SearchUser1 = useSelector((state) => state.SearchUser);
    const dispatch = useDispatch();
    const Showsearch = useSelector((state) => state.Showsearch);

    let setSearchTerm = (e) => {
        dispatch(SearchAction(e))
    }

    return (
        Showsearch ? (
            <div className="text-center f1">
                <input
                    type="text"
                    value={SearchUser1}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Explore E-Mart"
                    className="form-control"
                />
            </div>
        ) : null
    );
};

export default SearchBar;
