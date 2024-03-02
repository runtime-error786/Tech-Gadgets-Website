import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus, faMobile, faDesktop, faStopwatch, faFilePen, faKeyboard, faCircleMinus,faChartSimple
} from "@fortawesome/free-solid-svg-icons";
import { BsSmartwatch } from "react-icons/bs";

let Navmob = () => {
    return (
        <>
            <div class="dropdown text-center mt-3 mb-2">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"white",color:"black"}}>
                    Actions
                </button>
                <ul class="dropdown-menu" >
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> Admin</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> Product</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faCircleMinus}></FontAwesomeIcon> Admin</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faCircleMinus}></FontAwesomeIcon> Product</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faFilePen}></FontAwesomeIcon> Product</Link></li>
                    <li><Link className="dropdown-item" href=""><FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> Graph</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navmob;