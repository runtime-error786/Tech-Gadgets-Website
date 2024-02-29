"use client"
import { useState, useEffect } from 'react';
import { Play } from "next/font/google";
import Nav from "./nav/Nav";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Ban from "./Banner/ban";
import Navmob from "./nav/Navmob";
import Navitem from "./nav/Navitem";
import anime from 'animejs/lib/anime.es.js';
import { RevealWrapper } from 'next-reveal'

config.autoAddCss = false;
const inter = Play({ subsets: ["latin"],weight:"400" });
export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 446);
    };

    handleResize(); // Call on initial render

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures it only runs on mount and unmount
  
  
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        <Nav />
        {isMobile ? <Navmob /> : <Navitem />}
        <RevealWrapper  rotate={{x: 22,y:40,z:0}} className="load-hidden" reset={true} interval={5000} >
        <Ban />
        </RevealWrapper>
        {children}
      </body>
    </html>
  );
}
