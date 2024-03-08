import axios from 'axios';

export const Auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:2001/auth", { withCredentials: true });
      dispatch({
        type: "Role",
        payload: response.data
      });
      console.log("hello",response);
    } catch (error) {
      dispatch({
        type: "Role",
        payload:"Guest"
      });
    }
  };
};

