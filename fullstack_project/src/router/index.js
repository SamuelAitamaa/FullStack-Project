import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home",
      icon: "/logos.png"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      title: "Profile",
      icon: "/logos.png"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: "Login",
      icon: "/logos.png"
    }
  },
  {
    path:'/register',
    name:'Register',
    component:() => import('../views/RegisterView.vue'),
    meta: {
      title: "Register",
      icon: "/logos.png"
    }
  },
  {
    path:'/changepassword',
    name:'ChangePassword',
    component:() => import('../views/ChangePasswordView.vue'),
    meta: {
      title: "Change Password",
      icon: "/logos.png"
    }
  },
  {
    path:'/changeusername',
    name:'ChangeUsername',
    component:() => import('../views/ChangeUsernameView.vue'),
    meta: {
      title: "Change Username",
      icon: "/logos.png"
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
