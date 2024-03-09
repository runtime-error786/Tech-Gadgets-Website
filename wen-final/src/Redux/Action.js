import axios from 'axios';

export const Auth = () => {
  return async (dispatch) => {
    try {
      console.log("hi i am run")
      const response = await axios.get("http://localhost:2001/auth", { withCredentials: true });
      console.log("reduu",response.data)
      if(response.data=="Customer" || response.data=="Admin")
      {
        dispatch({
          type: "Role",
          payload: response.data
        });
        console.log("in if",response);
      }
      else{
        dispatch({
          type: "Role",
          payload:"Guest"
        });
      }
    } catch (error) {
      console.log("err")
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
