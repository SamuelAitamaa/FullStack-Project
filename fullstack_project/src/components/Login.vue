<template>
  <div class="back">
    <Nav />
    <div class="login">
      <h1>LOG IN</h1>

      <form class="form" @submit.prevent="validation">

        <label for="username">Name: </label>
        <input type="text" placeholder="Username" v-model="username" id="username"/>
        <p>Must begin with uppercase letter. Must contain at least two letters. No special characters.</p>
        <br>

        <label for="password">Password: </label>
        <input type="password" placeholder="AxAx6x" v-model="userpassword" id="password">
        <p>Requires: 6 characters, uppercase letter, lowercase letter, number. No special characters.</p>
        <br>

        <div class="button">
          <button type="submit">Log in</button>
          <router-link id="link" to="/register">New user</router-link>
        </div>

      </form>

      <div v-if="error.length">
        <ul class="no-bullets">
          <li v-for="e in error" v-bind:key="e.id">
            {{ e }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import axios from "axios";

export default {
  name: 'login',
  components: {
    Nav
  },
  data() {
    return {
      username: null,
      userpassword: null,
      error: []
    }
  },
  /**
   * Login "created" function redirects the user to the profile screen if the user is logged in
   */
  created: function () {
    if (this.$store.state.user !== null){
      this.$router.push("/profile");
    }
  },
  methods: {
    /**
     * Checks all the input fields for validity. If something is not valid, an error message will be printed which
     * details the problem that the user has made. If everything is valid, the error message will be empty and
     * in this case the the user information will be sent to the database and the database checks if there is
     * a user with the correct information and send a "Success" message if the database has exact same information what
     * the user had provided.
     */
    validation() {
      this.error = [];
      if (this.username && this.userpassword) {
        console.log("Username and password are present");
      }
      if (!this.username) {
        this.error.push("ERROR! Username required.")
      } else if (!this.validName(this.username)) {
        this.error.push('Name must begin with uppercase letter. Must contain at least two characters. NO SPECIAL CHARACTERS.');
        console.log("Username is not valid");
      }

      if (!this.userpassword) {
        this.error.push("ERROR! User password required.")
      } else if (!this.validPass(this.userpassword)) {
        this.error.push('Password must contain at least one lowercase letter, one uppercase letter one number, and be longer than six characters. NO SPECIAL CHARACTERS.');
        console.log("Password is not valid");
      }

      if(this.error.length === 0){
        this.logIntoSite();
      }
    },
    /**
     * Checks the validity of the name with regexp
     * @param{string} name which the user has inputted
     * @returns {boolean} true if the name goes through the regexp, else false
     */
    validName: function (name) {
      let re = /^(?=.*[A-Z]+.*)[0-9A-Za-z]{2,}$/;
      return re.test(name);
    },
    /**
     * Checks the validity of the password with regexp
     * @param{string} password which the user has inputted
     * @returns {boolean} true if the password goes through the regexp, else false
     */
    validPass: function (password) {
      let re = /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;
      return re.test(password);
    },
    /**
     * Send a get request to the database which checks if it has the information the user has provided. If true
     * The user will be logged into the site and the users id will be set to Vuex store which represents the
     * "logged in" state. The list in Vuex will also be deleted since, the current users own list will be fetched
     * in the Profile view into the list. Redirects the user to his / her / their profile page.
     * @returns {Promise<void>}
     */
    async logIntoSite() {
      let url;
      try {
        url = 'http://localhost:8081/backend/login'
        console.log(url)
        axios.get(url, {
          params: {
            username: this.username,
            userpassword: this.userpassword,
          }
        }).then(res => {
          console.log(res);
          if(res.data === "Error"){
            this.error.push('Login unsuccessful, please check your username or password...');
          }else{
            let result = res.data;
            result = result.split(" ");
            this.error.push('Login successful! Your ID is: ' + result[0]);
            this.$store.commit("user", JSON.parse(JSON.stringify(result)));
            this.$store.state.movies = []
            this.$router.push("/profile");
          }
        }).catch(err => {
          console.log(err.response);
        });
      } catch (error) {
        console.log('Error in async: ' + error);
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.back {
  background: linear-gradient(black, #242323, black);
  height: 700px;
  min-height: 100vh;
}
.login {
  background-color: #171616;
  border: 2px solid #ebb446 ;
  border-radius: 3px;
  width: 50%;
  margin-left: 26%;
  margin-top: 2vh;
  height: auto;
  padding-top: 40px;
  padding-bottom: 40px;

  font-family: 'Monsterrat', sans-serif;
}
label{
  color:  #ebb446;
  font-size: 28px;
}
h1 {
  background: linear-gradient(#ebb446 , #ebb442);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 35px;
  font-weight: revert;
}
input {
  color:#ebb446;
  background-color: #242323;
  height: 35px;
  font-size: 25px;
  margin-bottom: 2px;
  border-radius: 5px;
  outline: none;
  transition: .2s ease-in-out;
  padding-left: 5px;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #ebb446;
  -webkit-box-shadow: 0 0 0 1000px #242323 inset;
}
.form {
  padding: 20px;
  flex-basis: 100px;
  font-size: 19px;
}
.button {
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
button {
  font-size: 19px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  background: #ebb446;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 5px;
  cursor: pointer;
}
button:hover {
  background: #bf4b91;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#link {
  font-size: 19px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  background: linear-gradient(#ebb446, #ebb442);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}
#link:hover {
  background: #bf4b91;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
ul.no-bullets {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: linear-gradient(to right, #ebb446, orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  margin-top: 10px;
  font-size: 15px;
  color: rgba(180, 151, 43, 0.83);
  font-weight: lighter;
}
ul li{
  font-size: 12px;
}
@media screen and (max-width: 800px){
  h1{
    padding-top: 0;
  }
  input{
    width: 180px;
    height: 20px;
    font-size: 12px;
  }
  label{
    font-size: 16px;
  }
  p{
    font-size: 12px;
  }
  @media all and (max-width: 500px) {
    input{
      width: 100px;
    }
    .back{
      min-height: 150vh;
    }
    h1{
      font-size: 20px;
    }
  }
}
</style>