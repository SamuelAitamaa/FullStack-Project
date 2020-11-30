import axios from 'axios';
const url ='http://localhost:3000/api';

export default {
  login(credentials) {
    return axios
    .post( url + 'login', credentials)
    .then(response => {
      console.log('Testing login in AuthService.js');
      response.data
    });
  },
  signUp(credentials) {
    return axios
    .post(url + 'register', credentials)
    .then(response => {
      console.log('Testing singUp in AuthService.js');
      response.data
    }).catch(err => {
      console.log(err);
      console.log(url + 'register');
    });
  },
  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  }
};