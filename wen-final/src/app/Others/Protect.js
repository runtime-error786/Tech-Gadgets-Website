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
    }, [router]);

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
        if ( router === "/admin/profile" || router === "/admin/graph" || router === "/admin/updateprod" || router === "/admin/delproduct" || router === "/admin/addadmin" || router === "/admin/addproduct" ||router === "/admin/deladmin" || router === "/error") {
            return <>{children}</>;
        } else {
            route.push("/error");
            return null;
        }
    } else if (role === "Customer") {
        console.log("customer role")

        if (
            router.startsWith("/customer/other") ||
            router.startsWith("/customer/tv") ||
            router.startsWith("/customer/watch") ||
            router.startsWith("/customer/desktop") ||
            router.startsWith("/customer/mobile") ||
            router.startsWith("/customer/laptop") ||
            router.startsWith("/customer/all") ||
            router.startsWith("/customer/cart") ||
            router==="/customer/profile" ||
            router==="/error"
        ) {
            return <>{children}</>;
        } else {
            route.push("/error");
            return null;
        }
        
    } else if (role === "Guest") {
        console.log("guest role")

        if (
            router==="/customer/other" ||
            router==="/customer/tv" ||
            router==="/customer/watch" ||
            router==="/customer/desktop" ||
            router==="/customer/mobile" ||
            router==="/customer/laptop" ||
            router==="/customer/all" ||
            router==="/error2" ||
            router==="/signin"
        ) {
            return <>{children}</>;
        } else {
            route.push("/signin");
            return null;
        }
    } 
}

export default Protect;
