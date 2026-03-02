import { createBrowserRouter } from "react-router";

import Home from "../Component/Pages/Home/Home";
import AllCars from "../Component/AllCars";
import CardDetails from "../Component/CardDetails";
import RootLayout from "../Component/Layout/Root/RootLayout";
import AuthLayOut from "../Component/Layout/AuthLayout/AuthLayOut";
import Register from "../Component/Pages/Authentecation/Register";
import Login from "../Component/Pages/Authentecation/Login";
import Payment from "../Component/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Component/Layout/Dashboard/DashboardLayout";
import DashboardHome from "../Component/Dashboaed/DashboardHome";
import AddCar from "../Component/Dashboaed/Admin/AddCar";
import ManageCar from "../Component/Dashboaed/Admin/ManageCar/ManageCar";
import MangeBooking from "../Component/Dashboaed/Admin/MAnageBook/MangeBooking";
import MyBooking from "../Component/MyBooking";
import Contact from "../Component/Contact";
import MyAllbooking from "../Component/Dashboaed/user/MyAllbooking";
import PaymentHistory from "../Component/Dashboaed/user/PaymentHistory";
import { Component } from "react";
import UserOverview from "../Component/Dashboaed/user/overview/UserOverview";
import Alluser from "../Component/Dashboaed/Admin/Alluser";
import UserReview from "../Component/Dashboaed/user/UserReview";
import UpdateProfile from "../Component/Dashboaed/user/Profile/UpdateProfile";
import Settings from "../Component/Dashboaed/Admin/Settings/Settings";
import AdminOverview from "../Component/Dashboaed/Admin/Overview/AdminOverview";
import AdminReview from "../Component/Dashboaed/Admin/AdminReview";
import NotFound from "../Component/NotFound/NotFound";
import LearnMore from "../Component/LearnMore/LearnMore";




export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/all-car',
        Component: AllCars
      },
      {
        path: '/carDetails/:id',
        Component: CardDetails
      },

      {
        path: '/my-booking',
        element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
      },
      {
        path: '/contact',
        element:<PrivateRoute><Contact></Contact></PrivateRoute>
      },
      {
        path:'/LearnMore',
        Component:LearnMore
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: '/dashboard/add-car',
        Component: AddCar
      },
      {
        path: '/dashboard/manage-car',
        Component: ManageCar
      },
      {
        path: '/dashboard/booking',
        Component: MangeBooking
      },
      {
        path: '/dashboard/my-bookings',
        Component: MyAllbooking
      },
      {
        path: '/dashboard/my-payments',
        Component: PaymentHistory
      },
      {
        path: '/dashboard/users',
        Component: Alluser
      },
      {
        path: '/dashboard/my-reviews',
        Component: UserReview
      },
      {
        path: '/dashboard/my-profile',
        Component: UpdateProfile
      },
      {
        path: '/dashboard/settings',
        Component: Settings
      },
      {
        path: '/dashboard/reviews',
        Component: AdminReview
      }
    ]
  },
  {
    path: '/*',
    element: <NotFound></NotFound>
  }
]);