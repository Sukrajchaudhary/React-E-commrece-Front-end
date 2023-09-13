import React, { useEffect } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { createRoot } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import { Cartpage } from "./pages/Cartpage";
import Checkout from "./pages/Checkout";
import ProductDetailsPages from "./pages/ProductDetailsPages";
import Protected from "./features/auth/components/Protected";
import { fetchItemByIDAsync } from "./features/cart/cartSlice";
import { selectLoggedInUsr } from "./features/auth/authSlice";
import PageNoteFound from "./pages/PageNoteFound";
import OrdersuccessPage from "./pages/OrdersuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfiles from "./pages/UserProfile";
import { fetchLoggedInUserInfoAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import { ForgetPasword } from "./pages/ForgetPasword";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHomepage from "./pages/AdminHomepage";
import AdminProductDetailsPages from "./pages/AdminProductDetailsPages";
import AdminProductForm from "./pages/AdminProductForm";
import AdminOrderPages from "./pages/AdminOrderPages";
import { positions, Provider } from "react-alert";
import { ResetUserPassword } from "./pages/ResetUserPassword";
import AlertTemplate from "react-alert-template-basic";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Homepage />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomepage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <Loginpage></Loginpage>,
  },
  {
    path: "/signup",
    element: <Signuppage></Signuppage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <Cartpage></Cartpage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/productdetails/:id",
    element: (
      <Protected>
        <ProductDetailsPages></ProductDetailsPages>
      </Protected>
    ),
  },
  {
    path: "/admin/productdetails/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPages></AdminProductDetailsPages>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNoteFound></PageNoteFound>,
  },
  {
    path: "/OrdersuccessPage/:id",
    element: <OrdersuccessPage></OrdersuccessPage>,
  },
  {
    path: "/UsersOrders",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfiles></UserProfiles>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path: "/ForgetPasword",
    element: <ForgetPasword></ForgetPasword>,
  },
  {
    path: "/admin/ProductForm",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/AdminOrder",
    element: (
      <ProtectedAdmin>
        <AdminOrderPages></AdminOrderPages>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/ProductForm/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/reset-password",
    element: (
   
        <ResetUserPassword></ResetUserPassword>
      
    ),
  },
]);
const options = {
  timeout: 5000,
  position:  positions.TOP_CENTER
};
createRoot(document.getElementById("root")).render();
function App() {
  const user = useSelector(selectLoggedInUsr);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchItemByIDAsync());
      dispatch(fetchLoggedInUserInfoAsync());
    }
  }, [dispatch, user]);
 
  return (
    <div className="App">
       <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
