import { Auth } from "../types/auth";

export const requestSignup = (signupData: Auth) => {
  console.log("signupData - ", signupData);
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
