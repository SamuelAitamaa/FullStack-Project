<template>
  <div class="back">
    <div class="register">
      <h1>REGISTER</h1>

      <form class="form" @submit="login">

        <label class="test" for="username">Name: </label>
        <input type="text" placeholder="Username" v-model="thename" id="username"/>
        <p>Must begin with uppercase letter.</p>
        <br>

        <label for="password">Password: </label>
        <input type="password" placeholder="AxAx6x" v-model="thepass" id="password">
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

    </div>
  </div>

</template>

<script>

export default {
  name: 'registration',
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
  background: linear-gradient(black, #242323, black);
  height: 700px;
  padding-top: 30px;

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