const initialState = []; // Initial state is an empty array
let Rol = (state = initialState, action) => {
    if (action.type === "Role") {
        console.log("red",action.payload)
        return state = action.payload;
    }
    else {
        return state;
    }
}

let DelAdmin = (state = initialState, action) => {
    if (action.type === "DelAdmin") {
        console.log("red",action.payload)
        return state = action.payload;
    }
    else {
        return state;
    }
}

let SearchUser = (state = "", action) => {
    if (action.type === "SearchUser") {
        console.log("red",action.payload)
        return state = action.payload;
    }
    else {
        return state;
    }
}

let SortUser = (state = false, action) => {
    if (action.type === "SortUser") {
        console.log("red",action.payload)
        return state = action.payload;
    }
    else {
        return state;
    }
}
export { Rol,DelAdmin,SearchUser,SortUser };