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
import Ban from "../Banner/ban";
import { Paytone_One } from "next/font/google";
const inter = Paytone_One({ subsets: ["latin"], weight: "400" });
import "./Style.css";
import Pagination from "../../admin/Others/Paging";
import SortControls from "../Others/Sort";

const Home = ({ params }) => {

  const Prod = useSelector((state) => state.Record);
  const SearchProd = useSelector((state) => state.SearchUser);
  const SortProd = useSelector((state) => state.SortUser);
  const currentPage = useSelector((state) => state.Next);
  const totalPageCount = useSelector((state) => state.Totalpage);
  const dispatch = useDispatch();
  console.log(Prod)


  useEffect(() => {
    dispatch(ShowAllProdCus(SearchProd, SortProd, currentPage, params.Category));
  }, [SearchProd, SortProd, currentPage, params.Category]);

  useEffect(() => {
    dispatch(NextPage(0));
  }, [SearchProd, SortProd, params.Category]);

  useEffect(() => {
    dispatch(NextPage(0));
    dispatch(SearchAction(""));
    dispatch(SortAction(false));
  }, []);


  const addToCart = async (productId) => {
    try {

      let response = await axios.post('http://localhost:2001/addtocart', { productId }, {
        withCredentials: true
      });
      dispatch(ShowAllProdCus(SearchProd, SortProd, currentPage, params.Category));

    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      {Prod.length === 0 ? <div className="no-products-found">
        <p>No products found.</p>
      </div>

        :
        <>
          <RevealWrapper rotate={{ x: 22, y: 40, z: 0 }} className="load-hidden" reset={true} interval={5000} >
            <Ban />
          </RevealWrapper>


          <h2 className={`${inter.className} mt-3`} style={{ textAlign: "center", fontSize: "4000" }}>Our Products</h2>
          <div className="container mb-3">
            <div className="row">
              <div style={{ textAlign: "end" }}>
                <SortControls></SortControls>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row justify-content-center">
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
                        <button className="btn  add-to-cart-btn" onClick={() => addToCart(product.id)} >{product.textbtn}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ToastContainer></ToastContainer>
          <Pagination></Pagination>
        </>
      }
    </>
  );
};

export default Home;
