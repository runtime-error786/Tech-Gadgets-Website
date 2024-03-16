"use client"
import React, { useState, useEffect } from "react";
import "./Style.css";
import ReactPaginate from 'react-paginate';
import SearchBar from '../Others/Searchbar';
import SortControls from '../Others/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAction, ShowAllProd, SortAction } from "@/Redux/Action";
import Pagination from "../Others/Paging";
import { NextPage } from "@/Redux/Action";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ProdTable = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [nameError, setNameError] = useState(false);
    const [companyError, setCompanyError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [priceError, setPriceError] = useState(false);

    const UpdateProd = useSelector((state) => state.Record);
    const SearchUser = useSelector((state) => state.SearchUser);
    const SortUser = useSelector((state) => state.SortUser);
    const currentPage = useSelector((state) => state.Next);
    const totalPageCount = useSelector((state) => state.Totalpage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ShowAllProd(SearchUser, SortUser, currentPage));
    }, [SearchUser, SortUser, currentPage]);

    useEffect(() => {
        dispatch(NextPage(0));
    }, [SearchUser, SortUser]);

    useEffect(() => {
        dispatch(NextPage(0));
        dispatch(SearchAction(""));
        dispatch(SortAction(false));
    }, []);

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setCompany(product.company);
        setCategory(product.category);
        setQuantity(product.quantity);
        setPrice(product.price);
        setNameError(false);
        setCompanyError(false);
        setCategoryError(false);
        setQuantityError(false);
        setPriceError(false);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setNameError(false);
                break;
            case 'company':
                setCompanyError(false);
                break;
            case 'category':
                setCategoryError(false);
                break;
            case 'quantity':
                setQuantityError(false);
                break;
            case 'price':
                setPriceError(false);
                break;
            default:
                break;
        }

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'company':
                setCompany(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'quantity':
                setQuantity(value);
                break;
            case 'price':
                setPrice(value);
                break;
            default:
                break;
        }
    };

    const handleSaveChanges = () => {
        if (!name || !name.trim()) {
            setNameError(true);
            return;
        }
        if (!company || !company.trim()) {
            setCompanyError(true);
            return;
        }
        if (!category || !category.trim()) {
            setCategoryError(true);
            return;
        }
        if (!quantity || parseFloat(quantity) < 0) {
            setQuantityError(true);
            return;
        }
        if (!price || parseFloat(price) < 0) {
            setPriceError(true);
            return;
        }

        console.log("Edited Product:", { name, company, category, quantity, price });
        setShowPopup(false);
    };

    return (
        <>
            <div id="container">
                <h1 style={{ textAlign: "center" }}>Update Products</h1>
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
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UpdateProd.map((UpdateProd) => {
                                return (
                                    <React.Fragment key={UpdateProd.id}>
                                        <tr>
                                            <td>{UpdateProd.id}</td>
                                            <td>{UpdateProd.name}</td>
                                            <td>{UpdateProd.company}</td>
                                            <td>{UpdateProd.category}</td>
                                            <td>{UpdateProd.quantity}</td>
                                            <td>{UpdateProd.price}</td>
                                            <td>
                                                <button className="del2" onClick={() => handleUpdate(UpdateProd)}>
                                                    Update
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
                <Pagination />
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Product</h2>
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                    className={nameError ? 'error' : ''}
                                />
                            </label>
                            <label>
                                Company:
                                <input
                                    type="text"
                                    name="company"
                                    value={company}
                                    onChange={handleInputChange}
                                    className={companyError ? 'error' : ''}
                                />
                            </label>
                           
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={handleInputChange}
                                    className={quantityError ? 'error' : ''}
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={handleInputChange}
                                    className={priceError ? 'error' : ''}
                                />
                            </label>
                            <label>
                                Category:
                                <select
                                    name="category"
                                    value={category}
                                    onChange={handleInputChange}
                                    className={categoryError ? 'error' : ''}
                                >
                                    <option value="">Select Category</option>
                                    <option value="other">Other</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="desktop">Desktop</option>
                                    <option value="watch">Watch</option>
                                    <option value="tv">TV</option>
                                    <option value="others">Others</option>
                                </select>
                            </label>
                        </div>
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProdTable;
