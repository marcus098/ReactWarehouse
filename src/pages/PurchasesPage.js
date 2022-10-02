import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Order from "../components/Order";
import Purchase from "../components/Purchase";
import Overlay from "../components/Overlay";
import '../css/Layout.css';

export default class PurchasesPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currantPage: 1,
            data: [],
            totalPages: 1,
            loading:true,
            purchase: [],
            overlay: false
        };
        this.handler = this.handler.bind(this);
    }
    
    componentDidMount() {
        if(this.state.data.length==0){
            this.doFetch();
        }
    }

    infoPurchase = (data) => {
        this.setState({
            purchase: data,
            overlay: true,
        });
    }
    
    closeOverlay = () =>{
        this.setState({
            overlay: false,
            purchase: []
        });
    }

    doFetch = async () => {
        await axios.get("http://localhost:8081/api/purchases")
        .then((response) => {
            this.setState({data: response.data});
            this.setState({totalPages: Math.ceil(response.data.length/20)});
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
        var overlayElements = (<></>);
        console.log(this.state.data);
        if(this.state.overlay && this.state.purchase!=""){
            overlayElements = (
                <Overlay
                    type="purchase"
                    handler={this.closeOverlay}
                    purchase={this.state.purchase}
                />
            );
        }
        var arrElements = [];
        if(this.state.data.length!=0){
            for(var i = ((this.state.currantPage-1)*20); i < (this.state.currantPage*20); i++){
                if(i<this.state.data.length){
                    arrElements.push(
                        <Purchase
                            key={"purchase"+this.state.data[i].id}
                            id={this.state.data[i].id}
                            quantity={this.state.data[i].quantity}
                            total={this.state.data[i].price}
                            discount="0"
                            date={this.state.data[i].localDateTime}
                            description={this.state.data[i].description}
                            handler={this.infoPurchase}
                            products={this.state.data[i].productPriceList}
                        />
                        );
                    }
                }
            }
            if(this.state.loading==false){
                return(
                    <div className="PurchasesPage">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">ID</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">descrizione</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Quantita</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Data</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Sconto</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">Totale</div>
                        </div>
                        {arrElements}
                        <div className="row arrowPages text-center">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                <ArrowPages elements={this.state.data.length} currentPage={this.state.currantPage} handler={this.handler}></ArrowPages>
                            </div>
                        </div>
                        {overlayElements}
                    </div>
                    );
                }else {
                    return (<div>Caricamento</div>)
                }
            } 
        }