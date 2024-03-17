import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus, faMobile, faDesktop, faStopwatch, faFilePen, faKeyboard, faCircleMinus, faChartSimple
} from "@fortawesome/free-solid-svg-icons";
import { BsSmartwatch } from "react-icons/bs";

let Navmob = () => {
    return (
        <>
            <div class="dropdown text-center mt-3 mb-2" >
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "white", color: "black" }}>
                    Actions
                </button>
                <ul class="dropdown-menu" >
                    <li>
                        <Link className="dropdown-item nav-link" href="">
                            <div className="d-flex align-items-center">
                                {/* <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> */}
                                <span>Add Admin</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item nav-link" href="">
                            <div className="d-flex align-items-center">
                                {/* <FontAwesomeIcon icon={faCirclePlus} className="me-2" /> */}
                                <span>Add Product</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item nav-link " href="">
                            <div className="d-flex align-items-center">
                                {/* <FontAwesomeIcon icon={faCircleMinus} className="me-2" /> */}
                                <span>Delete Admin</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item nav-link " href="">
                            <div className="d-flex align-items-center">
                                {/* <FontAwesomeIcon icon={faCircleMinus} className="me-2" /> */}
                                <span>Delete Product</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item nav-link " href="">
                            <div className="d-flex align-items-center">
                                {/* <FontAwesomeIcon icon={faFilePen} className="me-2" /> */}
                                <span>Update Product</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item nav-link " href="">
                            <div className="d-flex align-items-center">
                                {/* <FontAwesomeIcon icon={faChartSimple} className="me-2" /> */}
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navmob;
