<template>
  <div class="container mt-4" v-if="pieza">
    <h2 class="mb-3">{{ pieza.nombre }}</h2>

    <div class="row mb-4">
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item"><strong>Número de control:</strong> {{ pieza.numero_de_control }}</li>
          <li class="list-group-item"><strong>Materia prima:</strong> {{ pieza.materia_prima }}</li>
          <li class="list-group-item"><strong>Cultura:</strong> {{ pieza.cultura }}</li>
          <li class="list-group-item"><strong>Procedencia:</strong> {{ pieza.procedencia }}</li>
          <li class="list-group-item"><strong>Ubicación:</strong> {{ pieza.ubicacion }}</li>
          <li class="list-group-item"><strong>Observaciones:</strong> {{ pieza.observaciones }}</li>
        </ul>
      </div>

      <div class="col-md-6">
        <div v-if="pieza.url_imagenes?.length">
          <h5 class="mb-2">Imágenes</h5>
          <div class="row g-2">
            <div class="col-6 col-md-4" v-for="(img, index) in pieza.url_imagenes" :key="index">
              <img :src="img" class="img-fluid rounded border" alt="Imagen de la pieza" />
            </div>
          </div>
        </div>
        <div v-else class="alert alert-warning mt-3">No hay imágenes disponibles.</div>
      </div>
    </div>

    <router-link to="/" class="btn btn-outline-secondary">← Volver</router-link>
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
</template>

<script>
import { getRegistroPorId } from '../services/api';

export default {
  name: 'DetalleView',
  data() {
    return {
      pieza: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const response = await getRegistroPorId(id);
      this.pieza = response.data;
    } catch (error) {
      console.error('Error al cargar la pieza:', error);
    }
  }
};
</script>
