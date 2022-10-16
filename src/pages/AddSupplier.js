import React from "react"
import '../css/AddAccount.css';
import "./functions";
import axios from "axios";

export default class AddSupplier extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name: "",
      email: "",
      phone: "",
      api: ""
    }
  }
    
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "./functions.js";
    script.async = true;
    document.body.appendChild(script);
  }

  saveSupplier = () => {
    if(this.state.name!="" && this.state.email!="" && this.state.phone!=""){
      axios.post('http://localhost:8081/api/suppliers/add', {
        userToken: localStorage.getItem("userToken"),
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        api: this.state.api
      })
      .then((response) => {
        console.log(response);
        if(response){
          window.location.replace(`http://localhost:3000/suppliers`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }else{
      if(this.state.name == "")
        this.refs.name.className="input__field errorInput";
      if(this.state.email == "")
        this.refs.email.className="input__field errorInput";
      if(this.state.phone == "")
        this.refs.phone.className="input__field errorInput";
    }
  }

  render(){
    return(
      <main class="sign-up">
        <div class="sign-up__container">
          <div class="sign-up__content">
            <header class="sign-up__header">
              <h1 class="sign-up__title">
                Inserisci fornitore
              </h1>
              <p class="sign-up__descr">
                Inserisci un nuovo fornitore
              </p>
            </header>
            <form class="sign-up__form form">
              <div class="form__row form__row--two">
                <div class="input form__inline-input">
                  <div class="input__container">
                    <input class="input__field" ref="name" id="name" placeholder="Nome" required="" type="text" onChange={(e) => this.setState({name: e.target.value})} />
                    <label class="input__label" for="name">
                      Nome
                    </label>
                  </div>
                </div>
                  
              </div>
              <div class="form__row">
                <div class="input">
                  <div class="input__container">
                    <input class="input__field" ref="email" id="email" placeholder="Email" type="email" onChange={(e) => this.setState({email: e.target.value})} />
                    <label class="input__label" for="email">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div class="form__row">
                <div class="input">
                  <div class="input__container">
                    <input class="input__field" id="phone" ref="phone" placeholder="Telefono" required="" type="text" onChange={(e) => this.setState({phone: e.target.value})} />
                    <label class="input__label" for="phone">
                      Telefono
                    </label>
                  </div>
                </div>
              </div>
              <div class="form__row">
                <div class="input">
                  <div class="input__container">
                    <input class="input__field" id="api" ref="api" placeholder="Api" required="" type="text" onChange={(e) => this.setState({api: e.target.value})} />
                    <label class="input__label" for="api">
                      Api
                    </label>
                  </div>
                </div>
              </div>
                 
              <div className="form__row">
                <div className="component component--primary form__button">
                  <button id="buttonColor" className="btn btn--regular" onClick={(e) => { e.preventDefault(); this.saveSupplier() }} disabled="" id="sign-up-button" tabindex="0">
                    Aggiungi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>  
    );
  }
}