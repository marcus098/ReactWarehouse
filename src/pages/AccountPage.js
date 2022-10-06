import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import '../css/Account.sass';

export default class AccountPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            button: "Modifica"
        };
    }
    /*
    <div className="AccountPage">
                <div className="row account">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 accountInformation">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Nome</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Cognome</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Email</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Telefono</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">Password</div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6"><input type="text"></input></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <Button onClick={(e) => {
                                    if(this.state.button=="Modifica"){
                                        this.setState({button: "Salva"});
                                    }else{
                                        this.setState({button: "Modifica"});
                                    }
                                }}>{this.state.button}</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 accountDescription">
                        Descrizione
                    </div>
                </div>
            </div>*/
    render(){
        return(

<body>
  <main class="sign-up">
    <div class="sign-up__container">
      <div class="sign-up__content">
        <header class="sign-up__header">
          <h1 class="sign-up__title">
            Sign up
          </h1>
          <p class="sign-up__descr">
            Welcome, Please sign up your account.
          </p>
        </header>
        <form class="sign-up__form form">
          <div class="form__row form__row--two">
            <div class="input form__inline-input">
              <div class="input__container">
                <input class="input__field" id="first-name" placeholder="First Name" required="" type="text" />
                <label class="input__label" for="first-name">
                  First Name
                </label></div>
            </div>
            <div class="input form__inline-input">
              <div class="input__container">
                <input class="input__field" id="last-name" placeholder="Last Name" required="" type="text" />
                <label class="input__label" for="last-name">
                  Last Name
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="username" placeholder="Username" type="text" />
                <label class="input__label" for="username">
                  User Name
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="email" placeholder="Email" required="" type="text" />
                <label class="input__label" for="email">
                  Email
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="password" placeholder="Password" required="" type="password" />
                <label class="input__label" for="password">
                  Password
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="confirm-password" placeholder="Confirm password" required="" type="password" />
                <label class="input__label" for="confirm-password">
                  Confirm password
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input-checkbox">
              <div class="input-checkbox__container">
                <input checked="" class="input-checkbox__field" id="agree" required="" tabindex="0" type="checkbox" />
                <span class="input-checkbox__square">
                </span><label class="input-checkbox__label" for="agree">
                  I agree with terms and conditions
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="component component--primary form__button">
              <button class="btn btn--regular" disabled="" id="sign-up-button" tabindex="0">
                Sign up
              </button></div>
          </div>
          <div class="form__row sign-up__sign">
            Already have an account? &nbsp;
            <a class="link" href="#">Sign in.
            </a>
          </div>
          <div class="form__row sign-up__terms">
            <a class="link" href="#">Term of use. Privacy policy
            </a>
          </div>
        </form>
      </div>
    </div>
  </main></body>

            );
        }
    }