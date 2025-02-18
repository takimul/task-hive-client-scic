import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeProvider";

const AddNewTask = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // Get the current theme
  const [data, isLoading, refetch] = useUser();
  const navigate = useNavigate();

  const [deadline, setStartDate] = useState(new Date());

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseInt(form.payable_amount.value);
    if (required_workers * payable_amount > data?.coins) {
      return Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Not available Coin. Purchase Coin",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const submission_info = form.submission_info.value;
    const task_image = form.task_image.files[0];

    const formData = new FormData();
    formData.append("image", task_image);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const task = {
        task_title,
        task_detail,
        required_workers,
        payable_amount,
        submission_info,
        task_image: data.data.display_url,
        deadline,
        user: {
          name: user?.displayName,
          email: user?.email,
          photo_url: user?.photoURL,
          post_time: Date.now(),
        },
      };

      const result = await axiosSecure.post("/add-task", task);
      if (result.data.acknowledged) {
        const result = await axiosSecure.patch(
          `/decrease-coin/${user?.email}`,
          { value: required_workers * payable_amount }
        );
        if (result.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task has been saved in db",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          navigate("/dashboard/my-task");
        }
      }
    } catch (error) {}
  };

  // Conditional styles based on the current theme
  const inputBg = theme === "light" ? "bg-gray-50" : "bg-gray-700";
  const inputBorder = theme === "light" ? "border-gray-300" : "border-gray-600";
  const inputText = theme === "light" ? "text-gray-900" : "text-white";
  const buttonBg = theme === "light" ? "bg-blue-700" : "bg-blue-600";
  const buttonHover =
    theme === "light" ? "hover:bg-blue-800" : "hover:bg-blue-700";
  const focusRing =
    theme === "light" ? "focus:ring-blue-500" : "focus:ring-blue-800";
  const placeholderText =
    theme === "light"
      ? "dark:placeholder-gray-400"
      : "dark:placeholder-gray-500";

  return (
    <div className="px-2">
      <form
        onSubmit={handleTaskSubmit}
        className="lg:max-w-5xl h-full mx-auto pt-10"
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="task_title"
              className={`block mb-2 text-sm font-medium ${inputText}`}
            >
              Task Title
            </label>
            <input
              name="task_title"
              type="text"
              id="task_title"
              className={`${inputBg} ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-4 block w-full p-2.5 ${focusRing}`}
              placeholder="Your Task Title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="task_detail"
              className={`block mb-2 text-sm font-medium ${inputText}`}
            >
              Task Detail
            </label>
            <input
              name="task_detail"
              type="text"
              id="task_detail"
              className={`${inputBg} ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-4 block w-full p-2.5 ${focusRing}`}
              placeholder=" Your Task Detail"
              required
            />
          </div>
          <div>
            <label
              htmlFor="required_workers"
              className={`block mb-2 text-sm font-medium ${inputText}`}
            >
              Required workers:
            </label>
            <input
              name="required_workers"
              type="text"
              id="required_workers"
              className={`${inputBg} ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-4 block w-full p-2.5 ${focusRing}`}
              placeholder="Required worker"
              required
            />
          </div>
          <div>
            <label
              htmlFor="payable_amount"
              className={`block mb-2 text-sm font-medium ${inputText}`}
            >
              Payable Amount
            </label>
            <input
              name="payable_amount"
              type="number"
              id="payable_amount"
              className={`${inputBg} ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-4 block w-full p-2.5 ${focusRing}`}
              placeholder="Payable Amount"
              required
            />
          </div>

          <div>
            <label
              htmlFor="submission_info"
              className={`block mb-2 text-sm font-medium ${inputText}`}
            >
              Submission Info
            </label>
            <input
              name="submission_info"
              type="text"
              id="submission_info"
              className={`${inputBg} ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-4 block w-full p-2.5 ${focusRing}`}
              placeholder="Your Task Submission Info"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="task_image"
              className={`block mb-2 text-sm font-medium ${inputText}`}
            >
              Task Image
            </label>
            <input
              name="task_image"
              type="file"
              id="task_image"
              className={`${inputBg} ${inputBorder} ${inputText} text-sm rounded-lg focus:ring-4 block w-full p-2.5 ${focusRing}`}
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-4 ">
            <label htmlFor="deadline" className="block font-semibold mb-1">
              Deadline:
            </label>
            <DatePicker
              className={`border p-2 rounded-md ${inputBg} ${inputBorder} ${inputText}`}
              selected={deadline}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <input
          className={`${buttonBg} ${buttonHover} ${focusRing} text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          type="submit"
          value="Add Task"
        />
      </form>
    </div>
  );
};

export default AddNewTask;
