import { useState, useContext } from "react";
import UpdateUserModal from "./UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { ThemeContext } from "../../provider/ThemeProvider";

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext); // Access the current theme

  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/user/role/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      Swal.fire("User Role Updated Successfully");
      setIsOpen(false);
    },
  });

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axiosSecure.delete(`/user/delete/${id}`);
        if (data.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const modalHandler = async (selected) => {
    const user = {
      role: selected,
    };
    try {
      await mutateAsync(user);
    } catch (error) {
      console.error(error);
    }
  };

  // Conditional styles based on theme
  const rowBgColor = theme === "light" ? "bg-white" : "bg-gray-700";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const buttonBgColor = theme === "light" ? "bg-green-200" : "bg-green-600";
  const buttonHoverColor =
    theme === "light" ? "hover:text-rose-400" : "hover:text-rose-200";

  return (
    <tr className={`${rowBgColor}`}>
      <th className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              referrerPolicy="no-referrer"
              src={user.image}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div>
          <div className={`${textColor} font-bold`}>{user.name}</div>
          <div className={`${textColor} text-sm opacity-50`}>{user.email}</div>
        </div>
      </th>
      <td>
        <span className={`${textColor} py-1 px-2 font-medium rounded-xl`}>
          {user.role}
        </span>
      </td>
      <td className={`${textColor} font-medium`}>{user.coins}</td>
      <td>
        <button
          onClick={() => handleDeleteUser(user._id)}
          className={`${buttonHoverColor} btn hover:text-rose-400 transition-all duration-300 btn-circle`}
        >
          <MdDelete className="text-xl" />
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className={`relative cursor-pointer inline-block px-3 py-1 font-semibold ${textColor} leading-tight`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${buttonBgColor} opacity-50 rounded-full`}
          ></span>
          <span className="relative">Update Role</span>
        </button>
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
