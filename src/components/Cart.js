import React from "react";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Cart.scss';
import { Button } from "react-bootstrap";

export class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
            classCart: "fade-rapid",
            products: [],
            sell:false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if(this.state.classCart==""){
        this.setState({
          toggle: !this.state.toggle,
          classCart: "fade-in"
        });
    }else{
        this.setState({
            toggle: !this.state.toggle,
            classCart: ""
          });
    }
      }
      componentDidMount = () => {
        var storedArray = JSON.parse(sessionStorage.getItem("productsCart"));
        this.setState({products: storedArray});
        console.log(this.state.products);
        
      }
    render(){
        var productsElement = (<div>Carrello Vuoto</div>);
        var numberProducts = 0;
        var buttonBuy = (<></>)
        var total = 0;
        if(this.state.products && this.state.products.length != 0){
          numberProducts = this.state.products.length;
          productsElement = [];
          for(var i = 0; i < this.state.products.length; i++){
            total += (this.state.products[i].quantity * this.state.products[i].price);
            productsElement.push(
              <li class="clearfix">
                <span class="item-name">{this.state.products[i].name}</span>
                <span class="item-price">€{this.state.products[i].price}</span>
                <span class="item-quantity"><Button>-</Button>Quantita': {this.state.products[i].quantity}<Button>+</Button></span>
              </li>
            );
          }
          buttonBuy = (<a href="#" class="button" onClick={() => {this.props.sell(); Cart.render()}}>Vendi</a>); 
        }
        return(
            <section>
                <nav>
                    <div class="containerCart">
                        <ul class="navbar-right">
                            <li><a href="#" id="cart" onClick={() => this.toggle()}><i className="fa fa-shopping-cart"></i> Cart <span class="badge">{numberProducts}</span></a></li>
                        </ul> 
                    </div> 
                </nav>


<div className={"containerCart "+ this.state.classCart}>
  <div className="shopping-cart">
    <div class="shopping-cart-header">
      <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">{numberProducts}</span>
      <div class="shopping-cart-total">
        <span class="lighter-text">Totale:</span>
        <span class="main-color-text">€{total}</span>
      </div>
    </div> 

    <ul class="shopping-cart-items">
      {productsElement}
    </ul>

    {buttonBuy}
  </div>
</div> 
            </section>
        );
    }
}