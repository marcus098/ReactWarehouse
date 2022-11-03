import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Cart.scss';
import CartElement from "./Elements/CartElement";

export class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      toggle: false,
      classCart: "fade-rapid",
      products: [],
      sell:false,
      count: 0,
      reload: false
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
  
  componentDidUpdate = (prevProps) => {
    if(this.props.id !== prevProps.id && prevProps.id != 0) 
      this.setState({products: prevProps.products});
  } 
  
  render(){
    if(this.state.reload)
      this.setState({reload: false});
    var productsElement = (<div>Carrello Vuoto</div>);
    var numberProducts = 0;
    var buttonBuy = (<></>)
    var total = 0;
    var products = this.state.products;
    var descriptionText = (<></>);
    if(this.props.id == 1)
      products = this.props.products;
    if(products && products.length != 0){
      descriptionText = (
        <textarea 
          placeholder="Descrizione" 
          ref="description" 
          style={{border:"1px solid silver", borderRadius:"10px", width:"250px"}}>
        </textarea>
      );
      numberProducts = products.length;
      productsElement = [];
      for(var i = 0; i < products.length; i++){
        total += (products[i].quantity * (products[i].price - (products[i].price * (products[i].discount/100))));
        var id = products[i].id;
        var name = products[i].name;
        var price = products[i].price - (products[i].price * (products[i].discount/100));
        var quantity = products[i].quantity;
        productsElement.push(
          <CartElement 
            id={id}
            name={name}
            price={price}
            quantity={quantity}
            addToCart={this.props.addToCart}
          />
          );
        }
        buttonBuy = (<a href="#" class="button" onClick={() => {this.props.sell(this.refs.description.value); Cart.render()}}>Vendi</a>); 
      }
      return(
        <section>
          <nav>
            <div class="containerCart">
              <ul class="navbar-right">
                <li><a id="cart" onClick={() => this.toggle()}><i className="fa fa-shopping-cart iconCart"></i> Carrello <span class="badge">{numberProducts}</span></a></li>
              </ul> 
            </div> 
          </nav>
          <div className={"containerCart "+ this.state.classCart}>
            <div className="shopping-cart">
              <div class="shopping-cart-header">
                <i class="fa fa-shopping-cart cart-icon"></i><span class="badge" style={{marginLeft:"-260px"}}>{numberProducts}</span>
                <div class="shopping-cart-total">
                  <span class="lighter-text">Totale:</span>
                  <span class="main-color-text">€{total}</span>
                </div>
              </div> 
        
              <ul class="shopping-cart-items">
                {productsElement}
              </ul>
              {descriptionText}
              {buttonBuy}
            </div>
          </div> 
        </section>
      );
    }
  }