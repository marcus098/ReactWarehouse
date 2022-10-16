import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Layout.css';
import { Button } from "react-bootstrap";
import OrderSupplierOverlay from "./OrderSupplierOverlay";
import ProductOverlay from "./ProductOverlay";
import PurchaseOverlay from "./PurchaseOverlay";
import OrderOverlay from "./OrderOverlay";

export default class Overlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rowPosition: (<></>),
            modify:false,
            position: [],
            addPosition: false,
            menu: 0,
            namePosition:'',
            descriptionPosition:'',
            notRender:false,
            idPosition:0,
            idSupplier:0,
            supplierSelected:false,
            selected: false
        };
    }
    
   

render(){ 
    var typeReturn = (<></>);
    switch(this.props.type){
        case "product":
            typeReturn = (<ProductOverlay 
                idProduct={this.props.product.id}
                searchSuppliers={true}
                setSupplierId={this.setSupplierId}
                props={this.props}></ProductOverlay>);
            break;
        case "purchase":
            typeReturn = (<PurchaseOverlay
                props={this.props}>

            </PurchaseOverlay>);
            break;
        case "order":
            typeReturn = (<OrderOverlay
                props={this.props}
            ></OrderOverlay>);
            break;   
        }
        return(
            <div className="overlay">
                <i class="bi bi-x-lg close" onClick={() => this.props.handler()}></i>
                
                {typeReturn}
            </div>
            );
        }    
    }