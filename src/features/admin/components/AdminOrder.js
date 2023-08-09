import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/const";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  FetchAllOrdersAsync,
  selectOrder,
  selectedTotalOrders,
  updateOrderAsync,
} from "../../Order/orderSlice";
import Pagination from "../../common/Pagination";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);
  const totalOrders = useSelector(selectedTotalOrders);
  const [sort, setSort] = useState({});
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const handleEdit = (item) => {
    setEditableOrderId(item.id);
  };
  const handleShow = (item) => {};
  const handleUpdate = (e, item) => {
    const updatedOrder = { ...item, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const handleSort = (option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(FetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  const handlePage = (page) => {
    setPage(page);
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(FetchAllOrdersAsync(pagination));
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "cancled":
        return "bg-red-200 text-red-600";
      case "deliver":
        return "bg-green-200 text-purple-600";
      case "dispatch":
        return "bg-yellow-200 text-purple-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order == "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order No:
                      {sort._sort == "id" &&
                        (sort._order == "asc" ? (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ) : (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ))}
                    </th>
                    <th
                      className="py-3 px-6 text-left"
                      onClick={(e) => handleSort("id")}
                    >
                      Items
                    </th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((item) => (
                    <>
                      <tr className="border-b border-gray-200 hover:bg-gray-100" key={item.id}>
                        <td
                          className="py-3 px-6 text-left whitespace-nowrap"
                          key={item.id}
                        >
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{item.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {item.items.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.product.thumbnail}
                                />
                              </div>
                              <span>
                                {item.product.title}-#{item.product.quantity}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            ${item.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className=" items-center justify-center">
                            <div>
                              {item.selectedAddress &&
                                item.selectedAddress.name}
                            </div>
                            <div>
                              {item.selectedAddress &&
                                item.selectedAddress.email}
                            </div>
                            <div>
                              {item.selectedAddress &&
                                item.selectedAddress.city}
                            </div>
                            <div>
                              {item.selectedAddress &&
                                item.selectedAddress.pincode}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {item.id == editableOrderId ? (
                            <select onChange={(e) => handleUpdate(e, item)}>
                              <option value="pending">Pending</option>
                              <option value="dispatch">Dispatch</option>
                              <option value="deliver">Deliver</option>
                              <option value="cancled">Cancled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(item.status)} "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs`}>
                              {item.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon
                                onClick={(e) => handleShow(item)}
                                className="w-6 h-4"
                              ></EyeIcon>
                            </div>
                            <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon
                                className="w-6 h-4"
                                onClick={(e) => handleEdit(item)}
                              ></PencilIcon>
                            </div>
                        
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </div>
  );
};

export default AdminOrder;
