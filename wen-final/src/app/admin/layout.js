"use client"
import { Play } from "next/font/google";
const inter = Play({ subsets: ["latin"],weight:"400" });
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Nav from "./Navbar/navbar";
import Navitem from "./Navbar/navItem_Laptop";
import { useState, useLayoutEffect } from 'react';
import Navmob from "./Navbar/NavItem_mobile";

export default function RootLayout({ children }) {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 446);
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  
  return (
    <html lang="en" className={inter.className} >
      <body className={inter.className}>
        <Nav></Nav>
        {isMobile ? <Navmob /> : <Navitem />}
        {children}
        </body>
    </html>
  );
}
