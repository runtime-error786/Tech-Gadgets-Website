import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus, faMobile, faDesktop, faStopwatch, faFilePen, faKeyboard, faCircleMinus, faChartSimple
} from "@fortawesome/free-solid-svg-icons";
import { BsSmartwatch } from "react-icons/bs";
import "./Style.css";

const AdminNavitem = () => {
    return (
        <div className="nab1 mb-4 d-flex justify-align-content-start align-items-center">
            <div className="container mt-4 s1">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link href="/admin/addadmin" className="nav-link a1">
                            <FontAwesomeIcon icon={faCirclePlus} size="lg" /> Admin
                        </Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link href="/admin/addproduct" className="nav-link a1">
                            <FontAwesomeIcon icon={faCirclePlus} size="lg" /> Product
                        </Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link href="/admin/deladmin" className="nav-link a1">
                            <FontAwesomeIcon icon={faCircleMinus} size="lg" /> Admin
                        </Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link href="/admin/delproduct" className="nav-link a1">
                            <FontAwesomeIcon icon={faCircleMinus} size="lg" /> Product
                        </Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link href="/admin/updateprod" className="nav-link a1">
                            <FontAwesomeIcon icon={faFilePen} size="lg" /> Product
                        </Link>
                    </div>
                    <div className="col-lg-1 col-md-1 text-center">
                        <Link href="/admin/graph" className="nav-link a1">
                            <FontAwesomeIcon icon={faChartSimple} size="lg" />Graph
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavitem;
