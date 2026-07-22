import axios from "axios";

const API = axios.create({
  baseURL: "https://mazi-city-project-1.onrender.com/api",
});

export default API;