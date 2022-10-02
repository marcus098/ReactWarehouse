import React from "react";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Cart.scss';

export class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
            classCart: "fade-rapid"
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        console.log("toggle");
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

    render(){
        console.log(this.state.classCart);
        return(
            <section>
                <nav>
                    <div class="containerCart">
                        <ul class="navbar-right">
                            <li><a href="#" id="cart" onClick={() => this.toggle()}><i class="fa fa-shopping-cart"></i> Cart <span class="badge">3</span></a></li>
                        </ul> 
                    </div> 
                </nav>


<div class={"containerCart "+ this.state.classCart}>
  <div class="shopping-cart">
    <div class="shopping-cart-header">
      <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">3</span>
      <div class="shopping-cart-total">
        <span class="lighter-text">Total:</span>
        <span class="main-color-text">$2,229.97</span>
      </div>
    </div> 

    <ul class="shopping-cart-items">
      <li class="clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg" alt="item1" />
        <span class="item-name">Sony DSC-RX100M III</span>
        <span class="item-price">$849.99</span>
        <span class="item-quantity">Quantity: 01</span>
      </li>

      <li class="clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item2.jpg" alt="item1" />
        <span class="item-name">KS Automatic Mechanic...</span>
        <span class="item-price">$1,249.99</span>
        <span class="item-quantity">Quantity: 01</span>
      </li>

      <li class="clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item3.jpg" alt="item1" />
        <span class="item-name">Kindle, 6" Glare-Free To...</span>
        <span class="item-price">$129.99</span>
        <span class="item-quantity">Quantity: 01</span>
      </li>
    </ul>

    <a href="#" class="button">Checkout</a>
  </div>
</div> 
            </section>
        );
    }
}