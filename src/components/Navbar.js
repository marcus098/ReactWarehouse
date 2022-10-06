import React from "react";
import '../css/Navbar.css';
import { Link } from "react-router-dom";


export class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {toRender: (<></>)};
    }
    //functions

    render(){
       /* var arrElements;
        switch(this.props.role){
            case "admin":
                arrElements = ( 
                    <div className="navbar">
                <Link className="logo" to="/home">Logo</Link>
                <Link className="element" to="/home">Home</Link>
                <Link className="element" to="/account">Account</Link>
                <Link className="element" to="/products">Prodotti</Link>
                <Link className="element" to="/orders">Ordini</Link>
                <Link className="element" to="/purchases">Acquisti</Link>
                <Link className="element" to="/">Vendite</Link>
                <Link className="element" to="/usercontrol">Pannello Utenti</Link>
                <Link className="element" to="/automation">Automatizzazioni</Link>
                <Link className="element logout" to="/logout">Logout</Link>
                </div>
                );
                break;
            case "simple":
                return (
                <></>
                );
            case "seller":
                return (
                <></>
                );
                
        }
        
        return(
            <section>
                <div className="close2">X</div>
           
               {arrElements}
            </section>
        );*/
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
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                            Account
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="/products">
                       <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Prodotti
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="/orders">
                       <i class="fa fa-folder-open fa-2x"></i>
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
                        <i class="fa fa-font fa-2x"></i>
                        <span class="nav-text">
                           Posizioni
                        </span>
                    </a>
                </li>
                <li>
                   <a href="/userControl">
                       <i class="fa fa-table fa-2x"></i>
                        <span class="nav-text">
                            Pannello Utenti
                        </span>
                    </a>
                </li>
                <li>
                   <a href="/controlPanel">
                       <i class="fa fa-table fa-2x"></i>
                        <span class="nav-text">
                            Controllo Generale
                        </span>
                    </a>
                </li>
                <li>
                   <a href="/automation">
                        <i class="fa fa-map-marker fa-2x"></i>
                        <span class="nav-text">
                            Automatizzazioni
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