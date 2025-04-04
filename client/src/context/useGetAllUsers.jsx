import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        // const token = Cookies.get("jwt");
        const token = Cookies.get("jwt");
        console.log("JWT Token:", token);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getallusers`,
          {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;
