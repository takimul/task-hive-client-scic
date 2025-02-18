import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Component/Profile";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import WorkerTaskList from "../Pages/Worker/WorkerTaskList";
import WorkerSubmission from "../Pages/Worker/WorkerSubmission";
import WorkerWithdrawals from "../Pages/Worker/WorkerWithdrawals";
import DashboardHome from "../Pages/DashboardHome";
import AddNewTask from "../Pages/Buyer/AddNewTask";
import MyTask from "../Pages/Buyer/MyTask";
import PurchaseCoin from "../Pages/Buyer/PurchaseCoin";
import PaymentHistory from "../Pages/Buyer/PaymentHistory";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageTask from "../Pages/Admin/ManageTask";
import UpdateTask from "../Pages/Buyer/UpdateTask";
import TaskDetails from "../Pages/Worker/TaskDetails";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";
import Payment from "../Pages/Buyer/Payment/Payment";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <Register></Register>,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },

      // for worker

      {
        path: "/dashboard/task-list",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <WorkerTaskList></WorkerTaskList>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/my-submission",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <WorkerSubmission></WorkerSubmission>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/withdrawals",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <WorkerWithdrawals></WorkerWithdrawals>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      {
        path: "/dashboard/task-details/:id",
        element: (
          <WorkerRoute>
            <PrivateRoute>
              <TaskDetails></TaskDetails>
            </PrivateRoute>
          </WorkerRoute>
        ),
      },
      // for buyer
      {
        path: "/dashboard/add-task",
        element: (
          <BuyerRoute>
            <PrivateRoute>
              <AddNewTask></AddNewTask>
            </PrivateRoute>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/my-task",
        element: (
          <BuyerRoute>
            <PrivateRoute>
              <MyTask></MyTask>
            </PrivateRoute>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/purchase-coin",
        element: (
          <BuyerRoute>
            <PrivateRoute>
              <PurchaseCoin></PurchaseCoin>
            </PrivateRoute>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <BuyerRoute>
            <PrivateRoute>
              <PaymentHistory></PaymentHistory>
            </PrivateRoute>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/update-task/:id",
        element: (
          <BuyerRoute>
            <PrivateRoute>
              <UpdateTask></UpdateTask>
            </PrivateRoute>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      // for admin
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageUsers></ManageUsers>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-task",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageTask></ManageTask>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
    ],
  },
]);
