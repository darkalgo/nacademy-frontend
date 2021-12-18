import axios from "axios";

const BaseAPI = axios.create({
  baseURL: process.env.REACT_APP_BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export { BaseAPI };
