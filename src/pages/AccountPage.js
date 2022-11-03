import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import '../css/Account.sass';
import axios from "axios";
import Loading from "../components/Loading";

export default class AccountPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            button: "Modifica",
            buttonClicked: false,
            isLoading: true,
            data: [],
            bool:true
        };
    }

  componentDidMount = () => {
      axios.post('http://localhost:8081/api/getUser', {
        userToken: localStorage.getItem("userToken")
    })
    .then((response) => {
      console.log(response.data);
        this.setState({isLoading: false, data: response.data});
    })
    .catch((error) => {
        this.setState({isLoading: false});
    });
  }

  saveData = (event) => {
    event.preventDefault();
    if(!this.state.bool){
      var nameRef = this.refs.name.value;
      var surnameRef = this.refs.surname.value;
      var phoneRef = this.refs.phone.value;
      var emailRef = this.refs.email.value;
      console.log(nameRef + " " + surnameRef+" " + phoneRef + " " + emailRef);
     this.setState({isLoading: true});
      var pass = "";
      if(this.refs.password.value != "xxxxxxx")
        pass = this.refs.password.value;
      axios.post('http://localhost:8081/api/user/modify', {
        userToken: localStorage.getItem("userToken"),
        password: pass,
        name: this.refs.name.value,
        surname: this.refs.surname.value,
        phone: this.refs.phone.value,
        email: this.refs.email.value
    })
    .then((response) => {
      console.log(response.data);
     
      this.componentDidMount();
      this.setState({isLoading: false});
      window.location.replace(`http://localhost:3000/account`);
      
    })
    .catch((error) => {
        this.setState({isLoading: false});
    });
    }
    this.setState({bool: !this.state.bool})
  }

    render(){
      if(this.state.isLoading){
        return(<Loading></Loading>);
      }else{
        return(
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-6">
    <div class="sign-up__container">
      <div class="sign-up__content">
        <header class="sign-up__header">
          <h1 class="sign-up__title">
            Account
          </h1>
          <p class="sign-up__descr">
            {/*descrizione pagina*/}
          </p>
        </header>
        <form class="sign-up__form form">
          <div class="form__row form__row--two">
            <div class="input form__inline-input">
              <div class="input__container">
                <input class="input__field" id="first-name" ref="name" placeholder="Nome" defaultValue={this.state.data.name} required="" type="text" readOnly={this.state.bool} onChange={(e) => console.log(this.refs.name.value)} />
                <label class="input__label" for="first-name">
                  {"Nome"}
                </label></div>
            </div>
            <div class="input form__inline-input">
              <div class="input__container">
                <input class="input__field" id="surname" ref="surname" placeholder="Cognome" required="" type="text" defaultValue={this.state.data.surname} readOnly={this.state.bool} />
                <label class="input__label" for="surname">
                {"Cognome"}
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="email" ref="email" placeholder="Email" type="text" defaultValue={this.state.data.email} readonly={this.state.bool} />
                <label class="input__label" for="email">
                {"Email"}
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="phone" ref="phone" placeholder="Telefono" required="" type="text" defaultValue={this.state.data.phone} readonly={this.state.bool} />
                <label class="input__label" for="phone">
                  {"Telefono"}
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                {this.state.bool ? 
                (<input class="input__field" id="password" ref="password" placeholder="Password" required="" value="xxxxxxx" type="password" readOnly={this.state.bool} />)
                : (<input class="input__field" id="password" ref="password" placeholder="Password" required="" type="password" readOnly={this.state.bool} />)}
                <label class="input__label" for="password">
                  {"Password"}
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <input class="input__field" id="role" placeholder="Ruolo" required="" type="role" value={this.state.data.role.name} readOnly />
                <label class="input__label" for="confirm-password">
                  {"Ruolo"}
                </label></div>
            </div>
          </div>
          <div class="form__row">
            <div class="component component--primary form__button">
              <button class="btn btn--regular" onClick={this.saveData} disabled="" id="sign-up-button" tabindex="0">
                {this.state.bool ? "Modifica" : "Salva"}
              </button></div>
          </div>
        </form>
      </div>
    </div>
    </div>
    <div className="col-lg-6 col-md-6 col-6 col-sm-6 descriptionAccount">
      <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            Modifica i tuoi dati personali, i tuoi contatti e la tua password.
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            
          </div>
      </div>
    </div>
          </div>
            );
        }
        }
    }