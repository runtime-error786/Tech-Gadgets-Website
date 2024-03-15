import { combineReducers } from "redux";
import { Rol,DelAdmin,SearchUser,SortUser,Next,Totalpage,Forgot } from "./Reducer";

let Root = combineReducers({
    Rol,DelAdmin,SearchUser,SortUser,Next,Totalpage,Forgot
})

export { Root };