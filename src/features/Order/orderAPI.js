// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("  http://localhost:800/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:800/orders/"+ order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function FetchAllOrders(pagination, sort) {
  let querystring = "";
  // const queryString =Object.keys(pagination)
  //   .map(key => `${key}=${pagination[key]}`)
  //   .join('&');
  //  Object.keys(sort)
  //   .map(key => `${key}=${sort[key]}`)
  //   .join('&');

  for (let key in sort) {
    querystring += `${key}=${sort[key]}&`;
  }

  // Handle pagination
  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:800/orders?user=" + querystring
    );
    const data = await response.json();
    const totalOrder = await response.headers.get("x-Total-Count");
    resolve({ data: { order: data, totalOrder: +totalOrder } });
  });
}
