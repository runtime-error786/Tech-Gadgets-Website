import React from "react";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage, Total } from "@/Redux/Action";

const Pagination = () => {
    const currentPage = useSelector((state) => state.Next);
    const totalPageCount = useSelector((state) => state.Totalpage);
    const dispatch = useDispatch();

    const handlePageChange = ({ selected }) => {
        console.log("hello cureent",selected);
        dispatch(NextPage(selected));
    };

    return (
        <ReactPaginate
            pageCount={totalPageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage} 
            renderOnZeroPageCount={null}
            nextLabel="next >"
            previousLabel="< previous"
            containerClassName={"pagination"}
            activeClassName={"active"}
        />
    );
};

export default Pagination;
