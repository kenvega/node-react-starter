import { createBrowserRouter } from "react-router";

import { ProtectedRoute } from "./components/protected-route";
import About from "./routes/about";
import Home from "./routes/home";
import Login from "./routes/login";
import NotFound from "./routes/not-found";
import Root from "./routes/root";
import Signup from "./routes/signup";

const router = createBrowserRouter([
  {
    element: <Root />,
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
