import React from "react";
import axios from "axios";
import User from "../components/User";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class UsersControlPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
            role : 0,
            delete: false,
            messageBox: (<></>)
        };
    }

    componentDidMount = () => {
        axios.post('http://localhost:8081/api/users', {
              token: localStorage.getItem("userToken")
            })
            .then((response) => {
                console.log(response);
              if(response.data.length != 0){
                this.setState({users: response.data});
              }
            })
            .catch(function (error) {
              console.log(error);
           });
           axios.post('http://localhost:8081/api/getRole', {
              token: localStorage.getItem("userToken")
            })
            .then((response) => {
                console.log(response);
              if(response.data.length != 0){
                this.setState({role: response.data.object.id});
                if(response.data.object.id == 1 || response.data.object.id == 4){
                    this.setState({delete: true});
                }
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
                    delete={this.state.delete}
                    loggedRole={this.state.role}
                />
            );
        }

        return (
            <div className="row UserControl noPadding">
               {/*} <span>
                    <Link to="/AddAccount"><Button>Aggiungi</Button></Link>
        </span>*/}
                {elements}
            </div>
        );
        }
    }