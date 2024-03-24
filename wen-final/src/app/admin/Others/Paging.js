import React from "react";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage, Total } from "@/Redux/Action";
import {
    faCaretRight,faCaretLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            nextLabel= {<FontAwesomeIcon size="xl" icon={faCaretRight}></FontAwesomeIcon>}
            previousLabel={<FontAwesomeIcon size="xl" icon={faCaretLeft}></FontAwesomeIcon>}
            
            itemClassPrev={"prev"}
            itemClassNext={"next"}
        />
    );
};

export default Pagination;
