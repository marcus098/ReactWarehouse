import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import ButtonSave from "./Elements/ButtonSave";

export default class Position extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasProduct:false,
            render:true,
            addClick: false
        };
    }
    
    componentDidMount = () => {
        var value = true;
        if(this.props.productId == "")
            value = false;
        this.setState({hasProduct: value});
    }

    empty = () => {
      axios.post('http://localhost:8081/api/position/empty/'+this.props.id, {
          
        })
        .then((response) => {
          console.log(response);
          if(response){
            this.setState({hasProduct: false});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    delete = () => {
      axios.post('http://localhost:8081/api/position/delete/'+this.props.id, {
          
      })
      .then((response) => {
        console.log(response);
        if(response){
          this.setState({render:false});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }

    savePosition = () => {
      if(this.refs.name.value!=""){
        axios.post('http://localhost:8081/api/position/add/', {
          name: this.refs.name.value,
          description: this.refs.description.value
        })
        .then((response) => {
          console.log(response);
          if(response.data.bool){
            this.props.newPosition();
            this.refs.name.value="";
            this.refs.description.value="";
            this.setState({addClick: false});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        } else {
          //show error message nome non inserito
        }
      }

    addClick = (e) => {
        this.setState({addClick: true})
    }
    
    render(){
      if(this.props.new){
          if(this.state.addClick){
            return(
              <li class="survey-item">
                <span class="survey-name">
                  <h3>
                    <input type="text" classname="" placeholder="Nome" ref="name" style={{fontSize: "20px", width:"100%"}}></input>
                  </h3>
                </span>
                <div class="pull-right">
                  <span class="survey-date">
                  </span>
                </div>
                <div>
                  <textarea ref="description" placeholder="Descrizione" style={{height:"80px"}}></textarea>
                </div>
                <Button onClick={(e) => this.savePosition()}>Salva</Button>
            </li>
            );
          }else{
            return(
              <li class="survey-item" style={{display:"flex", width:"center", justifyContent:"center"}}>
                <ButtonSave handler={this.addClick} name="Aggiungi"></ButtonSave>
            </li>
            );
          }
        
      }else{
        if(this.state.render){
          var nameClass = "silver";
          var buttonsElement = (
            <div>
              <Button onClick={this.delete}>Elimina</Button>
            </div>
          );
        if(this.state.hasProduct){
          nameClass = "green";
          buttonsElement = (
            <div>
              <Button onClick={this.empty}>Svuota</Button>
              <Button onClick={this.delete}>Elimina</Button>
            </div>
          );
        }
      
        return (
          <li class="survey-item">
            <span class="survey-name">
              <h3>
                {this.props.name}
                {console.log(this.props)}
              </h3>
            </span>
            <div class="pull-right">
              <span class="survey-date">
              </span>
              <span class="survey-stage">
                <span class={"stage ended active "+nameClass}></span>        
              </span>
            </div>
            <div>
              
              {this.props.description}<br></br>
              {(this.state.hasProduct) ? "Prodotto: " + this.props.productName : "Nessun prodotto"}
            </div>
            {buttonsElement}
          </li>
        );
      }
    }
  }
}