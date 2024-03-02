"use client"
import { Play } from "next/font/google";
const inter = Play({ subsets: ["latin"],weight:"400" });
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Nav from "./Navbar/nav";
import Navitem from "./Navbar/navCrud_Laptop";
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Nav></Nav>
        <Navitem></Navitem>
        {children}
        </body>
    </html>
  );
}
