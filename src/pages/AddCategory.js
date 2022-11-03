import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Product from "../components/Product";
import Overlay from "../components/Overlay";
import Message from "../components/Message";

export default class AddOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            description: "",
            messagebox: (<></>)
        }
    }
    emptyMessageBox = () => {
        this.setState({messageBox: null});
    }
    saveCategory = () => {
        axios.post('http://localhost:8081/api/categories/add', {
            userToken: localStorage.getItem("userToken"),
            name: this.state.name,
            description: this.state.description
          })
          .then((response) => {
                console.log(response.data);
                //show message response.data.message
                this.setState({messagebox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)})
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        var savebutton;
        if(this.state.name != ""){
            savebutton = (<Button onClick={() => this.saveCategory()} className="action-button">Salva</Button>); 
        }
        return(
            <div>
                {this.state.messagebox}
                <div className="row rowContent" style={{display:"flex", height:"300px", alignContent:"center"}}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12" style={{padding:"10px", fontSize:"30px", marginTop:"-60px"}}>Aggiungi una nuova Categoria</div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12" style={{padding:"10px"}}>Inserisci nome Categoria<br></br> <input type="text" onChange={(e) => this.setState({name:e.target.value})}></input></div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12" style={{padding:"10px"}}>Inserisci descrizione<br></br> <input type="text  " onChange={(e) => this.setState({description:e.target.value})}></input></div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12" style={{padding:"10px"}}>{savebutton}</div>
                
                </div>
            </div>
        );
    }
}