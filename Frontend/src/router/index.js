import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegistroView from '../views/RegistroView.vue';
import DetalleView from '../views/DetalleView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/registro', name: 'Registro', component: RegistroView },
  { path: '/detalle/:id', name: 'Detalle', component: DetalleView }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
