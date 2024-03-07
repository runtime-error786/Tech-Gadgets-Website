import axios from 'axios';

export const Test = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:2001/auth");
      dispatch({
        type: "Test",
        payload: "Guest"
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const Test1 = (x) => {
  dispatch({
    type: "Test",
    payload: x
  });
};