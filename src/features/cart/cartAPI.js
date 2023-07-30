export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("   http://localhost:800/carts", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchItemsByID(userID) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:800/carts?user='+userID)
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:800/carts/"+update.id, {
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


// Delete
export function DeleteFromCart(Itemid) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:800/carts/"+Itemid, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data:{id:Itemid} });
  });
}


export function resetCart(userID) {
  return new Promise(async (resolve) => {
  const response=await fetchItemsByID(userID);
  const items=response.data;
  for(let item of items){
    await DeleteFromCart(item.id)
  }
  resolve({status:'success'})
});
}
