import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./context/authContext";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ManagerCategory from "./pages/ManagerCategory";
import ManagerPost from "./pages/ManagerPost";
import ManagerUser from "./pages/ManagerUser";
import { useEffect } from "react";


const App = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated && window.location.pathname !== "/") {
      window.location.replace("/");
    }
  }, [isAuthenticated]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manager-user" element={<ManagerUser />} />
          <Route path="/manager-post" element={<ManagerPost />} />
          <Route path="/manager-category" element={<ManagerCategory />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
