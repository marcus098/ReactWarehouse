import React from "react";
import { Link } from "react-router-dom";

export class Unauthorized extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            
            <div className="Unauthorized">
            <Link to="/logout">Logout</Link>
            <div>Accesso non autorizzato</div>
            </div>
            );
        }
    }