import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TO DO: make a POST request to the login route
  // and return the response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: "Success",
        data: {
          token: "fakeToken",
          user: {
            id: 1,
            email: userInfo.username,
            name: "Fake User",
          },
        },
      });
      reject({
        status: 401,
        message: "Unauthorized",
      });
    }, 1000);
    reject({
      status: 500,
      message: "Internal Server Error",
    });
    reject({
      status: 400,
      message: "Bad Request",
    });
    reject({
      status: 404,
      message: "Not Found",
    });
  });
  
}



export { login };
