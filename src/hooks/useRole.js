import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `https://task-hive-server-nine.vercel.app/user/${user?.email}`,
        {
          withCredentials: true,  // Make sure the cookies are sent with the request
        }
      );
      return data.role;
    },
  });

  return [role, isLoading];
};


export default useRole;