
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  setUserData,
  clearUserData,
} from "../redux/userSlice";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user/current-user`,
          {
            withCredentials: true,
          }
        );

        // Backend returns the user directly
        dispatch(setUserData(result.data));

      } catch (error) {
        console.log(
          "Authentication check failed:",
          error.response?.data || error.message
        );

        dispatch(clearUserData());
      }
    };

    checkAuth();
  }, [dispatch]);
}

export default useAuth;

