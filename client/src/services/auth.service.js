import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

//建立object
class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    // console.log("123");
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
