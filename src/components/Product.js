import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    render(){
        var positionElements = [];
        this.props.position.map((pos) => {
            positionElements.push(
                <option>{pos.name}</option>);
        });
        var discountPriceElement;
        var discountPercentageElement;
        var finalPrice = 0;
        var spanClass = "";
        if(this.props.discount != 0){
            spanClass = "cut";
            finalPrice = this.props.priceSell - ((this.props.priceSell * this.props.discount) / 100);
            console.log(this.props.priceSell - ((this.props.priceSell * this.props.discount) / 100));
            discountPriceElement = "€"+finalPrice;
            discountPercentageElement = " -" + this.props.discount + "%";
        }
        return (
            <div className="row product">
                <div className="col-lg-2 col-md-2 col-sm-2 col-2" onClick={() => this.props.handler(this.props)}>{this.props.id}</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3" onClick={() => this.props.handler(this.props)}>{this.props.name}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.quantity}</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                    <span className={spanClass}>€{this.props.priceSell}</span>
                    <span style={{color:"red"}}>{discountPriceElement}</span>
                    <span style={{color:"red"}}>{discountPercentageElement}</span>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2 product-last-column">
                    <select className="selectProduct" onClick={(e) => e.preventDefault()}>{positionElements}</select>
                </div>
            </div>
            );
        }
    }