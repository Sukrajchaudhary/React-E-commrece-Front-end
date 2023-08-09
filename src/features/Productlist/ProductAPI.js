export function fetchAllproducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:800/products");

    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProuctsByFilters(filter, sort, pagination, admin) {
  let querystring = "";

  // Handle filters
  //tODO:server will filter deleted products
  for (let key in filter) {
    const categoryValues = filter[key];
    if (Array.isArray(categoryValues) && categoryValues.length > 0) {
      categoryValues.forEach((value) => {
        querystring += `${key}=${value}&`;
      });
    }
  }

  // Handle sorting
  for (let key in sort) {
    querystring += `${key}=${sort[key]}&`;
  }

  // Handle pagination
  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    querystring += `admin=true`;
  }
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        "http://localhost:800/products?" + querystring
      );
      const data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count");
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      // Handle error appropriately, e.g., logging, error message, etc.
      console.error("Error fetching products:", error);
      resolve({ data: { products: [], totalItems: 0 } });
    }
  });
}

// fteching product by category
export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(" http://localhost:800/categeory");
    const data = await response.json();
    resolve({ data });
  });
}

// fetching brands
export function fetchAllbrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:800/brans");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductBYId(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:800/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:800/products/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
// update Product

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:800/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
