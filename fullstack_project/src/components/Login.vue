@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
<template>
    <div class="back">
    <div class="login">
        <h1>Log in</h1>
        <div class="flexb">
        <div class="test">Name: <br><br> Password:</div>
        <div class="test"><input type = "text" pattern="[A-Z]{1}[a-z]{1,}" name = "first_name"> <br><br>
       <input type = "password" pattern="[A-Z]{1}[a-z]{1,}" name = "first_name">
        </div>
        </div>
        <div class="button">
            <button>Log in</button>
            <button>New user</button>
        </div>

    </div>
    </div>
</template>

<script>


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
        font-weight: normal;
        font-family: 'Monsterrat', sans-serif;

    }
    .flexb{
        display: flex;
        align-items: center;
        justify-content: center;


    }
    input{
        background: linear-gradient( lightgrey, grey);
        height: 20px;
        font-size: 15px;
        font-family: 'Monsterrat', sans-serif;
        margin-bottom: 10px;

    }

    .test{
        padding:60px 20px 20px 20px;
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
        font-weight: lighter;
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