"use client"
import React, { useState, useEffect } from "react";
import "./Style.css";
import ReactPaginate from 'react-paginate';
import SearchBar from '../Others/Searchbar';
import SortControls from '../Others/Sort';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAction, ShowAllProd, SortAction } from "@/Redux/Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../Others/Paging";
import { NextPage } from "@/Redux/Action";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ProdTable = () => {
   
    const DelProd = useSelector((state) => state.Record);
    const SearchUser = useSelector((state) => state.SearchUser);
    const SortUser = useSelector((state) => state.SortUser);
    const currentPage = useSelector((state) => state.Next);
    const totalPageCount = useSelector((state) => state.Totalpage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ShowAllProd(SearchUser, SortUser,currentPage));
    }, [SearchUser, SortUser,currentPage]);

    useEffect(() => {
        dispatch(NextPage(0));
    }, [SearchUser,SortUser]);

    useEffect(() => {
        dispatch(NextPage(0));
        dispatch(SearchAction(""));
        dispatch(SortAction(false))
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:2001/Delprod/${id}`, {
                withCredentials: true
            });

            console.log(`User with ID ${id} deleted successfully`);
            await dispatch(ShowAllProd(SearchUser, SortUser,currentPage))
            console.log("jhjh",DelProd);
            if(DelProd.length==1)
            {
                dispatch(NextPage(currentPage-1));
            }
        } catch (error) {
            toast.error("Your session expire");
        }
    };

    return (
        <>
        <div id="container">
        <h1 style={{ textAlign: "center" }}>Delete Products</h1>
            <div className="table-controls" style={{ textAlign: "center" }}>
                <SearchBar />
                <SortControls />
            </div>
        <div className="table-responsive">
            
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {DelProd.map((DelProd) => {
                        return (
                            <React.Fragment key={DelProd.id}>
                                <tr>
                                    <td>{DelProd.id}</td>
                                    <td>{DelProd.name}</td>
                                    <td>{DelProd.company}</td>
                                    <td>{DelProd.category}</td>
                                    <td>{DelProd.quantity}</td>
                                    <td>{DelProd.price}</td>
                                    <td>
                                        <button className="del1" onClick={() => handleDelete(DelProd.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="7"><hr /></td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>

            </table>
                   
        </div>
         <Pagination></Pagination>
         <ToastContainer />
         </div>
         </>
    );
};

export default ProdTable;
