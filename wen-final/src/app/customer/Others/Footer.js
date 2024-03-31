import React from 'react';
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="product-categories">
                    <h3>Product Categories</h3>
                    <div className="category-row">
                        <ul>
                            <li><a className='n1' href="/customer/all">All</a></li>
                            <li><a className='n1' href="/customer/laptop">Laptop</a></li>
                            
                        </ul>
                        <ul>
                          
                            <li><a className='n1' href="/customer/mobile">Mobile</a></li>
                            <li><a className='n1' href="/customer/desktop">Desktop</a></li>
                        </ul>
                        <ul>
                            <li><a className='n1' href="/customer/watch">Watch</a></li>
                            <li><a className='n1' href="/customer/tv">Tv</a></li>
                         
                        </ul>
                        <ul>
                            
                            <li><a className='n1' href="/customer/other">Others</a></li>
                        </ul>
                    </div>
                </div>
                <div className="head-office">
                    <h3>Head Office</h3>
                    <p>123 Main Street, City, Country</p>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/amtatm684/"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
