// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../Component/Loading";
// import UserDataRow from "./UserDataRow";
// import { Helmet } from "react-helmet";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: users, isLoading, refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/users");
//       return data;
//     },
//   });

//   if (isLoading) {
//     return <Loading></Loading>;
//   }

//   // //console.log(users);

//   return (
//     <div className="my-14 px-2">
//       <Helmet>
//                 <title>Manage User | TaskHive</title>
//             </Helmet>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>User Info</th>
//               <th>User Role</th>
//               <th>Coin</th>
//               <th>Delete</th>
//               <th>Update Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <UserDataRow
//                 key={user._id}
//                 refetch={refetch}
//                 user={user}
//               ></UserDataRow>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading";
import UserDataRow from "./UserDataRow";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Conditional class names based on the theme
  const bgColor = theme === "light" ? "bg-gray-100" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const tableHeaderBgColor = theme === "light" ? "bg-gray-200" : "bg-gray-700";
  const tableRowBgColor = theme === "light" ? "bg-white" : "bg-gray-700";
  const tableRowHoverColor =
    theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-600";

  return (
    <div className={`my-14 px-2 ${bgColor}`}>
      <Helmet>
        <title>Manage User | TaskHive</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className={tableHeaderBgColor}>
            <tr>
              <th className={`${textColor}`}>User Info</th>
              <th className={`${textColor}`}>User Role</th>
              <th className={`${textColor}`}>Coin</th>
              <th className={`${textColor}`}>Delete</th>
              <th className={`${textColor}`}>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserDataRow
                key={user._id}
                refetch={refetch}
                user={user}
                rowBgColor={tableRowBgColor}
                rowHoverColor={tableRowHoverColor}
                textColor={textColor}
              ></UserDataRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
