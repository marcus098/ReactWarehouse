import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pages.css';
import '../css/UserCards.scss';

export default class Supplier extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }
    /*
                <div className="container">
  <div class="box">
    <div class="top">
      <div class="profile"></div>
      <h1 class="title">{this.props.name} {this.props.surname}</h1>
      <h3 class="job">{this.props.api}</h3>
    </div>
    <div class="bottom">
      <div class="links">
        <ul>
          <li><a href="#">{this.props.phone}</a></li>
          <li><a href="#">{this.props.email}</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
*/

    render(){
        
        return(
<div class="user-cell">
    <div class="user-profile">
        <img class="user-photo" src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" />
        <div class="user-meta noPadding">
            <h2>{this.props.name}</h2>
            <em><i class="bi bi-telephone"></i> {this.props.phone}</em>
            <a href="han@rebellion.com"><i class="bi bi-mailbox"></i> {this.props.email}</a>
        </div>
    </div>
    <a href={"/products?supplier="+this.props.id} className="noPadding">VISUALIZZA PRODOTTI</a>
</div>

        );
    }
}