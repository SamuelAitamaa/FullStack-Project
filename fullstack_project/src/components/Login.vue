

<template>
  <div class="back">
    <Nav></Nav>
    <div class="login">
      <h1>LOG IN</h1>

      <form class="form" @submit="login">

        <label for="username">Name: </label>
        <input type="text" placeholder="Username" v-model="thename" id="username"/>
        <h3>Must begin with uppercase letter.</h3>
        <br>

        <label for="password">Password: </label>
        <input type="password" placeholder="AxAx6x" v-model="thepass" id="password">
        <h3>Requires: 6 characters, uppercase letter, lowercase letter, number</h3>
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
import Nav from './Nav';
export default {
  name: 'login',
  components: {
    Nav
  },
  data() {
    return {
      thename: null,
      thepass: null,
      error: [],
    }
  },
  methods: {
    login(e) {
      this.error = [];
      if (this.thename && this.thepass) {
        console.log("no error");
      }
      if (!this.thename) {
        this.error.push("ERROR! User name required.")
      } else if (!this.validname(this.thename)) {
        this.error.push('Name must begin with uppercase letter.');
        console.log(this.thename);
      }

      if (!this.thepass) {
        this.error.push("ERROR! User password required.")
      } else if (!this.validpass(this.thepass)) {
        this.error.push('Password must contain at least one lowercase letter, one uppercase letter one number, and be longer than six characters.');
        console.log(this.thepass);
      }


      console.warn("Hello", this.error);
      e.preventDefault();
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
.login {
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
label{
  color: white;
  font-size: xx-large;
  font-weight: bolder;
}

input {
  background: linear-gradient(lightgrey, grey);
  height: 45px;
  font-size: 30px;
  margin-bottom: 2px;
}
.form {
  padding: 50px 20px 5px 20px;
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

}
button:hover {
  background: linear-gradient(#ebb446, #ebb446);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#link {
  font-size: 40px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  background:linear-gradient(orange, #ebb446);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}
#link:hover {
  background: linear-gradient(#ebb446, #ebb446);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
p {
  font-size: small;
  color: darkgray;
  font-weight: lighter;
}
ul.no-bullets {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: linear-gradient(to right, #ebb446, orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>