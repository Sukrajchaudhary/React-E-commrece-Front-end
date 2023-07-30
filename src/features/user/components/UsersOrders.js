import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserAsync,
  selectLoginuserInfo,
  selectOrders,
} from "../userSlice";
export default function UsersOrders() {
  const user = useSelector(selectLoginuserInfo);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserAsync(user.id));
  }, []);

  return (
    <div>
      <div>
        {orders.map((order) => (
          <div className="mx-auto mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold tracking-tighter text-black-900">
              Order:#{order.id}
            </h3>
            <h3 className="text-2xl font-bold tracking-tighter text-red-900">
              Order:{order.status}
            </h3>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>TotalAmount</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items in Carts</p>
                <p>{order.totalItems} Items</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
