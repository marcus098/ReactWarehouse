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
        return (
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-2" onClick={() => this.props.handler(this.props)}>{this.props.id}</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3" onClick={() => this.props.handler(this.props)}>{this.props.name}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.quantity}</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-3">€{this.props.priceSell}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <select onClick={(e) => e.preventDefault()}>{positionElements}</select>
                </div>
            </div>
            );
        }
    }