<template>
  <div class="back">
    <Nav />
    <div class="changepassword">
      <h1>Change Password</h1>

      <form class="form" @submit.prevent="register">
    <div class="textfields">
        <label for="password">Password: </label>
        <br>
        <input type="password" placeholder="Current password" v-model="userpassword" id="password">
        <br>

        <label for="newPassword">New Password: </label>
        <br>
        <input type="password" placeholder="New password" v-model="newPassword" id="newPassword">
        <br>

        <label for="passwordRepeat">Repeat New Password: </label>
        <br>
        <input type="password" placeholder="Repeat new password..." v-model="repeatPassword" id="passwordRepeat">
        <br>
        <p>Requires: 6 characters, uppercase letter, lowercase letter, number</p>
        <br>
    </div>

        <div class="button">
          <button type="submit">Change Password</button>
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
  name: 'ChangePassword',
  components: {
    Nav
  },
  data() {
    return {
      username: null,
      userpassword: null,
      newPassword: null,
      repeatPassword: null,
      error: []
    }
  },
  created: function () {
    if (this.$store.state.user === null) {
      this.$router.push("/login");
    } else {
      this.username = this.$store.state.user[1]
    }
  },
  methods: {
    register() {
      this.error = [];

      if (!this.userpassword) {
        this.error.push("ERROR! User password required.")
      }

      if (!this.newPassword) {
        this.error.push("ERROR! New password required.")
      } else if (!this.validPass(this.newPassword)) {
        this.error.push('Password must contain at least one lowercase letter, one uppercase letter one number, and be longer than six characters.');
        console.log("Password is not valid");
      }

      if (!this.repeatPassword) {
        this.error.push("ERROR! Password must be repeated.")
      } else if (this.repeatPassword !== this.newPassword) {
        this.error.push('Repeated password must match the with the new password.');
        console.log("Password is not valid");
      }

      if (this.error.length === 0) {
        console.log("Everything OK");
        this.saveNewPasswordToDb();
      }
    },

    validPass: function (password) {
      let re = /^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;
      return re.test(password);
    },

    async saveNewPasswordToDb() {
      let url;
      try {
        url = 'http://localhost:8081/backend/changepassword'
        console.log(url)
        axios.post(url, {
          headers: {},
          username: this.username,
          userpassword: this.userpassword,
          newPassword: this.newPassword,
        }).then(res => {
          console.log(res);
          if (res.data === "Success") {
            this.error.push('Changing password complete!');
          } else {
            this.error.push('Something went wrong. Check your current password.');
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
.changepassword {

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
  margin-bottom: 20px;
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
  height: 30px;
  font-size: 25px;
  margin-bottom: 30px;
  border-bottom: 2px solid white;
}
.form {
  padding-top: 20px;
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
  font-size: 20px;
  color:#ebb446;
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