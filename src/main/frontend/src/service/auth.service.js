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
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", response.data.username);
        localStorage.setItem("Authorization", response.headers.get("Authorization"));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("Authorization");
  return null;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;