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
        let token = null;
        try {
          const stored = localStorage.getItem("messanger");
          const authUser = stored ? JSON.parse(stored) : null;
          token = authUser?.token || Cookies.get("jwt");
        } catch (e) {
          token = Cookies.get("jwt");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getallusers`,
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setAllUsers(response.data || []);
      } catch (error) {
        console.log("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
