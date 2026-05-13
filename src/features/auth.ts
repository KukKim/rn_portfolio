import { Auth } from "../types/auth";

export const requestCheckToken = (token: string) => {
  return fetch("http://localhost:3000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log("error?" + error);
      console.error(error);
    });
};

export const requestSignup = (signupData: Auth) => {
  return fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

// TODO: 후에 POST 로 변경 필요. POST에서 SSL로 변경
export const requestSignin = (signinData: Auth) => {
  return fetch(
    `http://127.0.0.1:3000/signin?email=${signinData.email}&password=${signinData.password}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};
