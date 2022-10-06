import { render } from "@testing-library/react";
import React from "react"
import '../css/AddAccount.css';
import "./functions";
import {Helmet} from "react-helmet";
import $ from "jquery";

export default class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state={
          formCompiled:false,
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
      console.log(this.refs);
      if(this.checkFill(this.refs.name) && 
          this.checkFill(this.refs.surname) && 
          this.checkFill(this.refs.email) && 
          this.checkFill(this.refs.password) && 
          this.checkPassword()){

        console.log("Aggiungo");
        console.log(this.refs.role.value);
        

      }
    }

    render(){
        return(
          <body>
          <main class="sign-up">
            <div class="sign-up__container">
              <div class="sign-up__content">
                <header class="sign-up__header">
                  <h1 class="sign-up__title">
                    Aggiungi un utente
                  </h1>
                  <p class="sign-up__descr">
                    Inserisci i dati
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
                          <option value="2">Ruolo1</option>
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