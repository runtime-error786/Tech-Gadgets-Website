"use client"

import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAction, ShowAllProdCus, SortAction } from "@/Redux/Action";
import { NextPage } from "@/Redux/Action";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image"
import anime from 'animejs/lib/anime.es.js';
import { RevealWrapper } from 'next-reveal';
import Ban from "./Banner/ban";

const Home = () => {

  const Prod = useSelector((state) => state.Record);
  const SearchProd = useSelector((state) => state.SearchUser);
  const SortProd = useSelector((state) => state.SortUser);
  const currentPage = useSelector((state) => state.Next);
  const totalPageCount = useSelector((state) => state.Totalpage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowAllProdCus(SearchProd, SortProd, currentPage));
  }, [SearchProd, SortProd, currentPage]);

  useEffect(() => {
    dispatch(NextPage(0));
  }, [SearchProd, SortProd]);

  useEffect(() => {
    dispatch(NextPage(0));
    dispatch(SearchAction(""));
    dispatch(SortAction(false));
  }, []);


  return (
    <>

      <RevealWrapper rotate={{ x: 22, y: 40, z: 0 }} className="load-hidden" reset={true} interval={5000} >
        <Ban />
      </RevealWrapper>

      <div className="container">
        <div className="row">
          {Prod.map((product) => (
            <div className="col-lg-4 col-md-6 mb-4" >
              <div className="card h-100">
                <div className="product-image">
                  <Image src={product.imagepath} alt={product.name} width={200} height={200} className="card-img-top" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Company: {product.company}</p>
                  <p className="card-text">Price: ${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
