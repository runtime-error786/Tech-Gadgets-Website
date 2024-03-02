import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { Inter } from "next/font/google";
import { Play } from "next/font/google";
const inter = Play({ subsets: ["latin"],weight:"400" });

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#95afc0" }}>
            <div className="container">
                <div className="d-flex w-100 justify-content-between align-items-center">

                    <Link href="/" className='navbar-brand' style={{ fontWeight: "bolder", color: "black", fontSize: "30px" }}>
                        E-Mart
                    </Link>
                    <div >
                        <Link href="#" style={{ color: "black",marginLeft:"20px"}}>
                            <FontAwesomeIcon icon={faUser} size="lg" />
                        </Link>
                        <Link href="#" className={inter.className} style={{fontSize:"larger", fontWeight:"bolder", color: "black",marginLeft:"20px",textDecoration:"none"}}>
                            SignOut
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
