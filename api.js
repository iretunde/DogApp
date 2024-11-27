import axios from "axios";
export const DEFAULT_AVATAR =
  "https://dog-breed-id-ml-model.s3.us-east-1.amazonaws.com/avatars/default-avatar.jpg";

const api = axios.create({
  baseURL: "https://dog-identifier-1oq5.onrender.com/api",
  timeout: 5000,
});

export const fetchUserProfile = () =>
  api
    .get("/users/1")
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject(`Expected 200, got ${response.status}`);
      }
      return response.data;
    })
    .catch((err) => {
      console.log("API Error:", err);
      throw err;
    });
// get user function
// then access the user profile
