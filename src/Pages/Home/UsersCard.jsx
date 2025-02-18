import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Component/Loading";
import { ThemeContext } from "../../provider/ThemeProvider";

const UsersCard = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const { data: topUsers, isLoading } = useQuery({
    queryKey: ["top-user-coin"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/users-coin");
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Conditional styling based on theme
  const sectionBg = theme === "light" ? "bg-base-200" : "bg-gray-900";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const cardBorder = theme === "light" ? "border-gray-200" : "border-gray-700";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const mutedText = theme === "light" ? "text-gray-600" : "text-gray-400";

  return (
    <div className={`${sectionBg} py-16`}>
      <h3 className={`text-3xl font-bold text-center underline ${textColor}`}>
        Our Top Earners
      </h3>
      <div className="container mx-auto py-6 grid grid-cols-1 px-4 md:grid-cols-2 gap-8 lg:grid-cols-3">
        {topUsers.map((user) => (
          <div
            key={user?._id}
            className={`w-full py-1 ${cardBg} border ${cardBorder} rounded-lg shadow dark:${cardBg} dark:${cardBorder}`}
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={user?.image}
                alt={user?.name}
              />
              <h5 className={`mb-1 text-xl font-medium ${textColor}`}>
                {user?.name}
              </h5>
              <div className="font-medium">
                <p className={mutedText}>Available Coin: {user?.coins}</p>
                <p className={mutedText}>Task Completion: 23</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersCard;
