import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Result , {Loader} from "./pages/Result";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Result />,
        path: "/result",
        loader : Loader
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
