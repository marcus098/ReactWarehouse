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
            priceSupplier:0,
            supplierName:'',
            count:0,
            suplliersToSave:[]
        }
    }

    componentDidMount () {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
    }

    searchSuppliersByName = (value) => {
        axios.get("http://localhost:8081/api/suppliers/search/"+value)
                .then((response) => {
                    this.setState({
                    supplierList: response.data
                });
                console.log(this.state.supplierList);
                })
                .catch(console.log("Errore"));
    }

    saveProduct = () => {
        console.log("Entro qui dentro");
        console.log(this.state);
        if(this.state.idSupplier!=0 && this.state.priceSupplier!=0 && this.state.idSupplier!="" && this.state.priceSupplier!=""){
            console.log("Primo if");
            this.setState({
                count: this.state.count+1,
                suppliersToSave: this.state.suplliersToSave.push({idSupplier: this.state.idSupplier, priceSupplier: this.state.priceSupplier})
            });
        }
        if(this.state.name != "" && this.state.quantity != "" && this.state.priceSell != ""){
            console.log("Secondo if");
            axios.post('http://localhost:8081/api/products/add', {
            name: this.state.name,
            priceSell: this.state.priceSell,
            quantity: this.state.quantity,
            description: this.state.description,
            count: this.state.count,
            suppliersToSave: this.state.suplliersToSave,
          })
          .then((response) => {
            console.log(response.data);
            this.setState({
                name: "",
                priceSell: "",
                quantity: 0,
                description: "",
                count: 0,
                suppliersToSave: [],
                idSupplier: 0,
                supplierName: ""
            });
            this.refs.name.value = '';
            this.refs.priceSell.value = '';
            this.refs.quantity.value = '';
            this.refs.description.value = '';
            this.refs.supplierValues.value = '';
            this.refs.priceSupplier.value = '';
            this.refs.supplierName.value="";
            //this.refs.name.value = '';
          })
          .catch(function (error) {
            console.log(error);
          });
        }
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
        var optionSupplier = [];
        console.log(this.state);
        if(this.state.supplierList.length!=0){
            //this.setState(this.setState({idSupplier: this.state.supplierList[0].id}));
            this.state.supplierList.map((supplier) => {
                optionSupplier.push(<option value={supplier.id}>{supplier.name}</option>)
            });
        }
        return(
                <form id="msformProduct">
                {progressbar}
                
                <fieldset>
                  <h2 class="fs-title">Inserisci nuovo prodotto</h2>                  
                  <input type="text" ref="name" placeholder="Nome" onChange={(e) => this.setState({name: e.target.value})} required />
                  <input type="number" ref="quantity" placeholder="Quantita'" onChange={(e) => this.setState({quantity: e.target.value})} required />
                  <input type="text" ref="priceSell" placeholder="Prezzo Di Vendita" onChange={(e) => this.setState({priceSell: e.target.value})} required />
                  <textarea placeholder="Descrizione" ref="description" onChange={(e) => this.setState({description: e.target.value})}></textarea>
                  <input type="button" class="next action-button" onClick={(e) => e.preventDefault()} value="Salva" />
                </fieldset>

                <fieldset>
                  <h2 class="fs-title">Seleziona fornitore</h2>                
                  <input type="text" ref="nameSupplier" onChange={(e) => this.searchSuppliersByName(e.target.value)} placeholder="Nome Fornitore" required />
                  <select ref="supplierValues" onChange={(e) => this.setState({idSupplier: e.target.value})}>
                    {optionSupplier}
                  </select>
                  <input type="number" ref="priceSupplier" onChange={(e) => this.setState({priceSupplier: e.target.value})} placeholder="Costo acquisto" required />
                  <input type="button" onClick={(e) => {console.log("Ciao")}} value="Indietro" class="previous action-button"></input>
                  <input type="button" class="action-button" onClick={(e) => e.preventDefault()} value="Aggiungi altro fornitore" />
                    <input type="button" class="next action-button" onClick={(e) => e.preventDefault()} value="Salva e aggiungi un altro Prodotto" />
                  <input type="button" class="action-button" onClick={(e) => {e.preventDefault(); this.saveProduct()}} value="Salva" />
                </fieldset>
              </form>







        );
    }
}