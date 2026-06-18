import { Layout } from "./Layout";
import { LogIn } from "./views/LogIn";
import { SignUp } from "./views/SignUp";
import { Dashboard } from "./views/Dashboard";
import { Budgets } from "./views/Budgets";
import { Home } from "./views/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "LogIn",
          element: <LogIn />,
        },
        {
          path: "SignUp",
          element: <SignUp />,
        },
        {
          path: "Dashboard",
          element: <Dashboard />,
        },
        {
          path: "Budgets",
          element: <Budgets />,
        },

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
