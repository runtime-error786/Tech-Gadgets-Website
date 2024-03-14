import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
     
    }
  };
};


export const ShowAllUser = (SearchUser, SortUser, currentPage) => {
  return async (dispatch) => {
      try {
          const url = `http://localhost:2001/showadmin`;
          const response = await axios.get(url, {
              params: {
                  search: SearchUser,
                  sort: SortUser,
                  page: currentPage,
              },
              withCredentials: true
          });

          const { data, totalPages } = response.data; 

          dispatch({
              type: "DelAdmin",
              payload: data 
          });

          dispatch({
              type: "Total",
              payload: totalPages 
          });
      } catch (error) {
          toast.error("Your session expired");
      }
  };
};

export const SearchAction = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SearchUser",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      toast.error("Your session expire");
      
    }
  };
};

export const SortAction = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SortUser",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      toast.error("Your session expire");
      
    }
  };
};

export const NextPage = (c) => {
  return async (dispatch) => {
    try {
      
      dispatch({
        type: "NextPage",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      toast.error("Your session expire");
      
    }
  };
};

export const Total = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "Total",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      toast.error("Your session expire");
      
    }
  };
};
