import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";  

//Crear la clase de edición mediante component de react. Lo vamos a ver en la página.
export default class OperacionList extends Component {
  constructor(props) {
    super(props);

    this.deleteOperacion = this.deleteOperacion.bind(this)

    this.state = {operaciones: []};
  }

  //Borrar una fila.
  deleteOperacion(id) {
    axios.delete('http://localhost:5000/operaciones/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      operaciones: this.state.operaciones.filter(el => el._id !== id)
    })
  }
  
  //Función para obtener el balance.
  balance(){
    const lista = this.state.operaciones;
    
    let ingreso = 0;
    let egreso = 0;

    for(let i = 0; i < lista.length; i++) {
       if (lista[i].tipo === 'Ingreso'){
         ingreso += Number(lista[i].monto);
       }else{
         egreso += Number(lista[i].monto);
       }
    }

    return ('Balance: $ '+String(ingreso - egreso));
  }
  
  //Obteniendo las operaciones.
  async getUsersData(){
    const res = await axios.get('http://localhost:5000/operaciones/')
    console.log(res.data)
    this.setState({loading:false, operaciones: res.data})
  }

  //Hook para montar en el render.
  componentDidMount(){
    this.getUsersData()
  }

  //Render de las columnas.
  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {  
      Header: 'Concepto',  
      accessor: 'concepto',
     }
     ,{  
      Header: 'Monto',  
      accessor: 'monto' ,
      } 
     ,{  
     Header: 'Fecha',  
     accessor: 'fecha' ,
     }
     ,{  
     Header: 'Tipo',  
     accessor: 'tipo',
     },
     {  
      Header: 'Categoria',  
      accessor: 'categoria',
     },
     {
      Header: 'Editar',    
      Cell: ({row}) => (<Link to={{pathname:`/edit/${row._id}`, state:{data: row}}}>Editar</Link>),
     },
     {
      Header: 'Borrar',
      Cell: ({row}) => (<a href="#" onClick={() => { this.deleteOperacion(`${row._id}`)}}>Borrar</a>),
     }
     
  ]
    //Vista principal.
    return (
      <div>
        <h3 align='center'> Operaciones </h3>
        <br/>
        <h3 align='center'>{ this.balance() }</h3>
          <ReactTable  
          data={this.state.operaciones}  
          columns={columns}
          
          />
      </div>
    )
  }
}