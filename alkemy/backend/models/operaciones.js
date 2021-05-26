const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Creación del schema que se almacenará en la base de datos.
const operacionesSchema = new Schema({
    concepto: { type: String, required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, required: true },
    tipo: { type: String, required: true },
    categoria: { type: String, required: true},
});

const Operacion = mongoose.model('Operacion', operacionesSchema);

module.exports = Operacion;