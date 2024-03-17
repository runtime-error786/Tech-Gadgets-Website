import { combineReducers } from "redux";
import { Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn,Profilepic } from "./Reducer";

let Root = combineReducers({
    Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn,Profilepic
})

export { Root };