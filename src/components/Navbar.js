import React from "react";
import '../css/Navbar.css';
import { Link } from "react-router-dom";


export class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {toRender: (<></>)};
    }
   

    render(){    
        return(
            <section>
                <div class="area"></div><nav class="main-menu">
            <ul>
                <li>
                    <a href="/home">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                            Home
                        </span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="/account">
                        <i class="fa fa-user fa-2x"></i>
                        <span class="nav-text">
                            Account
                        </span>
                    </a>       
                </li>

                <li class="has-subnav">
                    <a href="/products">
                       <i class="fa fa-cubes fa-2x"></i>
                        <span class="nav-text">
                            Prodotti
                        </span>
                    </a>
                </li>

                <li class="has-subnav">
                    <a href="/orders">
                       <i class="fa bi bi-card-checklist fa-2x"></i>
                        <span class="nav-text">
                            Ordini
                        </span>
                    </a>
                </li>
                
                <li>
                    <a href="/purchases">
                        <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            Vendite
                        </span>
                    </a>
                </li>
                
                <li>
                    <a href="/position">
                        <i class="fa bi bi-bookshelf fa-2x"></i>
                        <span class="nav-text">
                           Posizioni
                        </span>
                    </a>
                </li>
                
                <li>
                   <a href="/userControl">
                       <i class="fa fa-users fa-2x"></i>
                        <span class="nav-text">
                            Pannello Utenti
                        </span>
                    </a>
                </li>
                
                
                <li>
                   <a href="/automation">
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                            Automazioni
                        </span>
                    </a>
                </li>
            </ul>

            <ul class="logout">
                <li>
                   <a href="/logout">
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
            </section>
        );
    }
}