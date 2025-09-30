import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://appbienesculturales-organizado-1.onrender.com/api/control_interno';

export const getRegistros = () => axios.get(API_URL);
export const crearRegistro = (data) => axios.post(API_URL, data);
export const actualizarRegistro = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarRegistro = (id) => axios.delete(`${API_URL}/${id}`);
export const getRegistroPorId = (id) => axios.get(`${API_URL}/${id}`);
