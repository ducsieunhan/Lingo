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


import BeforeTestPage from './pages/tests/BeforeTestPage';
import AfterTestPage from './pages/tests/AfterTestPage';
import HavingTestPage from './pages/tests/HavingTestPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgetPage from './pages/auth/ForgetPage';
import ResetPage from './pages/auth/ResetPage';
import TestListPage from './pages/tests/TestListPage';
import ProtectedRoute from './components/share/ProtectedRoute';
import NotFound from './components/share/NotFound';
import RootLayout from './layouts/RouteLayout';
import Analytics from './pages/user/Analytics';
import Profile from './pages/user/Profile';
import UserDetailPage from './pages/admin/UserDetailPage';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          element: <ClientLayout />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: "tests",
              element: <TestListPage />,
            },
            {
              path: "tests/:id/:name",
              element: <BeforeTestPage />,
            },
            {
              path: "tests/:id/:name/results/:attemptId",
              element: <AfterTestPage />,
            },
            {
              path: "tests/:id/:name/doTests",
              element: (
                <ProtectedRoute>
                  <HavingTestPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "analytics",
              element: <Analytics />,
            },
            {
              path: "profile",
              element: <Profile />,
            },

          ]
        },
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <DashboardPage />
            },
            {
              path: "users",
              element: <UserPage />,
            },
            {
              path: "users/:id",
              element: <UserDetailPage />,
            },
            {
              path: "tests",
              element: <TestPage />
            },
            {
              path: "create-test",
              element: <CreateTestPage />
            }
          ]
        },
        {
          path: "auth",
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
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
