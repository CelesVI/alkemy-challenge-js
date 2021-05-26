import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Props actua como los componentes HTML. Cada uno popula un dato del schema.
const Operacion = props => (
  <tr>
    <td>{props.operacion.concepto}</td>
    <td>{props.operacion.monto}</td>
    <td>{props.operacion.fecha.substring(0,10)}</td>
    <td>{props.operacion.tipo}</td>
    <td>{props.operacion.categoria}</td>
    <td>
      <Link to={"/edit/"+props.operacion._id}>Editar</Link> | <a href="#" onClick={() => { props.deleteOperacion(props.operacion._id) }}>Borrar</a>
    </td>
  </tr>
)


export default class OperacionList extends Component {
  constructor(props) {
    super(props);

    this.deleteOperacion = this.deleteOperacion.bind(this)

    this.state = {operaciones: []};
  }

  //Trae toda la info de la api para luego montarla en el render.
  componentDidMount() {
    axios.get('http://localhost:5000/operaciones/')
      .then(response => {
        this.setState({ operaciones: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteOperacion(id) {
    axios.delete('http://localhost:5000/operaciones/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      operaciones: this.state.operaciones.filter(el => el._id !== id)
    })
  }

  operacionList() {
    return this.state.operaciones.map(currentoperacion => {
      return <Operacion operacion={currentoperacion} deleteOperacion={this.deleteOperacion} key={currentoperacion._id}/>;
    })
  }

  balance(){
    const lista = this.state.operaciones;
    
    console.log(lista);

    let ingreso = 0;
    let egreso = 0;

    for(let i = 0; i < lista.length; i++) {
       if (lista[i].tipo === 'Ingreso'){
         ingreso += Number(lista[i].monto);
       }else{
         egreso += Number(lista[i].monto);
       }
    }

    console.log(ingreso);
    console.log(egreso);

    return ('Balance: $ '+String(ingreso - egreso));

  }

  render() {
    return (
      <div>
        <h3 align='center'> Operaciones </h3>
        <br/>
        <h3 align='center'>{ this.balance() }</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            { this.operacionList() }
          </tbody>
        </table>
      </div>
    )
  }
}