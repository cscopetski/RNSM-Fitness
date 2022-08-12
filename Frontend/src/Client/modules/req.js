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

/*

This is fucking stupid, but multer makes it so we cant use the content-type header to upload a file
I think I have a solution idc rn

*/

/*
export async function postImage(url = "", data = {}, err = "") {
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin": "https://localhost:5000",
    },
    body: data,
  });

  if (resp.status !== 200) {
    throw new Error(err);
  } else {
    return resp.json();
  }
}

export async function get(url = "", err = "") {
  const resp = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:5000",
    },
  });
  if (resp.status !== 200) {
    if (resp.status === 403) {
      throw new Error(403);
    }
    throw new Error(err);
  } else {
    return resp.json();
  }
}
*/