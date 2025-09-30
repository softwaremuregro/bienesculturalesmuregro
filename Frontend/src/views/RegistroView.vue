<template>
  <div class="container mt-4">
    <h2 class="mb-4">Registrar nueva pieza cultural</h2>

    <div class="card p-4 shadow-sm">
      <RegistroForm />
    </div>

    <router-link to="/" class="btn btn-outline-secondary mt-3">← Volver al inicio</router-link>
  </div>
</template>

<script>
import RegistroForm from '../components/RegistroForm.vue';

export default {
  name: 'RegistroView',
  components: {
    RegistroForm
  }
};
</script>

<style scoped>
/* Transición suave si decides agregarla más adelante */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
