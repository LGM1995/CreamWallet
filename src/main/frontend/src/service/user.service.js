import axios from "axios";

const API_URL = "/api/";
//
const getCreams = (username, token) => {
  return axios.get(API_URL + username, {
    headers: {
      Authorization:token
    }
  });
};

// const getUserBoard = () => {
//   return axios.get(API_URL + "user");
// };
//
// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod");
// };
//
// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin");
// };
//
const UserService = {
  getCreams,
//   getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
}

export default UserService;