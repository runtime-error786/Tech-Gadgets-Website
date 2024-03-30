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
              type: "Record",
              payload: data 
          });

          dispatch({
              type: "Total",
              payload: totalPages 
          });
      } catch (error) {
        toast.error("Your session expire.Please Sign out & Sign in again");
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
      toast.error("Your session expire.Please Sign out & Sign in again");
      
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
      toast.error("Your session expire.Please Sign out & Sign in again");
      
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
      toast.error("Your session expire.Please Sign out & Sign in again");
      
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
      toast.error("Your session expire.Please Sign out & Sign in again");
      
    }
  };
};

export const For_got = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "Forgot",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      toast.error("Your session expire.Please Sign out & Sign in again");
      
    }
  };
};

export const ShowSign = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ShowSign",
        payload:c
      });
      console.log("done auth1")
    } catch (error) {
      toast.error("Your session expire.Please Sign out & Sign in again");
      
    }
  };
};

export const ShowAllProd = (SearchUser, SortUser, currentPage) => {
  return async (dispatch) => {
      try {
          const url = `http://localhost:2001/ShowProd`;
          const response = await axios.get(url, {
              params: {
                  search: SearchUser,
                  sort: SortUser,
                  page: currentPage,
              },
              withCredentials: true
          });
          console.log("kil1")
          const { data, totalPages } = response.data; 

          console.log("kil2")

          dispatch({
              type: "Record",
              payload: data 
          });
          
          console.log("kil3")

          dispatch({
              type: "Total",
              payload: totalPages 
          });
          console.log("kil4")

      } catch (error) {
        toast.error("Your session expire.Please Sign out & Sign in again");
      }
  };
};

export const Picset = () => {
  return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:2001/Showprofile', { withCredentials: true });
          console.log("kil1",response.data.profile.profilePicUrl );
         
          dispatch({
              type: "pic",
              payload: response.data.profile.profilePicUrl 
          });

      } catch (error) {
        toast.error("Your session expire.Please Sign out & Sign in again");
      }
  };
};


export const ShowAllProdCus = (SearchUser, SortUser, currentPage,category) => {
  return async (dispatch) => {
      try {
          const url = `http://localhost:2001/ShowProdCus`;
          const response = await axios.get(url, {
              params: {
                  search: SearchUser,
                  sort: SortUser,
                  page: currentPage,
                  category:category
              },
              withCredentials: true
          });
          console.log("kil1")
          const { data, totalPages } = response.data; 

          console.log("kil2")

          dispatch({
              type: "Record",
              payload: data 
          });
          
          console.log("kil3")

          dispatch({
              type: "Total",
              payload: totalPages 
          });
          console.log("kil4")

      } catch (error) {
        toast.error("Your session expire.Please Sign out & Sign in again");
      }
  };
};



export const showinput = (val) => {
  return  (dispatch) => {
    dispatch({
      type: "Showsearch",
      payload: val
  });
  };
};


export const Showcart = () => {
  return async (dispatch) => {
      try {
          const url = `http://localhost:2001/showcart`;
          const response = await axios.get(url, {
              withCredentials: true
          });
          console.log("kil1",response.data.cartItems)
          const  cartItems  = response.data.cartItems; 

          console.log("cart data",cartItems)

          dispatch({
              type: "Record",
              payload: cartItems 
          });
          

      } catch (error) {
        toast.error("Your session expire.Please Sign out & Sign in again");
      }
  };
};
