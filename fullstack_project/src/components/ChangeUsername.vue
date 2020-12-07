<template>
  <div class="back">
    <Nav />
    <div class="changeusername">
      <h1>Change Username</h1>

      <form class="form" @submit.prevent="register">
        <div class="textfields">
          <label for="newUsername">New username: </label>
          <br>
          <input placeholder="New username" v-model="newUsername" id="newUsername">
          <br>
          <p>Must begin with uppercase letter.</p>
        </div>
        <div class="button">
          <button type="submit">Change Username</button>
        </div>
      </form>

      <div class="errorMessage" v-if="error.length > 0">
            {{ error }}
      </div>
      <div class="availableMessage" v-else>
        {{availableMessage}}
      </div>
    </div>
  </div>

</template>

<script>
import Nav from "@/components/Nav";
import axios from 'axios';
export default {
  name: 'ChangeUsername',
  components: {
    Nav
  },
  data() {
    return {
      username: null,
      newUsername: null,
      error: '',
      availableMessage: '',
      availability: Boolean
    }
  },
  created: function () {
    if (this.$store.state.user === null) {
      this.$router.push("/login");
    }
  },
  methods: {
     register() {
      this.error = ''
       this.username = this.$store.state.user[1]
      if (this.newUsername === this.username) {
        this.error = 'Name already in your usage!'
      } else if (!this.newUsername) {
        this.error = 'Set a new username'
      } else if (!this.validName(this.newUsername)) {
        this.error = 'Name must begin with uppercase letter and must contain only characters.'
      }

      if (this.error.length === 0 && this.checkAvailability) {
          this.saveNewUsernameToDb();
        }
      },

    async checkAvailability() {
      let url;
      try {
        url = 'http://localhost:8081/backend/checkavailability'
        console.log(url)
        axios.get(url, {
          params: {
            headers: {},
            newUsername: this.newUsername,
          }
        }).then(res => {
          console.log(res);
          if (res.data === "Success") {
            this.availableMessage = "Available"
            console.log("Available")
            return true
          } else {
            this.availableMessage = "Not available"
            console.log("Not available")
            return false
          }
        }).catch(err => {
          console.log(err.response);
        });
      } catch (error) {
        console.log('Error in async: ' + error);
      }
    },

    async saveNewUsernameToDb() {
      let url;
      try {
        url = 'http://localhost:8081/backend/changeusername'
        console.log(url)
        axios.post(url, {
          headers: {},
          username: this.username,
          newUsername: this.newUsername,
        }).then(res => {
          console.log(res);
          if (res.data === "Success") {
            this.availableMessage = 'Changing username complete!';
            this.$store.state.user[1] = this.newUsername
          } else {
            this.availableMessage = 'Username not available!';
          }
        }).catch(err => {
          console.log(err.response);
        });
      } catch (error) {
        console.log('Error in async: ' + error);
      }
    },
    validName: function (name) {
      let re = /^(?=.*[A-Z]+.*)(?=.*[a-z]+.*)[0-9A-Za-z]{2,}$/;
      return re.test(name);
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
.changeusername {
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
.availableMessage, .errorMessage {
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