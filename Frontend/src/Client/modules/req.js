import axios from "axios";
axios.defaults.withCredentials = true;

let createErrorObject = (error) => {
  let errorServerMessage = error.response.data;
  let errorStatusCode = error.response.status;

  if (errorStatusCode === 500) {
    errorServerMessage = "Internal Server Error";
  };

  return {
    message: errorServerMessage,
    code: errorStatusCode
  };
}

export let AxiosInstance = axios.create({
  baseURL: process.env.AXIOS_BASE_URL,
  withCredentials: true,
  credentials: "include"
});

export async function axiosPost(url = "", data = {}, err = "") {
  return await AxiosInstance.post(url, data)
    .then(response => {
      const responseData = response.data;
      return responseData;
    })
    .catch(error => {
      console.log(process.env.AXIOS_BASE_URL);
      throw createErrorObject(error);
    })
}

export async function axiosGet(url = "") {
  return await AxiosInstance.get(url)
    .then(response => {
      const responseData = response.data;
      return responseData;
    })
    .catch(error => {
      throw createErrorObject(error);
    })
}