import { render } from "@testing-library/react";
import React from "react"
import '../css/AddAccount.css';
import "./functions";
import {Helmet} from "react-helmet";
import $ from "jquery";
import axios from "axios";
import Message from "../components/Message";

export default class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          formCompiled: false,
          messageBox: (<></>)
        }
    }

      componentDidMount () {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
    }

    checkPassword = () => {
      var value = false;
      if(this.refs.password.value == this.refs.confirmPassword.value){
        value = true;
      }
      this.setState({formCompiled:value});
      if(!value){
        this.refs.confirmPassword.className = "input__field errorInput";
      }
      return value;
    }
    checkFill = (value) => {
      if(value.value == ""){
        value.className = "input__field errorInput";
          return false;
      }else{
        value.className = "input__field";
        return true;
      }
    }

    AddUser = () => {
      if(this.checkFill(this.refs.name) && 
          this.checkFill(this.refs.surname) && 
          this.checkFill(this.refs.email) && 
          this.checkFill(this.refs.password) && 
          this.checkFill(this.refs.phone) &&
          this.checkPassword()){
            axios.post('http://localhost:8081/api/user/add', {
              userToken: localStorage.getItem("userToken"),
              name: this.refs.name.value,
              surname: this.refs.surname.value,
              email: this.refs.email.value,
              phone: this.refs.phone.value,
              password: this.refs.password.value,
              role:this.refs.role.value
            })
            .then((response) => {
              console.log(response);
              if(response.data.bool){
                window.location.replace(`http://localhost:3000/userControl`);
              }
              this.setState({message: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)})
            })
            .catch(function (error) {
              console.log(error);
           });
        }
    }

    render(){
        return(
          <body>
          <main class="sign-up">
            {this.state.message}
            <div class="sign-up__container">
              <div class="sign-up__content">
                <header class="sign-up__header">
                  <h1 class="sign-up__title">
                    Aggiungi un utente
                  </h1>
                  <p class="sign-up__descr">
                    
                  </p>
                </header>
                <form class="sign-up__form form">
                  <div class="form__row form__row--two">
                    <div class="input form__inline-input">
                      <div class="input__container">
                        <input ref="name" class="input__field" id="name" placeholder="Nome" required="" type="text" />
                        <label class="input__label" for="name">
                          Nome
                        </label></div>
                    </div>
                    <div class="input form__inline-input">
                      <div class="input__container">
                        <input ref="surname" class="input__field" id="surname" placeholder="Cognome" required="" type="text" />
                        <label class="input__label" for="surname">
                          Cognome
                        </label></div>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="input">
                      <div class="input__container">
                        <input class="input__field" ref="email" id="email" placeholder="Email" type="email" />
                        <label class="input__label" for="email">
                          Email
                        </label></div>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="input">
                      <div class="input__container">
                        <input class="input__field" id="phone" ref="phone" placeholder="Telefono" required="" type="phone" />
                        <label class="input__label" for="phone">
                          Telefono
                        </label></div>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="input">
                      <div class="input__container">
                        <select class="input__field" id="role" ref="role">
                          <option value="1">Amministratore</option>
                          <option value="2">Addetto Alle Vendite</option>
                          <option value="3">Addetto Agli Ordini</option>
                          <option value="4">Gestore Utenti</option>
                        </select>
                        <label class="input__label" for="role">
                          Ruolo
                        </label></div>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="input">
                      <div class="input__container">
                        <input class="input__field" id="password" ref="password" placeholder="Password" required="" type="password" />
                        <label class="input__label" for="password">
                          Password
                        </label></div>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="input">
                      <div class="input__container">
                        <input class="input__field" id="confirm-password" onBlur={(e) => this.checkPassword()} ref="confirmPassword" placeholder="Confirm password" required="" type="password" />
                        <label class="input__label" for="confirm-password">
                          Conferma password
                        </label></div>
                    </div>
                  </div>
                  <div class="form__row">
                    <div class="component component--primary form__button">
                      <button class="btn btn--regular" disabled="" id="sign-up-button" tabindex="0" onClick={(e) => {e.preventDefault();this.AddUser()}}>
                        Aggiungi
                      </button></div>
                  </div>
                </form>
              </div>
            </div>
          </main></body>
        
        );
    }
}