import { combineReducers } from "redux";
import { Rol,DelAdmin,SearchUser,SortUser } from "./Reducer";

let Root = combineReducers({
    Rol,DelAdmin,SearchUser,SortUser
})

export { Root };