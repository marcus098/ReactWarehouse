import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import '../css/Account.css';

export default class AccountPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            button: "Modifica"
        };
    }
    render(){
        return(
            <div className="AccountPage">
                <div className="row account">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 accountInformation">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Nome</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Cognome</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Email</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Telefono</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Password</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <Button onClick={(e) => {
                                    if(this.state.button=="Modifica"){
                                        this.setState({button: "Salva"});
                                    }else{
                                        this.setState({button: "Modifica"});
                                    }
                                }}>{this.state.button}</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 accountDescription">
                        Descrizione
                    </div>
                </div>
            </div>
            );
        }
    }