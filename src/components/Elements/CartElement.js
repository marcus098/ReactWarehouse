import React from "react";

export default class CartElement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quantity: 0,
            idChild: 0,
            notRender: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.idChild != 0 && (this.props.idChild != prevProps.idChild || this.props.quantity != prevProps.quantity))
            this.setState({quantity: prevProps.quantity});
        //console.log("elemento: " + this.props.name + ": " + this.props.quantity + " " + prevProps.quantity + " " + this.state.quantity);
    }

    modifyCart = (value) => {
        this.props.modifyCart(this.props.id, this.props.quantity+value);
        this.setState({quantity: this.state.quantity+value});
    }
    
    delete = () => {
        this.props.modifyCart(this.props.id, 0);
        this.setState({quantity: 0});
    }

    componentDidMount = () => {
        if(this.state.notRender == false){
            this.setState({quantity: this.props.quantity});
            if(this.props.quantity == 0)
                this.setState({notRender: true});
        }
    }

    render() {
        if(this.state.notRender)
            return(<></>);
        return(
            <li class="clearfix">
                <span class="item-name">{this.props.name} </span>
                <span class="item-price">€{this.props.price.toFixed(2)}</span>
                <span class="item-quantity">
                    Quantita': <i class="bi bi-dash-circle" onClick={(e) => this.modifyCart(-1)}></i>
                    <span style={{paddingLeft:"10px", paddingRight:"10px", textAlign:"center", border:"0px"}} ref="prova">
                        {this.props.quantity}
                    </span> 
                    <i class="bi bi-plus-circle" onClick={(e) => this.modifyCart(1)}></i>
                    <i class="bi bi-trash icon clickable" onClick={this.delete} style={{fontSize:"15px"}}></i>
                </span>
            </li>
        );
    }
}