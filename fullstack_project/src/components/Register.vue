<template>
  <div class="back">
    <Nav />
    <div class="register">
      <h1>REGISTER</h1>

      <form class="form" @submit.prevent="register">

        <label for="username">Name: </label>
        <input type="text" placeholder="Username" v-model="username" id="username"/>
        <p>Must begin with uppercase letter. Must contain at least two letters. No special characters.</p>
        <br>

        <label for="password">Password: </label>
        <input type="password" placeholder="AxAx6x" v-model="userpassword" id="password">
        <p>Requires: 6 characters, uppercase letter, lowercase letter, number. No special characters.</p>
        <br>

        <label for="passwordRepeat">Repeat New Password: </label>
        <input type="password" placeholder="Repeat password..." v-model="repeatPassword" id="passwordRepeat">
        <p>Requires: 6 characters, uppercase letter, lowercase letter, number</p>

        <div class="button">
          <button type="submit">Register</button>
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
import axios from 'axios';
export default {
  name: 'registration',
  components: {
    Nav
  },
  data() {
    return {
      username: null,
      userpassword: null,
      repeatPassword: null,
      error: []
    }
  },
  methods: {
    /**
     * Checks all the input fields for validity. If something is not valid, an error message will be printed which
     * details the problem that the user has made. If everything is valid, the error message will be empty and
     * in this case the users information (username and password) will be saved to the database.
     */
    register() {
      this.error = [];

      if (!this.username) {
        this.error.push("ERROR! Username required.");
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

      if (!this.repeatPassword) {
        this.error.push("ERROR! Password must be repeated.")
      } else if (this.repeatPassword !== this.userpassword) {
        this.error.push('Repeated password must match the with the password.');
        console.log("Password is not valid");
      }

      if(this.error.length === 0){
        console.log("Everything OK");
        this.saveUserToDatabase();
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
     * Makes a string of the current date
     * @returns {string} current date
     */
    getDate: function () {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();

      return mm + '-' + dd + '-' + yyyy;
    },
    /**
     * Saves the user to the database by making a post request with the users information as data.
     * @returns {Promise<void>}
     */
    async saveUserToDatabase() {
      let url;
      try {
        url = 'http://localhost:8081/backend/register'
        console.log(url)
        axios.post(url, {
          username: this.username,
          userpassword: this.userpassword,
          registered: this.getDate()
        }).then(res => {
          console.log(res);
          if(res.data === "Success"){
            this.error.push('Registration complete!');
            this.$router.push("/login");
          }else{
            this.error.push('Username has been taken, please use a different username.');
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
.register {
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