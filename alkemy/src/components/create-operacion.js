import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    //Constructor para la operación. Bind para referir cada propiedad correspondiente.
    this.onChangeConcepto = this.onChangeConcepto.bind(this);
    this.onChangeMonto = this.onChangeMonto.bind(this);
    this.onChangeFecha = this.onChangeFecha.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeCategoria = this.onChangeCategoria.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //State para guardar los valores pasados en el component.
    this.state = {
      concepto: '',
      monto: 0,
      fecha: new Date(),
      tipo: '',
      categoria: ''
    }
  }

  //Target value para el valor actual.
  onChangeConcepto(e) {
    this.setState({
      concepto: e.target.value
    })
  }

  onChangeMonto(e) {
    this.setState({
      monto: e.target.value
    })
  }

  onChangeTipo(e) {
    this.setState({
      tipo: e.target.value
    })
  }

  onChangeFecha(date) {
    this.setState({
      fecha: date
    })
  }

  onChangeCategoria(e) {
    this.setState({
      categoria: e.target.value
    })
  }

  //Al apretar el botón.
  onSubmit(e) {
    e.preventDefault();

    //Guardar cada state en su respactivo campo.
    const operacion = {
      concepto: this.state.concepto,
      monto: this.state.monto,
      fecha: this.state.fecha,
      tipo: this.state.tipo,
      categoria: this.state.categoria
    }

    console.log(operacion);

    axios.post('http://localhost:5000/operaciones/add', operacion)
      .then(res => console.log(res.data));

    this.setState({concepto: '', monto: '', fecha: '', tipo: '', categoria: ''})

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3 align='center'>Crear nueva operación</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Concepto: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.concepto}
              onChange={this.onChangeConcepto}
              />
        </div>
        <div className="form-group"> 
          <label>Monto: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.monto}
              onChange={this.onChangeMonto}
              />
        </div>
        <div className="form-group">
          <label> Tipo: </label>
          <input 
              type="radio" 
              value="Ingreso"
              id='ingreso'
              checked={this.state.tipo === "Ingreso"}
              onChange={this.onChangeTipo}
              />
          <label for='ingreso'> Ingreso </label>
          <input 
              type="radio" 
              value="Egreso"
              id='egreso'
              checked={this.state.tipo === "Egreso"}
              onChange={this.onChangeTipo}
              />
          <label for='egreso'> Egreso </label>
        </div>
        <div className="form-group">
          <label>Fecha: </label>
          <div>
            <DatePicker
              selected={this.state.fecha}
              onChange={this.onChangeFecha}
            />
          </div>
        </div>
        <div className="form-group"> 
          <label>Categoria: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.categoria}
              onChange={this.onChangeCategoria}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Agregar operación" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}