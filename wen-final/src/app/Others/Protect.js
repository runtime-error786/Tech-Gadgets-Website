import { useDispatch, useSelector } from 'react-redux';
import  axios  from 'axios';
import { usePathname,useRouter } from 'next/navigation'; 
import { Auth } from '@/Redux/Action';
let Protect = ({ children })=>{
    const role = useSelector((state) => state.Rol);
    let dispatch = useDispatch();
    dispatch(Auth());
    const router = usePathname(); 
    const route = useRouter();
    console.log("roole",role);
    if(role=="Admin")
    {
        if(router=="/admin" || router=="/error")
        {
            return <>{children}</>;
        }
    }
    else if(role=="Customer")
    {
        if(router=="/customer" || router=="/error")
        {
            return <>{children}</>;
        }
        else{
            route.push("/error");
            return null;
        }
    }
    else{
        if(router=="/customer" || router=="/signin" || router=="/error")
        {
            return <>{children}</>;
        }
        else{
            route.push("/error");
            return null;
        }
    }
}

export default Protect;