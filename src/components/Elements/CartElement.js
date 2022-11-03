import React from "react";

export default class CartElement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quantity: this.props.quantity
        }
    }

    modifyCart = (value) => {
        this.props.addToCart(this.props.id, this.props.name, this.props.price, value, 0);
        this.setState({quantity: this.state.quantity+value});
        console.log(value);
    }

    render() {
        return(
            <li class="clearfix">
                <span class="item-name">{this.props.name}</span>
                <span class="item-price">€{this.props.price}</span>
                <span class="item-quantity">
                    Quantita': <i class="bi bi-dash-circle" onClick={(e) => this.modifyCart(-1)}></i>
                    <span style={{paddingLeft:"10px", paddingRight:"10px", textAlign:"center", border:"0px"}} ref="prova">
                        {this.state.quantity}
                    </span> 
                    <i class="bi bi-plus-circle" onClick={(e) => this.modifyCart(1)}></i>
                </span>
            </li>
        );
    }
}