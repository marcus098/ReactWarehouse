import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Order from "../components/Order";
import Overlay from "../components/Overlay";

export default class OrdersPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currantPage: 1,
            data: [],
            totalPages: 1,
            loading:true,
        };
        this.chargeElements = this.chargeElements.bind(this);
        this.handler = this.handler.bind(this);
    }
    
    componentDidMount() {
        this.chargeElements();
    }
    chargeElements = () =>{
        if(this.state.data.length==0){
            this.doFetch();
        }
    }
    
    doFetch = async () => {
        await axios.get("http://localhost:8081/api/orders")
        .then((response) => {
            this.setState({
                data: response.data, 
                totalPages: Math.ceil(response.data.length/20)
            });
            if(response.data.length!=0)
                this.setState({loading: false});
        })
        .catch(console.log("errore"));
    }
    
    handler(value) {
        this.setState({
            currantPage: value
        });
    }

    render(){
        var arrElements = [];
        if(this.state.data.length!=0){
            for(var i = ((this.state.currantPage-1)*20); i < (this.state.currantPage*20); i++){
                if(i<this.state.data.length){
                    arrElements.push(
                        <Order
                        handler={this.infoOrder}
                        key={this.state.data[i].id + i*10}
                        id={this.state.data[i].id}
                        name={this.state.data[i].supplier.name}
                        date = {this.state.data[i].date}
                        quantity = {this.state.data[i].quantity}
                        total = {this.state.data[i].total}
                        description={this.state.data[i].description}
                        product={this.state.data[i].product}
                        
                        >
                        </Order>
                        );
                    }
                }
            }
            if(this.state.loading==false){
                return(
                    <div className="OrdersPage">
                         
                        <div className="row">
                            <div className="pageTitle">Lista Ordini</div>
                        </div>
                        <div className="row">
                           {/* <div className="col-lg-4 col-md-4 col-sm-8 col-8 add"><Button>Aggiungi Ordine</Button></div>*/}
                        </div>
                        <div className="row">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-1">ID</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Prodotto</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Fornitore</div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-3">Data Ordine</div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-1">Quantita'</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Costo totale</div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                            
                            </div>
                        </div>
                        {arrElements}
                        <div className="row arrowPages text-center">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                <ArrowPages elements={this.state.data.length} currentPage={this.state.currantPage} handler={this.handler}></ArrowPages>
                            </div>
                        </div>
                       
                    </div>
                    );
                }else {
                    return (<div>Caricamento</div>)
                }
            } 
        }