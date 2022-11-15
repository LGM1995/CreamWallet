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

const scoop = (menu, date, temperature, state, username, token) => {
  return axios.post(API_URL + username + "/scoop", {
    menu,
    date,
    temperature,
    state,
  }, {
    headers: {
      Authorization:token
    }
  })
}

const updateCream = (id, menu, date, temperature, state) => {
  return axios.post(API_URL + localStorage.getItem("user") + "/update/" + id , {
    id,
    menu,
    date,
    temperature,
    state,
  }, {
    headers: {
      Authorization:localStorage.getItem("Authorization")
    }
  })
}

const deleteCream = (id) => {
  return axios.delete(API_URL + localStorage.getItem("user") + "/delete/" + id, {
    headers: {
      Authorization:localStorage.getItem("Authorization")
    }
  })
}

const CreamService = {
  getCreams,
  scoop,
  deleteCream,
  updateCream,
//   getAdminBoard,
}

export default CreamService;