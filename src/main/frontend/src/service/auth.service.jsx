import axios from "axios";

const API_URL = "/api/auth/";

const register = (username, password, name, email) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
    name,
    email
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  getCurrentUser,
}

export default AuthService;