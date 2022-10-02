import React from "react";
import { Link } from "react-router-dom";

export default class AutomationPage extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(   
          <div className="AutomationPage">
            <Link to="/logout">Logout</Link>
            <div>Benvenuto nella automation page!</div>
            </div>
            );
        }
    }