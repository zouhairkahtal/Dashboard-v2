import { Layout } from "./Layout";
import { LogIn } from "./views/LogIn";
import { SignUp } from "./views/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <Layout />,
      children: [
        {
          index: true,
          element: <LogIn />,
        },

        {
          path: "LogIn",
          element: <LogIn />,
        },
        {
          path: "SignUp",
          element: <SignUp />,
        },
        // {
        //   path: "ForgotPassword",
        //   element: <ForgotPassword />,
        // },
        // {
        //   path: "ResetPassword",
        //   element: <ResetPassword />,
        // },
        // {
        //   path: "Dashboard",
        //   element: <Dashboard />,
        // },
        // {
        //   path: "BudgetForm",
        //   element: <BudgetForm />,
        // },

        {
          path: "*",
          element: (
            <h1 className="text-center text-2xl text-red-600">
              404 - Page Not Found
            </h1>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
