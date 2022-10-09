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
          products: []
        }
        
    }

    componentDidMount = () => {
      var storedArray = JSON.parse(sessionStorage.getItem("productsCart"));
      if(storedArray && storedArray.length != 0)
        this.setState({products: storedArray});
    }

    emptyCart = () =>{
      this.setState({products: []});
      window.sessionStorage.removeItem("productsCart");
    }

    sell = () =>{
      var storedArray = JSON.parse(sessionStorage.getItem("productsCart"));
      axios.post('http://localhost:8081/api/sell', {
            list: storedArray
          })
          .then((response) => {
            if(response.data){
              this.setState({products: []});
              window.sessionStorage.removeItem("productsCart");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    modifyQuantity = (idProduct, newQuantity) =>{
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
      }
    }

    addToCart = (idProduct, nameProduct, priceProduct) => {
      if(this.state.products && this.state.products.length!=0){
        for(var i = 0; i < this.state.products.length; i++){
          console.log("Confronto: " + this.state.products[i].id + " - " + idProduct);
          if(this.state.products[i].id == idProduct){
            this.state.products[i].quantity += 1;
            window.sessionStorage.setItem("productsCart", JSON.stringify(this.state.products));
            return;
          }
        }
      }
      var arr = {id:idProduct,name:nameProduct,quantity:1, price: priceProduct};
      this.setState({products: this.state.products.push(arr)});
      window.sessionStorage.setItem("productsCart", JSON.stringify(this.state.products));
      //var storedArray = JSON.parse(sessionStorage.getItem("productsCart"));
      //console.log(this.state.products);
    }

    render(){
      var sell = this.sell;
      var emptyCart = this.emptyCart;
      var modifyQuantity = this.modifyQuantity;
      var addToCart = this.addToCart;
      console.log(this.state.products);
      var cart = ( <Cart products={this.state.products} 
        modifyQuantity={this.modifyQuantity} 
        sell={this.sell} 
        emptyCart={this.emptyCart}></Cart>);
      return (
        <section>
         {cart}
          <Navbar role={this.props.role} />
          <main>
            <div className="row spostamento">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 rowContent">
                  {React.cloneElement(this.props.children, {sell,emptyCart,modifyQuantity,addToCart})}
                </div>
            </div>
        </main>
        </section>
      )
    }
  }
  export default Layout;
  

  /*function Layout(props){
    console.log(props);
    useCart().setItems(products);
    console.log(useCart().isEmpty);

    return (
      <section>
        <Cart></Cart>
        <Navbar role={props.role} />
        <main>
          <div className="row spostamento">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 rowContent">
                  {props.children}
              </div>
          </div>
      </main>
      </section>
    ) 
  }
  export default Layout;*/