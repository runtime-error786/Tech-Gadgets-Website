import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { Auth } from '@/Redux/Action';
import "bootstrap/dist/css/bootstrap.min.css";

const Protect = ({ children }) => {
    const role = useSelector((state) => state.Rol);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const router = usePathname();
    const route = useRouter();

    useEffect(() => {
        setLoading(true);

        const delayTimeout = setTimeout(() => {
            dispatch(Auth()).then(() => {
                setLoading(false);
            });
        }, 1000); 

        return () => clearTimeout(delayTimeout);
    }, []);

    if (loading) {
        return <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{width: "6rem", height: "6rem",borderWidth:"10px"}} className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>

        </>;
    }

    console.log("role", role);

    if (role === "Admin") {
        console.log("admin role")
        if ( router === "/admin/graph" || router === "/admin/updateprod" || router === "/admin/delproduct" || router === "/admin/addadmin" || router === "/admin/addproduct" ||router === "/admin/deladmin" || router === "/error1") {
            return <>{children}</>;
        } else {
            route.push("/error1");
            return null;
        }
    } else if (role === "Customer") {
        console.log("customer role")

        if (router === "/customer" || router === "/error3") {
            return <>{children}</>;
        } else {
            route.push("/error3");
            return null;
        }
    } else if (role === "Guest") {
        console.log("guest role")

        if (router === "/customer" || router === "/signin" || router === "/error2") {
            return <>{children}</>;
        } else {
            route.push("/error2");
            return null;
        }
    } 
}

export default Protect;
