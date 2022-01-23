import { createWebHistory, createRouter } from "vue-router"
import store from '../store';
import Login from '../views/Login'
import Home from '../views/UserList'


const routes = [
  {
    // route where admin can edit users (auth required)
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    // route for login 
    path: '/login',
    name: "Login",
    component: Login,
    meta: { guest: true },
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// checking for authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login")
  } 
  else {
    next()
  }
});

// checking if guest
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/")
      return
    }
    next()
  } 
  else {
    next()
  }
});

export default router
