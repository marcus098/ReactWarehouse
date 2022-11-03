import React from "react";
import axios, { Axios } from "axios";
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
      modify: false,
      notRender: false,
      message: ""
    }
  }

  delete = () => {
    axios.get('http://localhost:8081/api/user/delete/'+this.props.id, {
      headers:{
          userToken: localStorage.getItem("userToken"),
      }
    })
    .then((response) => {        
      if(response.data.bool){
        this.setState({notRender: true});
      }else{
        //show error message
        
      }
    })
    .catch((error) => {
      console.log(error);
      //show error message
    });
  }

  modify = () => {
    this.setState({modify: true});
  }
  save = () => {
    axios.post('http://localhost:8081/api/user/modify/'+this.props.id, {
      userToken: localStorage.getItem("userToken"),
      name: this.refs.name.value,
      surname: this.refs.surname.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      idRole: this.refs.role.value
    })
    .then((response) => {        
      if(response.data.bool){
        this.setState({modify: false});
        window.location.replace(`http://localhost:3000/userControl`);
        //message success
      }else{
        //show error message
        
      }
      })
      .catch((error) => {
        console.log(error);
        //show error message
      });
  }

  showIcon = () => {
    this.refs.iconRef.style.display="";
  }

  hideIcon = () => {
    this.refs.iconRef.style.display="none";
  }
  
  render(){
    var icons = (<></>);
    var nameSurname = (<></>);
    var ulEmailPhone = (<></>)
    var roleElement = (<></>);
    if(this.state.modify){
      if(this.props.delete){
        icons = (
          <section>
            <div style={{position:"absolute", top:"5px", left:"-12px", fontSize:"24px"}}><i class="fa fa-check iconUser" aria-hidden="true" onClick={this.save}></i></div>
            <div style={{position:"absolute", top:"5px", right:"0px", fontSize:"24px", color:"red"}}><i class="bi bi-trash iconUser" style={{color:"red"}} onClick={this.delete}></i></div>
          </section>
          );
      }else{
          icons = (
            <section>
              <div style={{position:"absolute", top:"5px", left:"-12px", fontSize:"24px"}}><i class="fa fa-wrench iconUser" aria-hidden="true" onClick={this.save}></i></div>
            </section>
            );
      }
      
        nameSurname = (
          <section style={{display: "flex"}}>
            <input style={{width:"45%", marginLeft:"3%", textAlign:"center", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center"}} defaultValue={this.props.name} ref="name"></input> <input ref="surname" style={{width:"45%",textAlign:"center", marginLeft:"3%", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center"}} defaultValue={this.props.surname}></input>
          </section>
        );
        ulEmailPhone = (
          <ul>
            <span>
              <i class="bi bi-telephone" ref="phone"></i> 
              <input ref="phone" defaultValue={this.props.phone} style={{width:"50%", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center", margin:"15px" }}></input>
            </span><br></br>
            <span>
              <a href="#"><i class="fa fa-envelope-o" aria-hidden="true" style={{width:"24px", height:"14px"}}></i>
                <input type="text" defaultValue={this.props.email} style={{border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center"}} ref="email"></input>
              </a>
            </span>
          </ul>
        );
        roleElement = (
          <select defaultValue={this.props.role.id} ref="role" style={{width:"100%", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center"}}>
            <option value="1">Amministratore</option>
            <option value="2">Addetto Alle Vendite</option>
            <option value="3">Addetto Agli Ordini</option>
            <option value="4">Gestore Utenti</option>
          </select>
        );
    }else{
      icons = (
        <section>
          <div style={{position:"absolute", top:"5px", left:"-12px", fontSize:"24px"}}><i class="fa fa-wrench iconUser" aria-hidden="true" onClick={this.modify}></i></div>
          <div style={{position:"absolute", top:"5px", right:"0px", fontSize:"24px", color:"red"}}><i class="bi bi-trash iconUser" style={{color:"red"}} onClick={this.delete}></i></div>
        </section>);
        nameSurname = (<h1 class="title">{this.props.name} {this.props.surname}</h1>);
        ulEmailPhone = (
          <ul>
            <span><i class="bi bi-telephone"></i> {this.props.phone}</span><br></br>
            <span><a href="#"><i class="fa fa-envelope-o" aria-hidden="true" style={{width:"24px", height:"14px"}}></i>{this.props.email}</a></span>
          </ul>
        );
        roleElement = (this.props.role.name);
    }
    if(this.state.notRender==false){
    return(
      <div className="container" onMouseEnter={this.showIcon} onMouseLeave={this.hideIcon}>
        <div class="box">
          <div class="top">
            <div class="profile"><i class="bi bi-person-circle" style={{fontSize:"95px", opacity:"0.9"}}></i></div>
            {nameSurname}
            <h3 class="job">{roleElement}</h3>
            <section ref="iconRef" style={{display:"none"}}>
              {icons}
            </section>
            </div>
          <div class="bottom">
            <div class="links">
              {ulEmailPhone}
            </div>
          </div>
      </div>
    </div>
    );
  }
}
}