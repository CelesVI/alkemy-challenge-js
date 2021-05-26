import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Componentes de los elementos que se renderizan.
import Navbar from './components/navbar';
import OperacionesList from './components/operaciones-list-component';
import CreateOperacion from './components/create-operacion';
import EditOperacion from './components/edit-operacion';

//Rutas de los componentes.
function App() {
  return (
    <Router>
      <div className="Container">
        <Navbar />
        <br/>
        <Route path="/" exact component={OperacionesList}/>
        <Route path="/create" exact component={CreateOperacion}/>
        <Route path="/edit/:id" exact component={EditOperacion}/>
      </div>
    </Router>
  );
}

export default App;
