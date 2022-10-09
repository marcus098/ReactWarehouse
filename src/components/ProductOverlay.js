import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

export default class ProductOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderButton:false,
            suppliers: [],
            idSupplier: 0,
            target:null
        }
    }
    
    chargeSuppliers = () => {
        axios.post('http://localhost:8081/api/suppliers/getProduct/'+this.props.idProduct, {
        
        })
        .then((response) => {
            console.log(response);
            if(response.data){
                this.setState({suppliers: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
        this.chargeSuppliers();
    }

    setSupplierId = (event) => {
        this.setState({idSupplier:event.target.dataset.id, target:event.target});
        if(this.state.target != null){
            this.state.target.className="";
        }
        event.target.className="supplierSelected";
    }

    saveSupplier = () => {
        if(this.refs.quantity.value != "" && this.state.idSupplier != 0){
            if(this.refs.quantity.value>0){
                console.log("Salvataggio ordine");
                axios.post('http://localhost:8081/api/orders/add', {
                    description: this.refs.description.value,
                    quantity: this.refs.quantity.value,
                    idProductSupplier: this.state.idSupplier
                })
                .then((response) => {
                    console.log(response);
                    if(response.data.bool){
                        this.props.props.handler();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                //show error message importo < 0 
            }
        }else{
            //show error message dati non inseriti
        }
    }

    render(){
        var elements = [];
        if(this.props.searchSuppliers && this.state.suppliers.length!=0){
            for(var i = 0; i < this.state.suppliers.length; i++){
                elements.push(
                    <div data-id={this.state.suppliers[i].id} key={this.state.suppliers[i].id} onClick={this.setSupplierId}>
                        {this.state.suppliers[i].name + " " +this.state.suppliers[i].email + " " +this.state.suppliers[i].price}
                    </div>
                );
            }
        }
        console.log(this.props);
        return (
            <section>
                <form id="msformOverlay">
                    <fieldset>
                        Prova previous
                        <Button className="next">Next</Button>
                    </fieldset>
                    <fieldset>
                        <h1><span><i class="bi bi-pen"></i></span> {this.props.props.product.name} </h1>
                        <div className="row title">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">{this.props.props.product.name} <span><i class="bi bi-pen"></i></span></div>
                        </div>
                        <div className="row description">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                {this.props.props.product.description}<i class="bi bi-pen"></i>
                            </div>
                        </div>
                        <div className="row price">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">Prezzo?<i class="bi bi-pen"></i></div>
                        </div>
            
                        {/*inputElements*/}
                        <Button className="next action-button">Ordina</Button>
                        <Button className="previous action-button">Vendi</Button>  
                    </fieldset>
            
                    <fieldset>
                       
                            {elements}
                        <input type="number" placeholder="Quantita" ref="quantity"></input>
                        <textarea type="text" placeholder="Descrizione" ref="description"></textarea>
                        <Button className="previous">Indietro</Button>
                        <Button onClick={this.saveSupplier}>
                                Ordina
                        </Button>
                    </fieldset>
                </form>
            
            
            </section>
            );
        }
    }