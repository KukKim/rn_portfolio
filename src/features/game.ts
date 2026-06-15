export const fetchGames = async () => {
  return fetch(`http://127.0.0.1:3000/getgames`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json?.data;
    })
    .catch((error) => {
      throw error;
    });
};
