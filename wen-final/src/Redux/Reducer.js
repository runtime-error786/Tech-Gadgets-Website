const initialState = []; // Initial state is an empty array
let Role = (state = "Guest", action) => {
    if (action.type == "Role") {
        return state = action.payload;
    }
    else {
        return state;
    }
}

export { Role };