import React from "react";
import { Button } from "react-bootstrap";

export default class PurchaseOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderButton:false,
        }
    }

    render(){
        var inputElements = [];
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
                        <div className="row" key={"product" + product.id}>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">{product.product.name}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">{product.product.category.name}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2"><select>{positionElements}</select></div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">{product.product.quantity}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">€{product.product.priceSell}</div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-2">{product.product.description}</div>
                        </div>
                    );
                });

                return(
                    <section>
                            <div className="row title">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12"></div>
                            </div>
                            <div className="row description">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {arrElements}
                                </div>
                            </div>
                            <div className="row price">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12"></div>
                            </div>
                            <div className="row buttons">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {inputElements}
                                </div>
                            </div>
                            
                    </section>
                );
    }
}