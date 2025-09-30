const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const controller = require('../controllers/control_interno.controller');


router.post('/', upload.array('imagenes', 10), controller.crearRegistro);
router.get('/', controller.obtenerRegistros);
router.put('/:id', upload.array('imagenes', 10), controller.actualizarRegistro);
router.delete('/:id', controller.eliminarRegistro);
router.get('/:id', controller.obtenerRegistroPorId);

module.exports = router;
