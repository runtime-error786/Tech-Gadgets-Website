import { combineReducers } from "redux";
import { Rol,DelAdmin,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn } from "./Reducer";

let Root = combineReducers({
    Rol,DelAdmin,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn
})

export { Root };