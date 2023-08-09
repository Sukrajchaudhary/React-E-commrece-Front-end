// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userID) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:800/orders/?user/'+userID);
      if (!response.ok) {
        // If the response status is not in the range 200-299, it means there's an error
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  });
}

// 
export function fetchLoggedInUserInfo() {
  return new Promise( async(resolve) =>{
  const response =await fetch('http://localhost:800/users/own');
  const data=await response.json()
  resolve({data})
   } );
}

// 
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:800/users/'+update.id, {
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