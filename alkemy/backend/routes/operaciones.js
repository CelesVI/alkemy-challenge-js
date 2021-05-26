//Router nos permite rutear ls direcciones de nuestra api mediante los métodos httl.
const router = require('express').Router();
let Operacion = require('../models/operaciones');

//Ruta del home, donde recibe el response del request? Revisar.
router.route('/').get((req, res) => {
  Operacion.find()
    .then(operaciones => res.json(operaciones))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Ruta del agregar.
router.route('/add').post((req, res) => {
  const concepto = req.body.concepto;
  const monto = Number(req.body.monto);;
  const fecha = Date.parse(req.body.fecha);
  const tipo = req.body.tipo;
  const categoria = req.body.categoria; 

  //Creación de una nueva operación, usando las constantes previas y el schema ya hecho.
  const newOperacion = new Operacion({
    concepto,
    monto,
    fecha,
    tipo,
    categoria,
  });

  //Guardar la nueva operación.
  newOperacion.save()
  .then(() => res.json('Operación agregada!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Tomar una operación por el id.
router.route('/:id').get((req, res) => {
  Operacion.findById(req.params.id)
    .then(operaciones => res.json(operaciones))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Borrar una operación mediante el id.
router.route('/:id').delete((req, res) => {
  Operacion.findByIdAndDelete(req.params.id)
    .then(() => res.json('Operación borrada.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Actualizar una operación. Buscar por id. Body forma parte del parser que se conecta al api de la base de datos. body parser express?
router.route('/update/:id').post((req, res) => {
  Operacion.findById(req.params.id)
    .then(operaciones => {
      operaciones.concepto = req.body.concepto;
      operaciones.monto = Number(req.body.monto);
      operaciones.fecha = Date.parse(req.body.fecha);
      operaciones.tipo = req.body.tipo;
      operaciones.categoria = req.body.categoria; 

      operaciones.save()
        .then(() => res.json('Operación modificada!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;