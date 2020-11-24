@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
<template>
    <div class="back">
    <div class="login">
        <h1>LOG IN</h1>

        <form class="form"  @submit="login">

            <label >Name:   </label>
            <input type = "text" placeholder="Username"  v-model="thename"  />
            <p>Must begin with uppercase letter.</p>
            <br>

            <label>Password:    </label>

            <input type = "password"  placeholder="AxAx6x" v-model="thepass">
            <p>Requires: 6 characters, uppercase letter, lowercase letter, number</p>


            <br>


        <div class="button">
            <button type="submit">Log in</button>
            <router-link id="link" to="/register">New user</router-link>
        </div>

        </form>

        <p v-if="error.length">
        <ul class="no-bullets">
            <li v-for="e in error" v-bind:key="e.id">
                {{e}}
            </li>
        </ul>

        </p>

    </div>
    </div>
</template>

<script>

  export default{
    name: 'login',
    data(){
      return{

        thename:null,
        thepass:null,
        error:[],
      }
    },
    methods:{
      login(e){
        this.error=[];
        if (this.thename && this.thepass) {
          console.log("no error");
        }
        if (!this.thename) {
          this.error.push("ERROR! User name required.")
        }
        else if(!this.validname(this.thename)){
          this.error.push('Name must begin with uppercase letter.');
          console.log(this.thename);
        }

        if (!this.thepass){
          this.error.push("ERROR! User password required.")
        }
        else if(!this.validpass(this.thepass)){
          this.error.push('Password must contain at least one lowercase letter, one uppercase letter one number, and be longer than six charaters.');
          console.log(this.thepass);
        }


        console.warn("Hello", this.error);
        e.preventDefault();
      },

      validname: function (name) {
        var re =/^(?=.*[A-Z]+.*)(?=.*[a-z]+.*)[A-Za-z]{2,}$/;
        return re.test(name);
      },

      validpass: function (password) {
        var re =/^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;
        return re.test(password);
      }


    }
  }

</script>

<style scoped>
    .back{
        background: linear-gradient( black, #242323,black);
        height: 700px;
        padding-top: 30px;
    }
    .login{
        background: linear-gradient( #242323,grey);
        width: 50%;
        margin-left: 26%;
        margin-top: 30px;
        height: auto;
        color: grey;
        font-weight: bolder;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    h1{
        background: linear-gradient( #cb48b7, #ebb446);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
        font-weight: revert;
        font-family: 'Monsterrat', sans-serif;

    }

    input{
        background: linear-gradient( lightgrey, grey);
        height: 20px;
        font-size: 15px;
        font-family: 'Monsterrat', sans-serif;
        margin-bottom: 2px;

    }

    .form{
        padding:50px 20px 5px 20px;
        flex-basis: 100px;
        font-size: 19px;
        font-family: 'Monsterrat', sans-serif;
    }

    .button{
        display: grid;
        align-items: center;
        justify-content: center;
    }
    button{
        font-family: 'Monsterrat', sans-serif;
        font-size: 19px;
        font-family: 'Monsterrat', sans-serif;
        font-weight: bold;
        border: 2px grey ;
        border-radius: 2px;
        float: left;
        background: linear-gradient( #cb48b7, #ebb446);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
       padding-bottom: 5px;

    }
    button:hover{
        background: linear-gradient(#ebb446, #ebb446);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    #link{
        font-family: 'Monsterrat', sans-serif;
        font-size: 19px;
        font-family: 'Monsterrat', sans-serif;
        font-weight: bold;
        border: 2px grey ;
        border-radius: 2px;
        float: left;
        background: linear-gradient( #cb48b7, #ebb446);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
    }

    #link:hover{
           background: linear-gradient(#ebb446, #ebb446);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
       }

    p{
        font-size:small;
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