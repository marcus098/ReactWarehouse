import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pages.css';
import '../css/UserCards.scss';

export default class User extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      modify: false
    }
  }

  delete = () => {

  }

  modify = () => {
    if(this.state.modify){//salvo le modifiche

    }else{//inizio le modifiche

    }
  }
  
  render(){
    return(
      <div className="container">
        <div class="box">
          <div class="hover-box">
            <div class="text">
              <h1>Over</h1>
            </div>
          </div>
          <div class="top">
            <div class="profile"><i class="bi bi-person-circle" style={{fontSize:"95px", opacity:"0.9"}}></i></div>
            <h1 class="title">{this.props.name} {this.props.surname}</h1>
            <h3 class="job">{this.props.role.name}</h3>
            <div style={{position:"absolute", top:"5px", left:"-14px", fontSize:"24px"}}><i class="fa fa-wrench iconUser" aria-hidden="true" onClick={this.modify}></i></div>
            <div style={{position:"absolute", top:"5px", right:"0px", fontSize:"24px"}}><i class="bi bi-trash iconUser" onClick={this.delete}></i></div>
          </div>
          <div class="bottom">
            <div class="links">
              <ul>
                <span><i class="bi bi-telephone"></i> {this.props.phone}</span><br></br>
                <span><a href="#"><i class="fa fa-envelope-o" aria-hidden="true" style={{width:"24px", height:"14px"}}></i>{this.props.email}</a></span>
              </ul>
            </div>
          </div>
      </div>
    </div>
    );
  }
}