import { combineReducers } from "redux";
import { Rol,DelAdmin,SearchUser,SortUser,Next,Totalpage } from "./Reducer";

let Root = combineReducers({
    Rol,DelAdmin,SearchUser,SortUser,Next,Totalpage
})

export { Root };