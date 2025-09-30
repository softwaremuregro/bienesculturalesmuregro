<template>
  <div class="container mt-4">
    <h2 class="mb-3">Registrar nueva pieza</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6 mb-3" v-for="(label, key) in campos" :key="key">
          <label :for="key" class="form-label">{{ label }}</label>
          <input
            :id="key"
            v-model="form[key]"
            type="text"
            class="form-control"
            required
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="imagenes" class="form-label">Imágenes (máx. 10)</label>
        <input
          type="file"
          id="imagenes"
          class="form-control"
          multiple
          accept="image/*"
          @change="handleFiles"
        />
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import { crearRegistro } from '../services/api';

export default {
  name: 'RegistroForm',
  data() {
    return {
      form: {
        numero_de_control: '',
        nombre: '',
        materia_prima: '',
        cultura: '',
        procedencia: '',
        ubicacion: '',
        observaciones: ''
      },
      imagenes: []
    };
  },
  computed: {
    campos() {
      return {
        numero_de_control: 'Número de control',
        nombre: 'Nombre',
        materia_prima: 'Materia prima',
        cultura: 'Cultura',
        procedencia: 'Procedencia',
        ubicacion: 'Ubicación',
        observaciones: 'Observaciones'
      };
    }
  },
  methods: {
    handleFiles(event) {
      this.imagenes = Array.from(event.target.files).slice(0, 10);
    },
    async handleSubmit() {
      const formData = new FormData();
      Object.entries(this.form).forEach(([key, value]) => {
        formData.append(key, value  || '');
      });
      this.imagenes.forEach(file => formData.append('imagenes', file));

      try {
        await crearRegistro(formData);
        alert('Registro guardado con éxito');
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert('Error al guardar el registro');
      }
    }
  }
};
</script>
