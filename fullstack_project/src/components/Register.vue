@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

<template>
    <div class="back">
        <div class="login">
            <h1>Log in</h1>
            <form class="form">
                <label class="test">Name:   </label>
                <input type = "text"  v-model="thename"  >

                <br><br>

                <label>Password:    </label>
                <input type = "password" v-model="thepass">
                <br><br>

            </form>
            <div class="button">
                <button v-on:click="regg">Register</button>

            </div>

        </div>
    </div>

</template>

<script>
  //<div id="reg" class="test">
    export default{
      name: 'registration',
      data(){
        return{
          thename:' ',
          thepass:''
        }
      },
      methods:{
        regg: function() {

          if (this.thename && this.thepass) {
            console.log("Name: "+ this.thename + " Password: "+this.thepass)
          }
          if (!this.thename) {
            alert('Name required.');
          }
          if (!this.thepass) {
            alert('Password required.');
          }
        }/*,
        validpass: function (email) {
          var re = //;
          return re.test(email);
        }*/
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
        height: 300px;
        color: grey;
        font-weight: bolder;
        padding-top: 10px;
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
        margin-bottom: 10px;

    }
    label{
        padding-right: 10px;
    }

    .form{
        padding:50px 20px 20px 20px;
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


</style>