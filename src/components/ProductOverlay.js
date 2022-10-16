import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

export default class ProductOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderButton: false,
            suppliers: [],
            idSupplier: 0,
            target: null,
            total: this.calcTotal()
        }
    }

    calcTotal = () => {
        var total = this.props.props.product.priceSell;
        if(this.props.props.product.discount != 0){
            total = this.props.props.product.priceSell - ((this.props.props.product.priceSell * this.props.props.product.discount) / 100);
        }
        return total;
    }
    
    chargeSuppliers = () => {
        axios.post('http://localhost:8081/api/suppliers/getProduct/'+this.props.idProduct, {
            userToken: localStorage.getItem("userToken"),
        })
        .then((response) => {
            console.log(response.data);
            if(response.data){
                this.setState({suppliers: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
        this.chargeSuppliers();
    }
    

    setSupplierId = (event) => {
        this.setState({idSupplier:event.target.dataset.id, target:event.target});
        if(this.state.target != null){
            this.state.target.className="";
        }
        event.target.className="supplierSelected";
    }

    saveSupplier = () => {
        if(this.refs.quantity.value != "" && this.state.idSupplier != 0){
            console.log(this.state.idSupplier);
            if(this.refs.quantity.value > 0){
                axios.post('http://localhost:8081/api/orders/add', {
                    userToken: localStorage.getItem("userToken"),
                    description: this.refs.description.value,
                    quantity: this.refs.quantity.value,
                    idSupplier: this.state.idSupplier,
                    idProduct: this.props.props.product.id
                })
                .then((response) => {
                    console.log(response);
                    if(response.data.bool){
                        this.props.props.handler();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                //show error message importo < 0 
            }
        }else{
            //show error message dati non inseriti
        }
    }

    sell = () => {
       this.props.props.addToCart(this.props.props.product.id, this.props.props.product.name, this.props.props.product.priceSell, this.refs.quantitySell.value, this.refs.discountSell.value);
        this.props.props.handler();
    }

    totalFunction = () => {
        var price = this.props.props.product.priceSell;
        var total = price;
        var quantity = this.refs.quantitySell.value;
        var discount = this.refs.discountSell.value;
        if(discount != 0){
            total = price - ((price * discount) / 100);
        }
        total *= quantity;
        console.log(total);
        this.setState({total: total});
        return total;
    }

    render(){
        var elements = [];
        if(this.props.searchSuppliers && this.state.suppliers.length!=0){
            for(var i = 0; i < this.state.suppliers.length; i++){
                elements.push(
                    <div data-id={this.state.suppliers[i].id} key={this.state.suppliers[i].id} onClick={this.setSupplierId} style={{cursor:"pointer", fontSize:"20px", padding:"10px"}}>
                        {this.state.suppliers[i].name + " " +this.state.suppliers[i].email + " €" +this.state.suppliers[i].price}
                    </div>
                );
            }
        }
        var discountPriceElement;
        var discountPercentageElement;
        var finalPrice = 0;
        var spanClass = "";
        if(this.props.props.product.discount != 0){
            spanClass = "cut";
            finalPrice = this.props.props.product.priceSell - ((this.props.props.product.priceSell * this.props.props.product.discount) / 100);
            discountPriceElement = "€" + finalPrice;
            discountPercentageElement = " -" + this.props.props.product.discount + "%";
        }
        return (
            <section>
                <form id="msformOverlay">
                    <fieldset>
                        
                        <i class="bi bi-arrow-left-circle iconOverlay clickable next" style={{position:"absolute", top:"-41px", left: "-120px", fontSize: "26px"}}></i>
                        Quantita': <input placeholder="Quantita'" min="1" max={this.props.props.quantity} onChange={this.totalFunction} ref="quantitySell" defaultValue="1"></input><br></br>
                        Sconto: (%) <input placeholder="Sconto in %" onChange={this.totalFunction} defaultValue={this.props.props.product.discount} ref="discountSell"></input><br></br>
                        <br></br>
                        <span style={{height: "100px"}}>Totale: €{this.state.total}</span> 
                        <br></br>
                        <Button className="action-button" onClick={this.sell}>Vendi</Button>
                    </fieldset>
                    <fieldset>
                        
                        <div className="row title">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <h1>
                                <span><i class="bi bi-pen"></i></span> 
                                {this.props.props.product.name} 
                            </h1>
                          </div>
                        </div>
                        <div className="row description">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                {this.props.props.product.description}
                            </div>
                        </div>
                        <div className="row price">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">Prezzo di vendita: 
                                <span className={spanClass}> €{this.props.props.product.priceSell}</span>
                                <span style={{color:"red"}}>{discountPriceElement}</span>
                                <span style={{color:"red"}}>{discountPercentageElement}</span>
                            </div>
                        </div>
            
                        {/*inputElements*/}
                        <Button className="next action-button">Ordina</Button>
                        <Button className="action-button previous">Vendi</Button>  
                    </fieldset>
            
                    <fieldset style={{ justifyContent: "center"}}>
                        <span style={{fontSize: "26px"}}>Lista fornitori:</span>
                            {elements}
                        <input type="number" style={{ padding:"10px", marginTop:"20px" }} placeholder="Quantita" ref="quantity"></input><br></br>
                        <textarea type="text" placeholder="Descrizione" ref="description" style={{width:"40%", height:"150px"}}></textarea><br></br>
                        <i class="bi bi-arrow-left-circle iconOverlay clickable previous" style={{position:"absolute", top:"-41px", left: "-120px", fontSize: "26px"}}></i>
                        
                        <Button onClick={this.saveSupplier}>
                                Ordina
                        </Button>
                    </fieldset>
                </form>
            
            
            </section>
            );
        }
    }