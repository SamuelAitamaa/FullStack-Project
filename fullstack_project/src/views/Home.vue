<template>
  <div class="home">
    <div>
      <h1>Hi {{ username }}</h1>
      <p>{{ secretMessage }}</p>
      <input type="button" value="Logout" @click="logout" />
    </div>
    <Main />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue'
import AuthService from '@/services/AuthService.js';
export default {
  name: 'Home',
  components: {
    Main
  },
  data() {
    return {
      secretMessage: '',
      username: ''
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }

  this.username = this.$store.getters.getUser.username;
  this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
  logout() {
    this.$store.dispatch('logout');
    this.$router.push('/login');
  }
}
};
</script>
