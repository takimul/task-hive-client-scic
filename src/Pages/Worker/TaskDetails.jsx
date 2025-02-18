import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../../provider/ThemeProvider";

const TaskDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // const id = useParams().id();
  const id = useParams().id;

  const { theme } = useContext(ThemeContext); // Access current theme

  const { data: data } = useQuery({
    queryKey: ["singleData"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/single-task/${id}`);
      return data;
    },
  });

  let current_date = Date.now();

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submission_Details = form.submission_Details.value;

    const submissionData = {
      task_id: data._id,
      task_title: data.task_title,
      task_detail: data.task_detail,
      task_img_url: data.task_image,
      payable_amount: data.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      worker_image: user?.photoURL,
      submission_details: submission_Details,
      buyer_name: data.user.name,
      buyer_email: data.user.email,
      buyer_image: data.user.photo_url,
      current_date,
      status: "Pending",
    };

    const result = await axiosSecure.post("/worker-submission", submissionData);

    if (result.data.insertedId) {
      const notification = {
        message: `You have a message from ${user?.displayName} for completing ${data.task_title}`,
        status: "unread",
        toEmail: data.user.email,
        date: new Date(),
        time: Date.now(),
      };
      await axiosSecure.post("/notification", notification);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/my-submission");
    }
  };

  // Conditionally setting the background color and text color based on the theme
  const backgroundClass = theme === "light" ? "bg-white" : "bg-red-800";
  const textClass = theme === "light" ? "text-gray-900" : "text-white";
  const cardClass =
    theme === "light" ? "bg-white shadow-md" : "bg-gray-700 shadow-lg";
  const buttonClass =
    theme === "light"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div
      className={`max-w-5xl border md:mx-auto overflow-hidden font-raleway p-2 mx-4 my-14 ${cardClass} rounded-lg mt-5`}
    >
      <img
        className="w-cover mx-auto md:h-[500px] "
        src={data?.task_image}
        alt="Task"
      />

      <form onSubmit={handleSubmitTask}>
        <div className="p-6">
          <div className="space-y-1">
            <p
              className={`text-lg font-medium text-blue-600 uppercase ${textClass}`}
            >
              {data?.task_title}
            </p>
            <p className={`text-xl font-medium ${textClass}`}>
              {data?.task_detail}
            </p>
            <p className={`${textClass}`}>
              Task Quantity: {data?.required_workers}
            </p>
            <p className={`${textClass}`}>
              Payable Amount: {data?.payable_amount} coin
            </p>
            <p className={`${textClass}`}>
              Completion Date: {new Date(data?.deadline).toLocaleDateString()}
            </p>
            <p className={`mt-2 text-lg ${textClass}`}>
              Submission Info: {data?.submission_info}
            </p>
          </div>

          <div className="mt-5 h-36">
            <textarea
              name="submission_Details"
              required
              className={`textarea border border-rose-400 border-opacity-40 ${
                theme === "light" ? "bg-pink-50" : "bg-gray-600"
              } w-full h-full textarea-bordered`}
              placeholder="Submission Details"
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-4">
              <div className="flex gap-5 items-center">
                <div>
                  <img
                    className="object-cover w-14 h-14 rounded-full"
                    src={data?.user?.photo_url}
                    alt="Buyer Avatar"
                  />
                </div>
                <div>
                  <p>{data?.user?.name}</p>
                  <p>{data?.user?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className={`inline-flex px-4 py-2 text-sm font-medium text-center text-white rounded-lg ${buttonClass} focus:ring-4 focus:outline-none focus:ring-blue-300`}
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
