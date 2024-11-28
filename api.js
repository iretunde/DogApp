import axios from "axios";

const url = "https://dog-identifier-1oq5.onrender.com/api";

const api = axios.create({
  baseURL: "https://dog-identifier-1oq5.onrender.com/api",
  timeout: 5000,
});

export const getUser = async (userId) => {
  const { data } = await axios.get(`${url}/users/${userId}`);
  return data.user;
};

export const editUserAvatar = async (userId, avatarFile) => {
  const formData = new FormData();
  formData.append("avatar", avatarFile);
  const { data } = await axios.patch(
    `${url}/users/${userId}/avatar`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return data.user;
};

export const getDogPicsByUser = async (userId) => {
  const { data } = await axios.get(`${url}/dog_pictures/user/${userId}`);
  return data.dog_pictures;
};

export const predictBreed = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  const { data } = await axios.post(`${url}/dog_pictures/predict`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const fetchUserProfile = async () => {
  const response = await api.get("/users/1");
  return response.data.user;
};

export const getLeaderboard = async () => {
  const { data } = await axios.get(`${url}/users/leaderboard`);
  return data.leaderboard;
};
// get user function
// then access the user profile
