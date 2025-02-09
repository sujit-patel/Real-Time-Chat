import axios from "axios";
import { useEffect, useState } from "react";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/user/allusers");
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return [allUsers];
}

export default useGetAllUsers;
