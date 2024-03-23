"use client"
import { useState, useLayoutEffect } from 'react';
import { Play } from "next/font/google";
import Nav from "./nav/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Ban from "./Banner/ban";
import Navmob from "./nav/Navitem_mobile";
import Navitem from "./nav/Navitem_laptpop_tablet";
import anime from 'animejs/lib/anime.es.js';
import { RevealWrapper } from 'next-reveal'
import Protect from '../Others/Protect';
import Footer from './Others/Footer';
import "./nav/Style.css"
config.autoAddCss = false;
const inter = Play({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 446);
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures it only runs on mount and unmount


  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        <Nav />
        {isMobile ? <Navmob /> : <Navitem />}
          {children}
          <Footer></Footer>
      </body>
    </html>
  );
}
