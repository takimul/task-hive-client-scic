import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/${user?.email}`);
      return data;
    },
  });

  return [data, isLoading, refetch];
};

export default useUser;




