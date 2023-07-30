// user created
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(" http://localhost:800/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
// user signup
export function checkUser(logininfo) {
  return new Promise(async (resolve, reject) => {
    const email = logininfo.email;
    const password = logininfo.password;
    const response = await fetch(" http://localhost:800/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials:" });
      }
    } else {
      reject({ message: "User Not Found:" });
    }
  });
}



//Logout
export function signOut(userID) {
  return new Promise(async (resolve) => {
   
  //  Todo://
    resolve({ data:'sussess' });
  });
}

