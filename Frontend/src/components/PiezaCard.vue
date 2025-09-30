<template>
  <div class="card mb-3" style="max-width: 100%;">
    <div class="row g-0">
      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <img :src="pieza.url_imagenes?.[0] || 'https://via.placeholder.com/150'" class="img-fluid rounded-start"
          alt="Imagen de la pieza" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">{{ pieza.numero_de_control }}</h2>
          <h5>{{ pieza.nombre }}</h5>
          <p class="card-text" v-if="pieza.ubicacion">
            <!-- si ubicacion tiene datos mostrar-->
            <strong>Ubicación:</strong> {{ pieza.ubicacion }}
          </p>
          <p class="card-text" v-if="pieza.observaciones">
            <!-- si observaciones tiene datos mostrar-->
            <strong>Observaciones:</strong> {{ pieza.observaciones }}
          </p>
          <router-link :to="`/detalle/${pieza._id}`" class="btn btn-outline-primary btn-sm">
            Ver detalles
          </router-link>
          <!-- PiezaCard.vue -->
          <button class="btn btn-warning btn-sm" @click="$emit('editar', pieza)">
            ✏️ Editar
          </button>

        </div>
      </div>
    </div>
  </div>
</template>
<style>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.img-fluid {
  height: 200px;
  object-fit: cover;
}

.btn {
  margin-right: 5px;
}
</style>
<script>
export default {
  name: 'PiezaCard',
  props: {
    pieza: {
      type: Object,
      required: true
    }
  }
};
</script>
