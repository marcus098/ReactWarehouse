import React from "react";
import axios from "axios";
import User from "../components/User";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class UsersControlPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: []
        };
    }

    componentDidMount = () => {
        axios.post('http://localhost:8081/api/users', {
              //token: window.sessionStorage.getItem("userToken")
              token: localStorage.getItem("userToken")
            })
            .then((response) => {
              if(response.data.length != 0){
                this.setState({users: response.data});
              }
              
            })
            .catch(function (error) {
              console.log(error);
           });
    }
    
    render(){var elements = [];
        for(var i = 0; i < this.state.users.length; i++){
            elements.push(
                <User
                name={this.state.users[i].name}
                id={this.state.users[i].id}
                surname={this.state.users[i].surname}
                email={this.state.users[i].email}
                phone={this.state.users[i].phone}
                role={this.state.users[i].role}
                />
            );
        }

        return (
            <div className="row UserControl noPadding">
                <span>
                    <Link to="/AddAccount"><Button>Aggiungi</Button></Link>
                </span>
                {elements}
            </div>
        );
        }
    }