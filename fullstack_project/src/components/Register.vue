<template>
  <div class="back">
    <Nav></Nav>
    <div class="register">
      <h1>REGISTER</h1>

      <form class="form" @submit="login">

        <label class="test" for="username">Name: </label>
        <input type="text" placeholder="Username" v-model="username" id="username"/>
        <h3>Must begin with uppercase letter.</h3>
        <br>

        <label for="password">Password: </label>
        <input type="password" placeholder="AxAx6x" v-model="userpassword" id="password">
        <h3>Requires: 6 characters, uppercase letter, lowercase letter, number</h3>
        <br>

        <label for="password">Repeat password: </label>
        <input type="password" placeholder="Password (repeat)" v-model="passwordrepeat" id="passwordrepeat">
        <br>

        <div class="button">
          <button type="submit">Register</button>
        </div>
      </form>

      <div v-if="error.length">
        <ul class="no-bullets">
          <li v-for="e in error" v-bind:key="e.id">
            {{ e }}
          </li>
          <p v-if="msg">{{ msg }}</p>
        </ul>
      </div>

    </div>
  </div>

</template>

<script>

import Nav from './Nav';
import AuthService from '@/services/AuthService.js';

export default {
  name: 'registration',
  components: {
    Nav
  },
  data() {
    return {
      username: null,
      userpassword: null,
      passwordrepeat: null,
      msg: '',
      error: []
    }
  },
  methods: {
    login(e) {
      this.error = [];
      if (this.username && this.userpassword) {
        console.log("no error");
        console.warn("Hello", this.error);
        this.signUp();
      }
      if (!this.username) {
        this.error.push("ERROR! User name required.")
      } else if (!this.validname(this.username)) {
        this.error.push('Name must begin with uppercase letter.');
        console.log(this.username);
      }

      if (!this.userpassword) {
        this.error.push("ERROR! User password required.")
      } else if (!this.validpass(this.userpassword)) {
        this.error.push('Password must contain at least one lowercase letter, one uppercase letter one number, and be longer than six characters.');
        console.log(this.userpassword);
      }

      e.preventDefault();

    },

    async signUp()
    {
      try {
        const credentials = {
          username: this.username,
          userpassword: this.userpassword,
          passwordrepeat: this.passwordrepeat,
        };
        console.log(credentials);
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;


      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },

    validname: function (name) {
      let re = /^(?=.*[A-Z]+.*)(?=.*[a-z]+.*)[A-Za-z]{2,}$/;
      return re.test(name);
    },

    validpass: function (password) {
      let re = /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;
      return re.test(password);
    }


  }
}


</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.back {
  background: linear-gradient(to right, black, #242323);
  height: 700px;
  min-height: 100vh;
}
.register {
  background: linear-gradient(#242323, dimgrey);
  width: 50%;
  margin-left: 26%;
  margin-top: 120px;
  height: auto;
  color: white;
  padding: 50px 20px 50px 20px;
  border:3px solid #ebb446 ;
  border-radius: 7px;
  font-family: 'Monsterrat', sans-serif;
}

h1, h3{
  color: white;
  padding: 20px;
}
input {
  background: linear-gradient(lightgrey, grey);
  height: 45px;
  font-size: 30px;
  margin-bottom: 2px;
}
label{
  color: white;
  font-size: xx-large;
  font-weight: bolder;
}

.form {
  padding: 50px 20px 20px 20px;
  flex-basis: 100px;
  font-size: 19px;
}
.button {
  display: grid;
  align-items: center;
  justify-content: center;

}
button {
  font-size: 40px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  background:  linear-gradient(orange, #ebb446);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 5px;
  cursor: pointer;
}
button:hover {
  background: linear-gradient(#ebb446, #ebb446);
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
  font-size: small;
  color: darkgray;
  font-weight: lighter;
}
</style>