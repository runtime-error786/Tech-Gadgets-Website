import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLaptop, faMobile, faDesktop, faStopwatch, faTv, faKeyboard, faShop
} from "@fortawesome/free-solid-svg-icons";
import { BsSmartwatch } from "react-icons/bs";

let Navmob = () => {
    return (
        <>
            <div class="dropdown text-center mt-3 mb-2">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"white",color:"black"}}>
                    Category
                </button>
                <ul class="dropdown-menu" >
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faShop}></FontAwesomeIcon> All</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faLaptop}></FontAwesomeIcon> Laptop</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faMobile}></FontAwesomeIcon> Phone</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon> Desktop</Link></li>
                    <li><Link className="dropdown-item" href=""><BsSmartwatch /> Watch</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faTv}></FontAwesomeIcon> Tv</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon> Others</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navmob;