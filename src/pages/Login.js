import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/Login.css';
import '../css/Login.sass';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorMsg: '', 
            usrTokn: localStorage.getItem("userToken")/* sessionStorage.getItem("userToken")*/,
            email: '',
            password: '',
            isLoading:true,
            errorFetch: ''
        };        
    }
    
    componentDidMount() {
        this.checkToken();
    }
    
    checkToken = async () => {
        this.setState({errorFetch: ''})
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: localStorage.getItem("userToken")/* sessionStorage.getItem("userToken")*/ })
        };
        fetch('http://localhost:8081/api/check', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data==0)
                window.location.replace(`http://localhost:3000/home`);
            this.setState({isLoading: false});
        })
        .catch((error)=>{
            if(error == "TypeError: Failed to fetch"){
                this.setState({errorFetch: "Impossibile collegarsi al server"});
            }   
        });
        
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.refs.email.value);
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
        //console.log(content);
        this.setState({errorMsg: content.message})
        if(content.accessToken != "0"){
            this.setState({usrTokn: content.accessToken});
            localStorage.setItem("userToken", content.accessToken);
            //sessionStorage.setItem("userToken", content.accessToken);
            //window.sessionStorage.removeItem("productsCart");
            localStorage.removeItem("productsCart");
            window.location.replace(`http://localhost:3000/home`);
        }
    }catch(err){
        this.setState({errorMsg: 'errore'});
    }
}

render(){
        return(
            <section className="user">
  <div className="user_options-container">
    <div className="user_options-text">
      <div className="user_options-unregistered">
        <h2 className="user_unregistered-title">titolo login</h2>
        <p className="user_unregistered-text">descrizione login</p>
        <button className="user_unregistered-signup" id="signup-button loginButton">Contatta l'amministratore</button>
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
    //}
}
export default Login;