import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/Login.css';
import '../css/Login.sass';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorMsg: '', 
            usrTokn: sessionStorage.getItem("userToken"),
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
            body: JSON.stringify({ value: sessionStorage.getItem("userToken") })
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
        try{
            const rawResponse = await fetch('http://localhost:8081/api/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        });
        const content = await rawResponse.json();
        this.setState({errorMsg: content.message})
        if(content.accessToken != "0"){
            this.setState({usrTokn: content.accessToken});
            sessionStorage.setItem("userToken", content.accessToken);
            window.location.replace(`http://localhost:3000/home`);
        }
    }catch(err){
        this.setState({errorMsg: 'errore'});
    }
}

render(){
    
    /*if(this.state.isLoading==true){
        return (
            <div>
        <div>Waiting</div>
        {this.state.errorFetch}
        </div>
        );
    }else {*/
    /*<div className='login'>
               <p className='error'> {this.state.errorFetch}</p>
            <p className='error'>{this.state.errorMsg}</p>
            <form onSubmit={this.handleSubmit}>
            <div>Email: </div>
            <input type="text" onChange={(e) => this.setState({email: e.target.value})} required></input>
            <div>Password: </div>
            <input type="password" onChange={(e) => this.setState({password: e.target.value})} required></input>
            <br></br>
            <input className='submit' type="submit" value="Accedi"></input>
            </form>*/
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
        <h2 className="forms_title">Login</h2>
        <form className="forms_form" onSubmit={this.handleSubmit}>
          <fieldset className="forms_fieldset">
            <div className="forms_field">
              <input type="email" placeholder="Email" className="forms_field-input loginInput" onChange={(e) => this.setState({email: e.target.value})} required autoFocus />
            </div>
            <div className="forms_field">
              <input type="password" placeholder="Password" className="forms_field-input loginInput" onChange={(e) => this.setState({password: e.target.value})} required />
            </div>
          </fieldset>
          <div className="forms_buttons">
            <button type="button" className="forms_buttons-forgot loginButton">Password dimenticata?</button>
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