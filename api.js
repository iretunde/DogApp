import axios from "axios";

const api = axios.create({
  baseURL: "https://dog-identifier-1oq5.onrender.com/api",
  timeout: 5000,
});

export const fetchUserProfile = async () => {
  const response = await api.get("/users/1");
  return response.data.user;
};
// get user function
// then access the user profile
