import { createBrowserRouter } from "react-router";

import { ProtectedRoute } from "./components/protected-route";
import About from "./routes/about";
import Home from "./routes/home";
import Login from "./routes/login";
import NotFound from "./routes/not-found";
import Root from "./routes/root";
import SidebarLayout from "./routes/sidebar-layout";
import Signup from "./routes/signup";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <SidebarLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
