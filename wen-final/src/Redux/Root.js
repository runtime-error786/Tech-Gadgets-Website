import { combineReducers } from "redux";
import { Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn } from "./Reducer";

let Root = combineReducers({
    Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn
})

export { Root };