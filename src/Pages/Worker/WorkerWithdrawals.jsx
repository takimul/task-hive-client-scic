import { useState, useContext } from "react";
import Loading from "../../Component/Loading";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThemeContext } from "../../provider/ThemeProvider";

const WorkerWithdrawals = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const [data, isLoading] = useUser();
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");

  const time = Date.now();

  if (isLoading) {
    return <Loading />;
  }

  const withdraw = data.coins / 20;

  const handleFirstInputChange = (event) => {
    const value = event.target.value;
    setFirstInput(value);

    // Check if the value is a number
    if (!isNaN(value) && value !== "") {
      setSecondInput((value / 20).toFixed(2));
    } else {
      setSecondInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const first = firstInput;
    const second = secondInput;

    if (second > withdraw) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You don't have enough coins.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (second === 0) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Withdraw amount 0 is not allowed.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const paymentMethod = e.target.method.value;
    const withdrawNumber = e.target.withdraw_number.value;

    const details = {
      coin_to_withdraw: parseInt(first),
      withdraw_amount: parseInt(second),
      payment_method: paymentMethod,
      withdraw_number: withdrawNumber,
      worker_email: data.email,
      worker_name: data.name,
      worker_image: data.image,
      withdraw_time: time,
    };

    const result = await axiosSecure.post("/withdraw-coin", details);
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Withdraw Request has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Conditional classes for dark and light theme
  const containerClass = theme === "light" ? "bg-white" : "bg-gray-800";
  const textClass = theme === "light" ? "text-gray-900" : "text-white";
  const buttonClass =
    theme === "light"
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className={`${containerClass} min-h-screen p-5`}>
      <div>
        <h3 className={`text-center font-medium mt-4 text-3xl ${textClass}`}>
          Maximum Withdrawal Amount : ${withdraw}
        </h3>
        <p className={`text-center mb-4 ${textClass}`}>20 Coins = 1 Dollar</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={handleFirstInputChange}
            type="number"
            name="coin-to-withdraw"
            id="coin-to-withdraw"
            className={`block py-2.5 px-0 w-full text-sm ${textClass} bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="coin-to-withdraw"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Coin To Withdraw
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            readOnly
            defaultValue={secondInput}
            type="number"
            name="coin-to-withdraw"
            id="coin-to-withdraw"
            className={`block py-2.5 px-0 w-full text-sm ${textClass} bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="coin-to-withdraw"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Withdraw Amount
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <select
            name="method"
            required
            className={`select select-bordered w-full md:max-w-xs ${
              theme === "light"
                ? "bg-white text-gray-900"
                : "bg-gray-700 text-white"
            }`}
            defaultValue=""
          >
            <option disabled value="">
              Select Payment Method
            </option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Rocket">Rocket</option>
          </select>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="withdraw_number"
              id="withdraw_number"
              className={`block py-2.5 px-0 w-full text-sm ${textClass} bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
              required
            />
            <label
              htmlFor="withdraw_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Account Number
            </label>
          </div>
        </div>
        <input
          type="submit"
          className={`text-white ${buttonClass} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          value="Withdraw"
        />
      </form>
    </div>
  );
};

export default WorkerWithdrawals;
