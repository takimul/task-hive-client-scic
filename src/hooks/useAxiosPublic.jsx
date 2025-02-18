import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-hive-server-nine.vercel.app",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
