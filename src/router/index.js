import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '../views/SignupPage.vue';
import LoginPage from '../views/LoginPage.vue';
import BookingPage from '../views/BookingPage.vue';
import BookingRider from '../views/BookingRider.vue';
import LogoutPage from '../views/LogoutPage.vue';
import TrackingPage from '../views/TrackingPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', component: SignupPage },
  { path: '/login', component: LoginPage },
  { path: '/booking', component: BookingPage },
  { path: '/rider/booking', component: BookingRider },
  { path: '/logout', component: LogoutPage },
  { path: '/tracking', component: TrackingPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
