"use client"
import React, { useState, useEffect } from "react";
import "./Style.css";
import ReactPaginate from 'react-paginate';
import SearchBar from '../Others/Searchbar';
import SortControls from '../Others/Sort';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ShowAllUser } from "@/Redux/Action";

const AdminTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0); 
    const [perPage] = useState(5); 
    const DelAdmin = useSelector((state) => state.DelAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ShowAllUser())
    }, []);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected); 
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:2001/DelAdmin/${id}`);
            console.log(`User with ID ${id} deleted successfully`);
            dispatch(ShowAllUser())
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const toggleSort = () => {
        setSortAscending(!sortAscending);
    };

    return (
        <div className="table-responsive">
            <h1 style={{ textAlign: "center" }}>Delete Admin</h1>
            <div className="table-controls" style={{ textAlign: "center" }}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SortControls sortAscending={sortAscending} toggleSort={toggleSort} />
            </div>
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

            <div className="pagination">
                <button onClick={() => handlePageChange('prev')} disabled={currentPage <= 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange('next')}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminTable;
