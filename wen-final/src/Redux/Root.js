import { combineReducers } from "redux";
import { Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn,Profilepic,Showsearch,Price,Cart_length } from "./Reducer";

let Root = combineReducers({
    Rol,Record,SearchUser,SortUser,Next,Totalpage,Forgot,Showbtn,Profilepic,Showsearch,Price,Cart_length
})

export { Root };