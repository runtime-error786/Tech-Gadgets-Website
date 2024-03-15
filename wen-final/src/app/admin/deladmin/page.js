"use client"
import React, { useState, useEffect } from "react";
import "./Style.css";
import ReactPaginate from 'react-paginate';
import SearchBar from '../Others/Searchbar';
import SortControls from '../Others/Sort';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ShowAllUser } from "@/Redux/Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../Others/Paging";
import { NextPage } from "@/Redux/Action";

const AdminTable = () => {
   
    const DelAdmin = useSelector((state) => state.DelAdmin);
    const SearchUser = useSelector((state) => state.SearchUser);
    const SortUser = useSelector((state) => state.SortUser);
    const currentPage = useSelector((state) => state.Next);
    const totalPageCount = useSelector((state) => state.Totalpage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ShowAllUser(SearchUser, SortUser,currentPage));
    }, [SearchUser, SortUser,currentPage]);

    useEffect(() => {
        dispatch(NextPage(0));
    }, [SearchUser,SortUser]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:2001/DelAdmin/${id}`, {
                withCredentials: true
            });

            console.log(`User with ID ${id} deleted successfully`);
            await dispatch(ShowAllUser(SearchUser, SortUser,currentPage))
            console.log("jhjh",DelAdmin);
            if(DelAdmin.length==1)
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
        <h1 style={{ textAlign: "center" }}>Delete Admin</h1>
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
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {DelAdmin.map((DelAdmin) => {
                        return (
                            <React.Fragment key={DelAdmin.id}>
                                <tr>
                                    <td>{DelAdmin.id}</td>
                                    <td>{DelAdmin.name}</td>
                                    <td>{DelAdmin.email}</td>
                                    <td>
                                        <button className="del1" onClick={() => handleDelete(DelAdmin.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4"><hr /></td>
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

export default AdminTable;
