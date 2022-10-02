import { render } from "@testing-library/react";
import React from "react"
import '../css/AddAccount.css';
import "./functions";
import {Helmet} from "react-helmet";
import $ from "jquery";

export default class AddOrder extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
    }
    render(){
        var buttonNext1;
        buttonNext1 = (
            <input type="button" name="next" class="next action-button" value="Next" />
        );
        return(
            <form id="msform">
                
  <ul id="progressbar">
    <li class="active">Prodotto</li>
    <li>Fornitore</li>
    <li>Dettagli</li>
  </ul>
  <fieldset>
    <h2 class="fs-title">Inserisci il prodotto</h2>
    <h3 class="fs-subtitle"></h3>
    <input type="text" name="search" placeholder="Nome Prodotto" />
    <select></select>
    <br></br>
            {buttonNext1}
   
  </fieldset>
  <fieldset>
    <h2 class="fs-title">Social Profiles</h2>
    <h3 class="fs-subtitle">Your presence on the social network</h3>
    <input type="text" name="twitter" placeholder="Twitter" />
    <input type="text" name="facebook" placeholder="Facebook" />
    <input type="text" name="gplus" placeholder="Google Plus" />
    <input type="button" name="previous" class="previous action-button" value="Previous" />
    <input type="button" name="next" class="next action-button" value="Next" />
  </fieldset>
  <fieldset>
    <h2 class="fs-title">Personal Details</h2>
    <h3 class="fs-subtitle">We will never sell it</h3>
    <input type="text" name="fname" placeholder="First Name" />
    <input type="text" name="lname" placeholder="Last Name" />
    <input type="text" name="phone" placeholder="Phone" />
    <textarea name="address" placeholder="Address"></textarea>
    <input type="button" name="previous" class="previous action-button" value="Previous" />
    <input type="submit" name="submit" class="submit action-button" value="Submit" />
  </fieldset>
</form>
        );
    }
}