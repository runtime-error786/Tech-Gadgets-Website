import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import SearchBar from '../Others/Searchbar';
import SortControls from '../Others/Sort';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Picset, SearchAction, ShowAllProd, SortAction } from "@/Redux/Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../Others/Paging";
import { NextPage } from "@/Redux/Action";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import "./Style.css";

const Profpic = () => {
   
    const Profilepic = useSelector((state) => state.Profilepic);
    let dis = useDispatch();
    useEffect(()=>{
        dis(Picset());
    })
    return(
        <Image id="img1"  src={Profilepic} width={40} height={40} alt="Profile Picture" />
    )
};

export default Profpic;
