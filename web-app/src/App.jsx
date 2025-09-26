import { useState } from 'react'
import './App.css'
import './styles/antStyle.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from './layouts/AdminLayout';
import 'react-toastify/dist/ReactToastify.css';



import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';
import HomePage from './pages/HomePage';
import CreateTestPage from './pages/admin/CreateTestPage';
import UserPage from './pages/admin/UserPage';
import TestPage from './pages/admin/TestPage';
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgetPage from './pages/auth/ForgetPage';
import ResetPage from './pages/auth/ResetPage';
import { ToastContainer } from 'react-toastify';
import BeforeTestPage from './pages/tests/BeforeTestPage';
import AfterTestPage from './pages/tests/AfterTestPage';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./slice/authentication";
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <AdminLayout />
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />

        },
        {
          path: "user",
          element: <UserPage />
        },
        {
          path: "test",
          element: <TestPage />
        }, {
          path: "createTest",
          element: <CreateTestPage />
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "forget",
          element: <ForgetPage />,
        },
        {
          path: "reset",
          element: <ResetPage />,
        }
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "tests/:id/:name",
          element: <BeforeTestPage />,
        },
        {
          path: "tests/:id/:name/results",
          element: <AfterTestPage />,
        },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App
