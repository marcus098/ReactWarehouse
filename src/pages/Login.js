import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import '../css/Login.css';
import '../css/Login.sass';
import axios from 'axios';
import Loading from '../components/Loading';
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      errorMsg: '', 
      usrTokn: localStorage.getItem("userToken")/* sessionStorage.getItem("userToken")*/,
      email: '',
      password: '',
      isLoading:true,
      errorFetch: '',
      contactForm: "hideContactForm",
      zIndexForm: "-1",
      backgroundForm: "transparent"
    };        
  }
  
  componentDidMount() {
    this.checkToken();
  }
  
  checkToken = () => {
    this.setState({errorFetch: ''})
    axios.post('http://localhost:8081/api/check', {
      value: localStorage.getItem("userToken"),
      page: 16
    })
    .then((response) => {
      console.log(response);
      if(response.data.bool)
        window.location.replace(`http://localhost:3000/home`);
      else
        this.setState({isLoading:false});
    })
    .catch(function (error) {
      console.log(error);
      this.setState({isLoading: false});
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const rawResponse = await fetch('http://localhost:8081/api/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: this.refs.email.value, password: this.refs.password.value})
      });
      const content = await rawResponse.json();
      this.setState({errorMsg: content.message})
      if(content.accessToken != "0"){
        this.setState({usrTokn: content.accessToken});
        localStorage.setItem("userToken", content.accessToken);
        localStorage.removeItem("productsCart");
        window.location.replace(`http://localhost:3000/home`);
      }
    }catch(err){
      this.setState({errorMsg: 'errore'});
    }
  }

  changeContactForm = () => {
    var str = "hideContactForm";
    var zIndex = "-1";
    var background="transparent";
    if(this.state.contactForm == "hideContactForm"){
      str = "showContactForm";
      zIndex = "100";
      background = "transparent";
    }
    this.refs.containerForm.style.zIndex = "-1";
    this.refs.containerForm.style.background = "transparent";
    this.setState({contactForm: str, zIndexForm: zIndex, backgroundForm:background});
  }

  render(){
    if(this.state.isLoading){
      <Loading></Loading>
    }else{
      return(
        <section className="user">
          <div className="user_options-container">
            {/* inizio container contatti */}
            <div id={this.state.contactForm} ref="containerForm" className="row" style={{position:"absolute",zIndex: this.state.zIndexForm,width:"100%", margin:"0",top:"-50px", height:"450px", alignItems:"center", background: this.state.backgroundForm}}>
              <div className='' style={{position:"absolute", top:"-5px", right:"0", width:"40px", cursor:"pointer"}} onClick={this.changeContactForm}>X</div>
                <div className={this.state.contactForm + "1" + " col-lg-6 col-md-6 col-sm-6 col-6 "}>
                  <form className='contactForm'>
                    <input type="text" ref="contactName" placeholder='Nome' required></input>
                    <input type="text" ref="contactSurname" placeholder='Cognome' required></input>
                    <input type="email" ref="contactEmail" placeholder='Email' required></input>
                    <textarea ref="contactMessage" placeholder='Messaggio' required></textarea>
                    <Button type="submit">Invia</Button>
                  </form>
                </div>
              <div className={"col-lg-6 col-md-6 col-sm-6 col-6 " + this.state.contactForm + "2"}>
                <div>Descrizione</div>
              </div>
            </div>
      {/* fine container contatti */}
            <div className="user_options-text">
              <div className="user_options-unregistered">
      
                <h2 className="user_unregistered-title">Gestionale in Cloud</h2>
                <p className="user_unregistered-text">La grande comodita' di operare con un software in cloud, qualunque esso sia, risiede nella possibilita' di accedere da qualsiasi dispositivo, sia esso un tablet, uno smartphone o un computer</p>
                <span style={{padding:"0", margin:"0"}}>Non riesci ad accedere?</span><br></br>
                <button onClick={this.changeContactForm} className="user_unregistered-signup" id="signup-button loginButton">Contatta un amministratore</button>
              </div>
            </div>
      
            <div className="user_options-forms" id="user_options-forms">
              <div className="user_forms-login">
                <p className='error'> {this.state.errorMsg}</p>
                <h2 className="forms_title">Login</h2>
                <form className="forms_form" onSubmit={this.handleSubmit}>
                  <fieldset className="forms_fieldset">
                    <div className="forms_field">
                      <input type="email" placeholder="Email" ref="email" className="forms_field-input loginInput" required autoFocus />
                    </div>
                    <div className="forms_field">
                      <input type="password" placeholder="Password" ref="password" className="forms_field-input loginInput" required />
                    </div>
                  </fieldset>
                  <div className="forms_buttons">
                    <button type="button" className="forms_buttons-forgot loginButton">{/*password dimenticata*/}</button>
                    <input type="submit" value="Accedi" className="forms_buttons-action loginButton" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        );
      }
    }
  }
export default Login;