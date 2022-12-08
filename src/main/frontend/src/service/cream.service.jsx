import axios from "axios";

const API_URL = "/api/";
//
const getCreams = (username, token, year) => {
  return axios.get(API_URL + username + "/" + year, {
    headers: {
      Authorization:token
    }
  });
};

const getCost = (username, token, year) => {
  return axios.get(API_URL + username +"/cost/" + year, {
    headers: {
      Authorization:token
    }
  });
};

const getYearList = (username, token) => {
  return axios.get(API_URL + username +"/yearlist", {
    headers: {
      Authorization:token
    }
  });
};

const scoop = (username, menu, date, temperature, state) => {
  return axios.post(API_URL + username + "/scoop", {
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

const updateCream = (id, menu, date, temperature, state) => {
  return axios.patch(API_URL + localStorage.getItem("user") + "/update/" + id , {
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
  getCost,
  getYearList,
  scoop,
  deleteCream,
  updateCream,
}

export default CreamService;