import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ControlPanel.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.props={

        }
    }

    render(){
        var categoryManagement;
        var supplierManagement;
        var productManagement;
        var userManagement;

        userManagement=(
            <div class="col s6">
        <div align="center" class="card">
          <div class="row">
            <div class="left card-title">
              <b>Gestione Utenti</b>
            </div>
          </div>

          <div class="row">
            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">person</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/userControl">Utenti</Link></h5></span>
              </div>
            </a>
            <div class="col s1">&nbsp;</div>
            <div class="col s1">&nbsp;</div>

            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">people</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/suppliers">Fornitori</Link></h5></span>
              </div>
            </a>
          </div>
        </div>
      </div>
        );

        productManagement = (
            <div class="col s6">
        <div  align="center" class="card">
          <div class="row">
            <div class="left card-title">
              <b>Gestione Prodotti</b>
            </div>
          </div>
          <div class="row">
            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">store</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/products">Prodotti</Link></h5></span>
              </div>
            </a>

            <div class="col s1">&nbsp;</div>
            <div class="col s1">&nbsp;</div>

            <a href="#!">
              <div  class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">assignment</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/orders">Ordini</Link></h5></span>
              </div>
            </a>
          </div>
        </div>
      </div>
        );

        supplierManagement = (
            <div class="col s6">
        <div align="center" class="card">
          <div class="row">
            <div class="left card-title">
              <b>Gestione Posizioni</b>
            </div>
          </div>

          <div class="row">
            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">view_comfy</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/positions">Posizioni</Link></h5></span>
              </div>
            </a>

            <div class="col s1">&nbsp;</div>
            <div class="col s1">&nbsp;</div>

            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">view_comfy</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/AddPosition">Nuova Posizione</Link></h5></span>
              </div>
            </a>
          </div>
        </div>
      </div>
        );

        categoryManagement = (
            <div class="col s6">
        <div align="center" class="card">
          <div class="row">
            <div class="left card-title">
              <b>Gestione Categorie</b>
            </div>
          </div>
          <div class="row">
            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">view_list</i>
                <span class="indigo-text text-lighten-1"><h5><Link className="" to="/products">Categorie</Link></h5></span>
              </div>
            </a>
            <div class="col s1">&nbsp;</div>
            <div class="col s1">&nbsp;</div>

            <a href="#!">
              <div class="grey lighten-3 col s5 waves-effect">
                <i class="indigo-text text-lighten-1 large material-icons">view_list</i>
                <span class="truncate indigo-text text-lighten-1"><h5><Link className="" to="/AddCategory">Nuova Categoria</Link></h5></span>
              </div>
            </a>
          </div>
        </div>
      </div>
        );
        return(
            <main>
    <div class="row">
      {userManagement}

      {productManagement}
    </div>

    <div class="row">
      {supplierManagement}

      {categoryManagement}
    </div>

    
  </main>
        );
    }
}