import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Product from "../components/Product";
import Overlay from "../components/Overlay";

export default class AddOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            description: ""
        }
    }

    saveCategory = () => {
        axios.post('http://localhost:8081/api/categories/add', {
            userToken: localStorage.getItem("userToken"),
            name: this.state.name,
            description: this.state.description
          })
          .then(function (response) {
            console.log(response.message);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        var savebutton;
        if(this.state.name != ""){
            savebutton = (<Button onClick={() => this.saveCategory()}>Salva</Button>); 
        }
        return(
            <div>
                <div className="row rowContent">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">Aggiungi una nuova Categoria</div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">Inserisci nome Categoria<br></br> <input type="text" onChange={(e) => this.setState({name:e.target.value})}></input></div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">Inserisci descrizione<br></br> <input type="text  " onChange={(e) => this.setState({description:e.target.value})}></input></div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">{savebutton}</div>
                
                </div>
            </div>
        );
    }
}