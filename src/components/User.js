import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pages.css';

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }
    
    render(){
        return(
            <div className="userCard col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="row noPadding">
                    <div className="img col-lg-2 col-md-2 col-sm-4 col-4">Img</div>
                    <div className="column2 col-lg-10 col-md-10 col-sm-8 col-8">
                            <div className="userElement">
                                {this.props.name} {this.props.surname}
                            </div>
                            <div className="userElement">
                                {this.props.phone}
                            </div>
                            <div className="userElement">
                                {this.props.email}
                            </div>
                            <div className="userElement">
                                {this.props.role}
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}