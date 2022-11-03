import React from "react";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cart } from "../components/Cart";
import { CartProvider } from "react-use-cart";
import { useCart } from "react-use-cart";
import Product from "../components/Product";
import axios from "axios";

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      count: 0,
      id: 0,
      cart: (<></>)
    }
  }

  componentDidMount = () => {
    var storedArray = JSON.parse(localStorage.getItem("productsCart"));
    console.log(storedArray);
    if(storedArray && storedArray.length != 0){
      this.setState({products: storedArray, id: this.state.id+1});
    }
  }

  emptyCart = () => {
    this.setState({products: [], id: this.state.id+1});
    localStorage.removeItem("productsCart");
    this.setState({count: this.state.count+1});
  }

  sell = (desc) => {
    this.setState({count: this.state.count+1});
    var storedArray = JSON.parse(localStorage.getItem("productsCart"));
    axios.post('http://localhost:8081/api/sell', {
      list: storedArray
    }, {
    headers: {
      userToken: localStorage.getItem("userToken"),
      description: desc
    }
  })
    .then((response) => {
      if(response.data){
        this.setState({products: [], id: this.state.id+1});
        localStorage.removeItem("productsCart");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    
  modifyQuantity = (idProduct, newQuantity) => {
    if(this.state.products.length!=0){
      for(var i = 0; i < this.state.products.length; i++){
        if(this.state.products[i].id == idProduct){
          if(newQuantity==0){
            this.state.products.splice(i, 1);
          }else if(newQuantity>0){
            this.state.products[i].quantity = newQuantity;
          }
          break;
        }
      }
      this.setState({count: this.state.count+1});
    }
  }

  addToCart = (idProduct, nameProduct, priceProduct, quantityProduct, discountProduct) => {
    var value = false;
    if(this.state.products && this.state.products.length != 0){
      var arrTmp = [];
      for(var i = 0; i < this.state.products.length; i++){
        arrTmp[i] = this.state.products[i];
        if(this.state.products[i].id == idProduct){
          localStorage.setItem("productsCart", JSON.stringify(this.state.products));
          value = true;
          arrTmp[i].quantity = parseInt(arrTmp[i].quantity) + parseInt(quantityProduct);
        }
      }
    }
    if(value){
      this.setState({product: arrTmp});
      localStorage.setItem("productsCart", JSON.stringify(this.state.products));
      return;
    }
    var arr = {id:idProduct,name:nameProduct, price: parseInt(priceProduct), quantity: parseInt(quantityProduct), discount: parseInt(discountProduct)};
    this.setState({products: this.state.products.push(arr), id: this.state.id+1});
    localStorage.setItem("productsCart", JSON.stringify(this.state.products));
  }

  hideRowContent = () => {
    this.refs.rowContent.style.zIndex = "101";
  }

  showRowContent = () => {
    this.refs.rowContent.style.zIndex = "100";
  }

  render(){
    var sell = this.sell;
    var emptyCart = this.emptyCart;
    var modifyQuantity = this.modifyQuantity;
    var addToCart = this.addToCart;
    var showRowContent = this.showRowContent;
    var hideRowContent = this.hideRowContent;
    var cart = ( 
      <Cart 
          products={this.state.products} 
          modifyQuantity={this.modifyQuantity} 
          sell={this.sell} 
          emptyCart={this.emptyCart}
          addToCart={this.addToCart}
        ></Cart>
    );
    console.log("Carico");
    
      return (
        <section>
          {/*this.state.cart*/}
          <Cart 
            id={this.state.id}
            products={this.state.products} 
            modifyQuantity={this.modifyQuantity} 
            sell={this.sell} 
            emptyCart={this.emptyCart}
            addToCart={this.addToCart}
        ></Cart>
          <Navbar role={this.props.role} />
          <main>
            <div className="row spostamento">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 rowContent" ref="rowContent" style={{zIndex: "100"}}>
                {React.cloneElement(this.props.children, {sell,emptyCart,modifyQuantity,addToCart,showRowContent, hideRowContent})}
              </div>
            </div>
          </main>
        </section>
      )
    }
  }
  export default Layout;