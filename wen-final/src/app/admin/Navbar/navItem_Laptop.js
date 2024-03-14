import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus, faMobile, faDesktop, faStopwatch, faFilePen, faKeyboard, faCircleMinus,faChartSimple
} from "@fortawesome/free-solid-svg-icons";
import { BsSmartwatch } from "react-icons/bs";
import "./Style.css";

let Navitem = () => {
    return (
        <>
            <div className="container mt-4 s1">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link className="nav-link a1" href="/admin/addadmin"><FontAwesomeIcon size="xl" icon={faCirclePlus}></FontAwesomeIcon>Admin</Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link className="nav-link a1" href="/admin/addproduct"><FontAwesomeIcon size="xl" icon={faCirclePlus}></FontAwesomeIcon>Product</Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link className="nav-link a1" href="/admin/deladmin"><FontAwesomeIcon size="xl" icon={faCircleMinus}></FontAwesomeIcon>Admin</Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link className="nav-link a1" href=""><FontAwesomeIcon size="xl" icon={faCircleMinus}></FontAwesomeIcon>Product
                        </Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link className="nav-link a1" href=""><FontAwesomeIcon size="xl" icon={faFilePen}></FontAwesomeIcon>Product</Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link className="nav-link a1" href=""><FontAwesomeIcon size="xl" icon={faChartSimple}></FontAwesomeIcon>Graph</Link>
                    </div>
                   
                </div>
            </div>
            
        </>
    )
}

export default Navitem;
