import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import "./functions";
import { Button } from "react-bootstrap";
import Product from "../components/Product";
import Overlay from "../components/Overlay";

export default class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: false,
            value: "",
            categorySelected: false,
            name:'',
            description:'',
            priceSell:0,
            quantity:0,
            idSupplier:0,
            supplierList:[],
            priceSupplier:0
        }
    }

    componentDidMount () {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
    }

    searchSuppliersByName = (name) => {
        axios.get("http://localhost:8081/api/suppliers/search/"+name)
                .then((response) => {
                    this.setState({
                    supplierList: response.data
                });
                })
                .catch(console.log("Errore"));
    }

    render(){
        var progressbar;
        progressbar = (
            <ul id="progressbar">
                  <li class="active">Informazioni generali</li>
                  <li>Fornitore</li>
                </ul>
        );
        var step;
        step = (
//<h3 class="fs-subtitle">Step 1</h3>
<></>
        );
        var optionSupplier;
        optionSupplier
        return(
                <form id="msformProduct">
                {progressbar}
                
                <fieldset>
                  <h2 class="fs-title">Inserisci nuovo prodotto</h2>
                  
                  <input type="text" placeholder="Nome" required />
                  <input type="number" placeholder="Quantita'" value='0' required />
                  <input type="text" placeholder="Prezzo Di Vendita" required />
                  <textarea placeholder="Descrizione"></textarea>
                  
                  <input type="button" class="next action-button" onClick={(e) => e.preventDefault()} value="Salva" />
                </fieldset>
                <fieldset>
                  <h2 class="fs-title">Seleziona fornitore</h2>
                  
                  <input type="text" placeholder="Nome" required />
                  <input type="number" placeholder="Quantita'" required />
                  <input type="text" placeholder="Prezzo Di Vendita" required />
                  <textarea placeholder="Descrizione"></textarea>

                  <input type="button" class="previous action-button" onClick={(e) => e.preventDefault()} value="Indietro" />
                  <input type="button" class="next action-button" onClick={(e) => e.preventDefault()} value="Salva e aggiungi un altro" />
                  <input type="button" class="next action-button" onClick={(e) => e.preventDefault()} value="Salva" />
                </fieldset>
              </form>







        );
    }
}