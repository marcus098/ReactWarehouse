import React from "react";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cart } from "../components/Cart";
import { CartProvider } from "react-use-cart";
import { useCart } from "react-use-cart";
import Product from "../components/Product";
import axios from "axios";
import Message from "../components/Message";

class Layout extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      products: [],
      count: 0,
      id: 0,
      cart: (<></>),
      updateProducts: false,
      messageBox: null
    }
  }

  componentDidMount = () => {
    var storedArray = JSON.parse(localStorage.getItem("productsCart"));
    if(storedArray && storedArray.length != 0){
      this.setState({products: storedArray, id: this.state.id + 1});
    }
  }

  componentDidUpdate = () => {
    if(this.state.updateProducts){
      var storedArray = JSON.parse(localStorage.getItem("productsCart"));
      if(storedArray && storedArray.length != 0){
        this.setState({products: storedArray, id: this.state.id + 1, updateProducts: false});
      }
    }
  }

  emptyCart = () => {
    this.setState({products: [], id: this.state.id + 1});
    localStorage.removeItem("productsCart");
  }

  sell = (desc) => {
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
      if(response.data.bool){
        this.setState({products: [], id: this.state.id + 1, updateProducts: true});
        localStorage.removeItem("productsCart");
      }
        this.setState({messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  emptyMessageBox = () => {
    this.setState({messageBox: null});
  }
    
  modifyQuantity = (idProduct, newQuantity) => {
    if(this.state.products.length != 0){
      var arrTmp = this.state.products;
      for(var i = 0; i < this.state.products.length; i++){
        if(this.state.products[i].id == idProduct){
          if(newQuantity == 0)
            arrTmp.splice(i, 1);
          else if(newQuantity > 0)
            arrTmp[i].quantity = newQuantity;
          
          this.setState({products: arrTmp, id: this.state.id + 1, updateProducts: true });
          localStorage.setItem("productsCart", JSON.stringify(this.state.products));
          return;
        }
      }
    }
  }

  addToCart = (idProduct, nameProduct, priceProduct, quantityProduct, discountProduct) => {
    var storedArray = JSON.parse(localStorage.getItem("productsCart"));
    if(storedArray && storedArray.length != 0){
      var arrTmp = storedArray;
      for(var i = 0; i < arrTmp.length; i++){
        if(arrTmp[i].id == idProduct){
          arrTmp[i].quantity = parseInt(arrTmp[i].quantity) + parseInt(quantityProduct);
          this.setState({products: arrTmp, id: this.state.id + 1, updateProducts: true});
          localStorage.setItem("productsCart", JSON.stringify(arrTmp));
          return;
        }
      }
      var arr = {id:idProduct,name:nameProduct, price: parseInt(priceProduct), quantity: parseInt(quantityProduct), discount: parseInt(discountProduct)};
      storedArray[storedArray.length] = arr;
      this.setState({products: storedArray, id: this.state.id + 1, updateProducts: true});
      localStorage.setItem("productsCart", JSON.stringify(storedArray));
      return;
    }
    var arr = [];
    arr[0] = {id:idProduct,name:nameProduct, price: parseInt(priceProduct), quantity: parseInt(quantityProduct), discount: parseInt(discountProduct)};
    this.setState({products: arr, id: this.state.id + 1, updateProducts: true});
    localStorage.setItem("productsCart", JSON.stringify(arr));
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
    var storedArray = JSON.parse(localStorage.getItem("productsCart"));
      return (
        <section>
          {this.state.messageBox}
          <Cart 
            id={this.state.id}
            products={storedArray} 
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