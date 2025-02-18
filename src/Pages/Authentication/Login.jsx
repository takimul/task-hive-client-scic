import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Providers/AuthProvider";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../../provider/ThemeProvider";

const Login = () => {
  const { signIn, loading, setLoading, signInWithGoogle } =
    useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access the current theme
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/dashboard";

  // Conditional styling based on theme
  const modalBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const buttonBgColor = theme === "light" ? "bg-rose-100" : "bg-rose-600";
  const buttonHoverColor =
    theme === "light" ? "hover:bg-rose-200" : "hover:bg-rose-700";

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    setError(""); // Clear previous errors

    signIn(email, password)
      .then((res) => {
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithGoogle();
      navigate(from, { replace: true });
      const user = {
        email: response.user.email,
        name: response.user.displayName,
        image: response.user.photoURL,
        role: "Worker",
        coins: parseInt(10),
      };
      await axios.put("https://task-hive-server-nine.vercel.app/user", user);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-center gap-20 items-center min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <Helmet>
        <title>Login | TaskHive</title>
      </Helmet>
      <div
        className={`flex flex-col max-w-md p-6 rounded-md sm:p-10 ${modalBg} text-center`}
      >
        <h1 className={`my-3 text-4xl font-bold ${textColor}`}>Log In</h1>
        <p
          className={`text-sm ${
            theme === "light" ? "text-gray-400" : "text-gray-300"
          }`}
        >
          Sign in to access your account
        </p>
        <form
          onSubmit={handleSignIn}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 text-sm ${textColor}`}
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 ${
                  theme === "light"
                    ? "bg-gray-200 text-gray-900"
                    : "bg-gray-700 text-white"
                }`}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className={`text-sm mb-2 ${textColor}`}
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 ${
                  theme === "light"
                    ? "bg-gray-200 text-gray-900"
                    : "bg-gray-700 text-white"
                }`}
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-rose-500 w-full rounded-md py-3 text-white ${buttonHoverColor}`}
            >
              {loading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p
            className={`px-3 text-sm ${
              theme === "light" ? "text-gray-400" : "text-gray-300"
            }`}
          >
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className={`disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer ${
            theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-600"
          }`}
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p
          className={`px-6 text-sm text-center ${
            theme === "light" ? "text-gray-400" : "text-gray-300"
          }`}
        >
          Don&apos;t have an account yet?{" "}
          <Link
            to="/sign-up"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
