import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//Crear la clase de edición mediante component de react. Lo vamos a ver en la página.
export default class EditOperacion extends Component {
  //Constructor 
  constructor(props) {
    //Pasando data através de props.
    super(props);

    //Bind para pasar info entre funciones.
    this.onChangeConcepto = this.onChangeConcepto.bind(this);
    this.onChangeMonto = this.onChangeMonto.bind(this);
    this.onChangeFecha = this.onChangeFecha.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onChangeCategoria = this.onChangeCategoria.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //Uso de state para la modificación de la operación. Estado inicial con los componenetes de la base de datos.
    this.state = {
      concepto: '',
      monto: '',
      fecha: new Date(),
      tipo: '',
      categoria: ''
    }
  }

  //Match de la propiedad con el parámetro para mandar el id correcto.
  componentDidMount() {
    axios.get('http://localhost:5000/operaciones/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          concepto: response.data.concepto,
          monto: response.data.monto,
          fecha: new Date(response.data.fecha),
          tipo: response.data.tipo,
          categoria: response.data.categoria,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

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

  //Ejecutar al hacer clic, post en el update.
  onSubmit(e) {
    e.preventDefault();

    const operacion = {
      concepto: this.state.concepto,
      monto: this.state.monto,
      fecha: this.state.fecha,
      tipo: this.state.tipo,
      categoria: this.state.categoria
    }

    console.log(operacion);

    axios.post('http://localhost:5000/operaciones/update/' + this.props.match.params.id, operacion)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  //Render del form.
  render() {
    return (
    <div>
      <h3 align='center'>Operación</h3>
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
          <input 
              type="text" 
              className="form-control"
              value={this.state.categoria}
              onChange={this.onChangeCategoria}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Aceptar modificaciones" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}