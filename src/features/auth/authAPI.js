// user created
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(" http://localhost:800/auth/signup", {
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
    try {
      const response = await fetch("http://localhost:800/auth/login", {
        method: "POST",
        body: JSON.stringify(logininfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error); // Assuming the server returns error data in JSON format
      }
    } catch (error) {
      reject(error);
    }
  });
}

//Logout
export function signOut(userID) {
  return new Promise(async (resolve) => {
    //  Todo://
    resolve({ data: "sussess" });
  });
}


// resetPassword
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:800/auth/reset-password-request",{
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error); // Assuming the server returns error data in JSON format
      }
    } catch (error) {
      reject(error);
    }
  });
}
// for setting a New user Password
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:800/auth/reset-password",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error); // Assuming the server returns error data in JSON format
      }
    } catch (error) {
      reject(error);
    }
  });
}
