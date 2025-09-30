<template>
  <div class="container mt-4">
    <h2 class="mb-4">Control Interno</h2>
    <input
      v-model="busqueda"
      @input="filtrarPiezas"
      type="text"
      class="form-control mb-3"
      placeholder="Buscar por nombre o número de control"
    />
    <div class="row">
      <PiezaCard
        v-for="pieza in piezasFiltradas"
        :key="pieza._id"
        :pieza="pieza"
        @editar="abrirModal"
      />
    </div>

    <!-- Modal de edición -->
    <div v-if="mostrarModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content p-3">
          <h5 class="modal-title">Editar pieza</h5>
          <form @submit.prevent="actualizarPieza">
            <!-- Número de control -->
            <label class="form-label">Número de control</label>
            <input v-model="piezaSeleccionada.numero_de_control" class="form-control mb-2" placeholder="Número de control" />

            <!-- Nombre -->
            <label class="form-label">Nombre</label>
            <input v-model="piezaSeleccionada.nombre" class="form-control mb-2" placeholder="Nombre de la pieza" />

            <!-- Materia prima -->
            <label class="form-label">Materia prima</label>
            <input v-model="piezaSeleccionada.materia_prima" class="form-control mb-2" placeholder="Materia prima" />

            <!-- Cultura -->
            <label class="form-label">Cultura</label>
            <input v-model="piezaSeleccionada.cultura" class="form-control mb-2" placeholder="Cultura" />

            <!-- Procedencia -->
            <label class="form-label">Procedencia</label>
            <input v-model="piezaSeleccionada.procedencia" class="form-control mb-2" placeholder="Procedencia" />

            <!-- Ubicación -->
            <label class="form-label">Ubicación</label>
            <input v-model="piezaSeleccionada.ubicacion" class="form-control mb-2" placeholder="Ubicación" />

            <!-- Observaciones -->
            <label class="form-label">Observaciones</label>
            <textarea v-model="piezaSeleccionada.observaciones" class="form-control mb-2" placeholder="Observaciones"></textarea>

            <!-- Imágenes nuevas -->
            <label class="form-label">Imágenes nuevas</label>
            <input type="file" multiple @change="manejarImagenes" class="form-control mb-2" />

            <!-- Imágenes actuales -->
            <div v-if="piezaSeleccionada.imagenes && piezaSeleccionada.imagenes.length">
              <p class="fw-bold">Imágenes actuales:</p>
              <div class="d-flex flex-wrap gap-2">
                <img
                  v-for="(img, index) in piezaSeleccionada.imagenes"
                  :key="index"
                  :src="img"
                  class="img-thumbnail"
                  style="width: 100px;"
                />
              </div>
            </div>

            <div class="d-flex justify-content-end mt-3">
              <button type="submit"  class="btn btn-success me-2">Guardar</button>
              <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="mostrarModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';
import PiezaCard from '../components/PiezaCard.vue';

export default {
  components: { PiezaCard },
  data() {
    return {
      piezas: [],
      piezasFiltradas: [],
      busqueda: '',
      piezaSeleccionada: null,
      mostrarModal: false,
      nuevasImagenes: [],
    };
  },
  methods: {
    async obtenerPiezas() {
      try {
      const response = await axios.get('https://appbienesculturales-organizado-1.onrender.com/api/control_interno');
      this.piezas = response.data;
      this.piezasFiltradas = response.data;
      console.log('✅ Piezas cargadas:');
      this.piezas.forEach(p => console.log(p));
      } catch (error) {
        console.error('Error al cargar piezas:', error);
      }
    },
    filtrarPiezas() {
      const termino = this.busqueda.toLowerCase();
      this.piezasFiltradas = this.piezas.filter(pieza =>
        pieza.nombre?.toLowerCase().includes(termino) ||
        pieza.numero_de_control?.toLowerCase().includes(termino)
      );
    },
    abrirModal(pieza) {
      this.piezaSeleccionada = { ...pieza };
      this.nuevasImagenes = [];
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.piezaSeleccionada = null;
      this.nuevasImagenes = [];
    },
    manejarImagenes(event) {
      this.nuevasImagenes = Array.from(event.target.files);
    },
    async actualizarPieza() {
      try {
        const formData = new FormData();
        formData.append('numero_de_control', this.piezaSeleccionada.numero_de_control || '');
        formData.append('nombre', this.piezaSeleccionada.nombre || '');
        formData.append('materia_prima', this.piezaSeleccionada.materia_prima || '');
        formData.append('cultura', this.piezaSeleccionada.cultura || '');
        formData.append('procedencia', this.piezaSeleccionada.procedencia || '');
        formData.append('ubicacion', this.piezaSeleccionada.ubicacion || '');
        formData.append('observaciones', this.piezaSeleccionada.observaciones || '');

        this.nuevasImagenes.forEach(file => {
          formData.append('imagenes', file);
        });

        const response = await axios.put(
          `https://appbienesculturales-organizado-1.onrender.com/api/control_interno/${this.piezaSeleccionada._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const index = this.piezas.findIndex(p => p._id === this.piezaSeleccionada._id);
        this.piezas[index] = response.data;
        this.cerrarModal();
        alert('✅ Pieza actualizada correctamente');
      } catch (error) {
        console.error('❌ Error al actualizar:', error);
        alert('Hubo un problema al guardar los cambios');
      }
    }
  },
  mounted() {
    this.obtenerPiezas();
  }
};
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}
.modal {
  z-index: 1050;
}
</style>
