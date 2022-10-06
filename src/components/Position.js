import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Position extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasProduct:false
        };
    }
    
    componentDidMount = () => {
        var value = true;
        if(this.props.productId == "")
            value = false;
        this.setState({hasProduct: value});
    }
    render(){
      var nameClass = "silver";
      if(this.state.hasProduct)
        nameClass = "green";
        return (
            <li class="survey-item">
    
            <span class="survey-name">
              {this.props.name}
              {console.log(this.props)}
            </span>
            
           
            <div class="pull-right">
              
               <span class="survey-end-date">
                {this.props.description}
                {(this.state.hasProduct) ? this.props.productName : ""}
              </span>
              <span class="survey-stage">
                <span class={"stage ended active "+nameClass}></span>        
              </span>
            </div>
          </li>
            );
        }
    }