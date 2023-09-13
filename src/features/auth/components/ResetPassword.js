import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assest/logo.png";
import {  resetPasswordAsync ,selectErrors,selectePasswordReset} from "../authSlice";
export default function ResetPassword() {
  const dispatch = useDispatch();
  const error=useSelector(selectErrors)
  const passwordReset =useSelector(selectePasswordReset);
  const query=new URLSearchParams(window.location.search);
  const token=query.get('token');
  const email=query.get('email');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      {(email&&token) ?<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Please Choose a New Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit((data) =>
            dispatch(resetPasswordAsync({email,token,password:data.password}))
            )}
          >
             <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 New Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Please Enter Paswword",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters \n
                      - must contain at least 1 uppercase letter, \n 1 lowercase letter, and 1 number \n
                      - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {passwordReset && (
                  <p className="text-green-600">Password reset Successfully</p>
                )}
                {error && (
                  <p className="text-green-600">{error}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Re-Typed Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("comformPassword", {
                    required: "Password is Not Matching",
                    validate: (value, formValus) =>
                      value == formValus.password || "password not matching",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.comformPassword && (
                  <p className="text-red-500">
                    {errors.comformPassword.message}
                  </p>
                )}
              </div>
            </div>
 
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>

       
        </div>
      </div>:<p>Incorrect Link</p>}
    </>
  );
}
