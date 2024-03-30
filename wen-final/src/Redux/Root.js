import { combineReducers } from "redux";
import { Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn,Profilepic,Showsearch,Price } from "./Reducer";

let Root = combineReducers({
    Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn,Profilepic,Showsearch,Price
})

export { Root };