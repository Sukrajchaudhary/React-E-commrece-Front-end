import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUsr } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectLoginuserInfo } from "../../user/userSlice";
const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUsr);
  const userinfo=useSelector(selectLoginuserInfo)
  console.log(userinfo)
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && userinfo.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
