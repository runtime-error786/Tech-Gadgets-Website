"use client"
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { SearchAction, ShowAllProdCus, showinput, SortAction } from "@/Redux/Action";
import { NextPage } from "@/Redux/Action";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const Home = ({ params }) => {
  const router = useRouter();
  const Prod = useSelector((state) => state.Record);
  const SearchProd = useSelector((state) => state.SearchUser);
  const SortProd = useSelector((state) => state.SortUser);
  const currentPage = useSelector((state) => state.Next);
  const totalPageCount = useSelector((state) => state.Totalpage);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.Rol);
  dispatch(showinput(true));

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
      toast.error("Your session expire.Please Sign out & Sign in again");
    }
  };

  const addLike = async (productId) => {
    try {

      let response = await axios.post('http://localhost:2001/addlike', { productId }, {
        withCredentials: true
      });
      dispatch(ShowAllProdCus(SearchProd, SortProd, currentPage, params.Category));

    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Your session expire.Please Sign out & Sign in again");
    }
  };

  const handleCardClick = (productId) => {
    router.push(`/customer/${params.Category}/${productId}`);
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
                  <div className="card">
                    <div className="product-image card-img-top">
                      <Image style={{ objectFit: "contain" }} src={product.imagepath} alt={product.name} width={300} height={200} className="card-img-top" />
                      {product.quantity === 0 && <p className="out-of-stock-badge">Out of Stock</p>}
                      {product.quantity > 0 && <p className="in-stock-badge">In Stock</p>}
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-center flex-column align-items-center">
                        <h5 className="card-title text-center mb-3">{product.name}</h5>
                        {
                          role != "Guest" ?
                            <FontAwesomeIcon
                              size="xl"
                              icon={product.likebtn ? faHeart : faHeartRegular}
                              style={{ color: product.likebtn ? 'red' : 'black', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', border: '1px solid black', borderRadius: '50%', padding: '5px', backgroundColor: 'white' }}
                              onClick={() => addLike(product.id)}
                            />
                            :
                            null
                        }
                        <p className="card-text text-center mb-3">Brand: {product.company}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="card-title">Price: ${product.price}</p>

                        {
                          role == "Guest" ?
                            <button className="btn  add-to-cart-btn" onClick={() => router.push("/signin")} style={{backgroundColor:"#2c3e50",color:"white"}} >View</button>
                            :
                            <button className="btn  add-to-cart-btn" onClick={() => handleCardClick(product.id)} style={{backgroundColor:"#2c3e50",color:"white"}}>View</button>

                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Toaster></Toaster>
          <Pagination></Pagination>
        </>
      }
    </>
  );
};

export default Home;
