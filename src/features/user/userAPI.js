// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userID) {
  return new Promise( async(resolve) =>{
  const response =await fetch('http://localhost:800/orders/?users.id='+userID);
  const data=await response.json()
  resolve({data})
   } );
}
// 
export function fetchLoggedInUserInfo(userID) {
  return new Promise( async(resolve) =>{
  const response =await fetch('http://localhost:800/users/'+userID);
  const data=await response.json()
  resolve({data})
   } );
}

// 
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(" http://localhost:800/users/"+update.id, {
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