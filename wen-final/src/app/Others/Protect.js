"use client"
import { useDispatch, useSelector } from 'react-redux';
import  axios  from 'axios';
import { usePathname } from 'next/navigation'; 
let Protect = ({ children })=>{
    const router = usePathname(); 
    console.log(router)

    return <>{children}</>;
}

export default Protect;