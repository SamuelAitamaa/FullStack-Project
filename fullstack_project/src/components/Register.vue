<template>
  <div class="back">
    <Nav />
    <div class="register">
      <h1>REGISTER</h1>

      <form class="form" @submit.prevent="register">

        <label class="test" for="username">Name: </label>
        <input type="text" placeholder="Username" v-model="username" id="username"/>
        <p>Must begin with uppercase letter.</p>
        <br>

        <label for="password">Password: </label>
        <input type="password" placeholder="AxAx6x" v-model="userpassword" id="password">
        <p>Requires: 6 characters, uppercase letter, lowercase letter, number</p>
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
        </ul>
      </div>

      <div v-if="this.registry">
        <h1>Registration OK</h1>
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
      error: [],
      registry: false
    }
  },
  methods: {
    register() {
      this.error = [];
      if (this.username && this.userpassword) {
        console.log("Username and password are present");
      }
      if (!this.username) {
        this.error.push("ERROR! Username required.");
      } else if (!this.validName(this.username)) {
        this.error.push('Name must begin with uppercase letter.');
        console.log("Username is not valid");
      }

      if (!this.userpassword) {
        this.error.push("ERROR! User password required.")
      } else if (!this.validPass(this.userpassword)) {
        this.error.push('Password must contain at least one lowercase letter, one uppercase letter one number, and be longer than six characters.');
        console.log("Password is not valid");
      }

      if(this.validName(this.username) && this.username && this.validPass(this.userpassword) && this.userpassword){
        console.log("Everything OK");
        this.registry = true;
        this.saveToDatabase();
      }
    },

    validName: function (name) {
      let re = /^(?=.*[A-Z]+.*)(?=.*[a-z]+.*)[A-Za-z]{2,}$/;
      return re.test(name);
    },

    validPass: function (password) {
      let re = /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;
      return re.test(password);
    },

    getDate: function () {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();

      return mm + '-' + dd + '-' + yyyy;
    },

    async saveToDatabase() {
      console.log('Starting async');
      try {
        let url = 'http://localhost:8081/register/ok'
        console.log(url)
        axios.post(url, {
          headers: {},
          username: this.username,
          userpassword: this.userpassword,
          registered: this.getDate()
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err.response);
        });
      } catch (error) {
        console.log('Error in async: ' + error);
      } finally {
        console.log('Ending async');
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
  background: linear-gradient(#242323, grey);
  width: 50%;
  margin-left: 26%;
  margin-top: 30px;
  height: auto;
  color: grey;
  font-weight: bolder;
  padding-top: 10px;
  padding-bottom: 10px;

  font-family: 'Monsterrat', sans-serif;
}

h1 {
  background: linear-gradient(#cb48b7, #ebb446);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
  font-weight: revert;
}
input {
  background: linear-gradient(lightgrey, grey);
  height: 20px;
  font-size: 15px;
  margin-bottom: 10px;
}
label {
  padding-right: 10px;
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
  font-size: 19px;
  font-weight: bold;
  border: 2px grey;
  border-radius: 2px;
  float: left;
  background: linear-gradient(#cb48b7, #ebb446);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 5px;

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