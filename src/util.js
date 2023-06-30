export const axiosConfig = (url, data, token) => {
  console.log("local axios called!");

  return {
    method: "post",
    url: `https://crm-api-emse.onrender.com/message_camapign/${url}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    data,
  };
};

export const axiosGetConfig = (url, token) => {
  console.log("local axios get req called!");

  return {
    method: "get",
    url: `https://crm-api-emse.onrender.com/message_camapign/${url}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };
};
