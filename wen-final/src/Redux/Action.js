import axios from 'axios';

export const Auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:2001/auth", { withCredentials: true });
      console.log(response.data)
      if(response.data)
      {
        dispatch({
          type: "Role",
          payload: response.data
        });
      }
      else{
        dispatch({
          type: "Role",
          payload:"Guest"
        });
      }
      console.log("hello",response);
    } catch (error) {
      dispatch({
        type: "Role",
        payload:"Guest"
      });
    }
  };
};

export const Auth_direct = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "Role",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};
