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
import { Paytone_One } from "next/font/google";
const inter = Paytone_One({ subsets: ["latin"],weight:"400" });
import "./Style.css";

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
      <h2 className={`${inter.className} m-5` } style={{textAlign:"center",fontSize:"4000"}}>Our Products</h2>
      <div className="container">
        <div className="row">
          {Prod.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 mb-4" >
              <div className="card h-100">
                <div className="product-image">
                  <Image style={{ objectFit: "contain" }} src={product.imagepath} alt={product.name} width={300} height={200} className="card-img-top" />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <h5 className="card-title text-center mb-3">{product.name}</h5>
                    <p className="card-text text-center mb-3">Company: {product.company}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-title">Price: ${product.price}</p>
                    <button className="btn  add-to-cart-btn" style={{backgroundColor:"#2c3e50",color:"white"}}>Add to Cart</button>
                  </div>
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
