import axios from "axios";
import { useEffect, useState } from "react";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers");
        console.log(response.data);
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      }
    };
    getUsers();
  }, []);

  return { allUsers, error };
}

export default useGetAllUsers;
