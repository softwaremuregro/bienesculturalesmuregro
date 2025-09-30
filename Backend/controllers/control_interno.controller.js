const ControlInterno = require('../models/control_interno.model');

exports.crearRegistro = async (req, res) => {
  try {
    const { numero_de_control, nombre, materia_prima, cultura, procedencia, ubicacion, observaciones } = req.body;
    const url_imagenes = req.files?.map(file => file.path) || [];

    const nuevoRegistro = new ControlInterno({
      numero_de_control,
      nombre,
      materia_prima,
      cultura,
      procedencia,
      ubicacion,
      observaciones,
      url_imagenes
    });

    await nuevoRegistro.save();
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro', details: error.message });
  }
};

exports.obtenerRegistros = async (req, res) => {
  try {
    const registros = await ControlInterno.find();
    res.status(200).json(registros);
    console.log('Registros obtenidos:', registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros', details: error.message });
  }
};

exports.actualizarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_de_control, nombre, materia_prima, cultura, procedencia, ubicacion, observaciones } = req.body;
    const nuevasImagenes = req.files?.map(file => file.path) || [];

    const actualizado = await ControlInterno.findByIdAndUpdate(id, {
      numero_de_control,
      nombre,
      materia_prima,
      cultura,
      procedencia,
      ubicacion,
      observaciones,
      ...(nuevasImagenes.length > 0 && { url_imagenes: nuevasImagenes })
    }, { new: true });

    if (!actualizado) return res.status(404).json({ error: 'Registro no encontrado' });

    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar', details: error.message });
  }
};


exports.eliminarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await ControlInterno.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ error: 'Registro no encontrado' });

    res.status(200).json({ message: 'Registro eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar', details: error.message });
  }
};


exports.obtenerRegistroPorId = async (req, res) => {
  try {
    const registro = await ControlInterno.findById(req.params.id);
    if (!registro) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el registro', error });
  }
};
