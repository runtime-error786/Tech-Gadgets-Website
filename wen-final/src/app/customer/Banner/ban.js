import { Anton } from "next/font/google";
const inter = Anton({ subsets: ["latin"], weight: "400" });
import Image from "next/image";
import "./Style.css"

let Ban = () => {
    return (
        <>
            
                <div className="container pq mt-1">
                    <div className="row g1 d-flex justify-content-between align-items-center">
                        <div className="col-lg-6 g2 col-md-6 text-center ">
                            <h1 className={inter.className} style={{ color: "yellow" }}>Welcome to E-Mart!</h1>
                            <h4 style={{ color: "white" }}>Shop now for the latest trends, hottest deals, and exclusive offers</h4>
                            <h3 style={{ color: "white" }}>Happy shopping!</h3>
                        </div>
                        <div className="col-lg-6 g3 col-md-6 mt-5 mb-5 text-center">
                            <Image src="/b1.png" width={300} height={170}></Image>
                        </div>
                    </div>
                </div>
            
        </>
    )
}

export default Ban;