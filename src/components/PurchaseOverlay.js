import React from "react";
import { Button } from "react-bootstrap";

export default class PurchaseOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    hideShow = (number) => {
        var str = "show"+number;
        if(document.getElementById(str).style.display=="none"){
            document.getElementById(str).style.display=""
        }else{
            document.getElementById(str).style.display="none"
        }
    }

    render(){
        var arrElements = [];
                var positionElements = [];
                this.props.props.purchase.products.map((product) => {
                    positionElements = [];
                    if(product.product.positionList){
                        product.product.positionList.map((pos) => {
                            positionElements.push(<option>{pos.name}</option>);
                    });
                }

                    arrElements.push(
                        <section style={{padding:"10px"}}>
                            <div className="row" onClick={(e) => this.hideShow(product.product.id)}>
                                <div className="col-md-12 col-sm-12 col-12 col-lg-12 text-center" style={{fontSize: "26px"}}>{product.product.name}</div>
                            </div>
                            <section id={"show"+product.product.id} ref={"show"+product.product.id} style={{display:"none", color:"silver", fontSize:"18px"}}>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-12 col-lg-12">Sconto: {product.discount}%</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-12 col-lg-12">Posizione: <span> </span>
                                        <select style={{background:"transparent", color:"white", border:"0px", borderBottom:"2px solid silver", borderRadius:"10px", width:"100px", textAlign:"center"}}>
                                            {positionElements}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-12 col-lg-12">Quantit&agrave;: {product.quantity}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-12 col-lg-12">Prezzo Vendita: €{product.price}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-12 col-lg-12">{product.product.description}</div>
                                </div>
                            </section>
                        </section>
                    );

                });

                return(
                    <section className="productList">
                            
                            <div className="row overlayPurchase">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {arrElements}
                                </div>
                            </div>
                            
                            
                    </section>
                );
    }
}