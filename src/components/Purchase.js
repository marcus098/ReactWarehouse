import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Purchase extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    render(){
        return (
            <div className="row purchase" onClick={() => this.props.handler(this.props)}>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.id}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.description}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.quantity}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.date}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.discount}</div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-2">€{this.props.total}</div>
            </div>
            );
        }
    }