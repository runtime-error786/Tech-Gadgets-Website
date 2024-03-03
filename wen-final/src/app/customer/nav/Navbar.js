"use client";
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import { Play } from "next/font/google";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCartShopping
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 991.98);
        };

        handleResize(); // Call initially
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#95afc0" }}>
                <div className="container">
                    <div className="d-flex w-100 justify-content-between align-items-center"> {/* Utilizing Bootstrap's flex utilities */}
                        <div> {/* Left side */}
                            <Link href="" className='navbar-brand' style={{ fontWeight: "bolder", color: "black", fontSize: "30px" }}>
                                E-Mart
                            </Link>
                        </div>
                        {( /* Render search bar on larger screens */
                            <div className="text-center f1"> {/* Centered */}
                                <input type="text" placeholder="Explore E-Mart" className="form-control" />
                            </div>
                        )}
                        {isSmallScreen ? ( /* Render toggler button on the right only on small screens */
                            <div className="d-flex justify-content-end">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleDrawer}
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        ) : ( /* Render other items on larger screens */
                            <div> {/* Right side */}
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" href=""><FontAwesomeIcon icon={faCartShopping} size="lg" /></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href=""><FontAwesomeIcon icon={faUser} size="lg" /></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/signin">Sign In</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {isSmallScreen && (
                <div className={`collapse drawer  navbar-collapse ${isOpen ? 'show' : ''}`}>
                            <Link className="nav-link q1" href="/signin">Sign In</Link>
                            <Link className="nav-link q2" href=""><FontAwesomeIcon icon={faCartShopping} size="2xl" /></Link>
                            <Link className="nav-link q3" href=""><FontAwesomeIcon icon={faUser} size="2xl" /></Link>
                            <button className="btn drawer-close-button btn-outline-danger close-button" onClick={closeDrawer}>
                        close
                    </button>
                </div>
            )}
        </>
    );
};

export default Nav;
