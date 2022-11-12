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

const scoop = (menu, date, temperature, state, user_id, username) => {
  return axios.post(API_URL + username + "scoop", {
    menu,
    date,
    temperature,
    state,
    user_id
  })
}

const CreamService = {
  getCreams,
  scoop,
//   getModeratorBoard,
//   getAdminBoard,
}

export default CreamService;