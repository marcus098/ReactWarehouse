import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Overlay from "./Overlay";

export default class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            icon: 'I',
            render: true
        };
    }
    infoOrder = (value) => {
        console.log(value);
        this.setState({overlay: true, order: value});
    }

    closeNavbar = () => {
        this.setState({overlay: false});
    }

    deleteOrder = () => {
        axios.post('http://localhost:8081/api/orders/delete', {
            id:this.props.id
          })
          .then((response) => {
            if(response.data.bool){
                this.setState({render: false});
            }else{
                //show error eliminazione non avvenuta
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }

    confirmOrderNewPosition = (namePosition, descriptionPosition) => {
        console.log(namePosition, descriptionPosition);
        axios.post("http://localhost:8081/api/orders/confirmNew/"+this.props.id,{
            name:namePosition,
            description:descriptionPosition
        })
        .then((response) => {
            if(response.data.bool)
                this.setState({render:false});
        })
        .catch(console.log("errore"));
    }

    saveWithExistingIdPosition = (idPosition) => {
        axios.post("http://localhost:8081/api/orders/confirm/"+this.props.id+"/"+idPosition,{
            
        })
        .then((response) => {
            if(response.data.bool)
                this.setState({render:false});
        })
        .catch(console.log("errore"));
    }

    render(){
        if(this.state.render){
            var element;
            if(this.state.clicked){
                element = (<ul className="mainMenu">
                <li onClick={() => this.setState({overlay:true})}>Arrivato</li>
                <li onClick={() => this.deleteOrder()}>Elimina</li>
                </ul>);
            }
            var overlayElement;
                if(this.state.overlay){
                    overlayElement = (
                        <Overlay
                            type="order" 
                            saver={this.saveWithExistingIdPosition}
                            confirm={this.confirmOrderNewPosition}
                            handler={this.closeNavbar} 
                            nameSupplier={this.props.name}
                            id={this.props.id}
                            quantity={this.props.quantity}
                            total={this.props.total}
                            description={this.props.description}
                            date={this.props.date}
                            product={this.props.product}
                        />
                    );
                }
            return (
                <div className="row">
                    {overlayElement}
                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">{this.props.id}</div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.product.name}</div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">{this.props.name}</div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-3">{this.props.date}</div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">{this.props.quantity}</div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">€{this.props.total}</div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                        <span onClick={() => {
                    if(this.state.clicked)
                        this.setState({clicked:false, icon: 'I'});
                    else{
                        this.setState({clicked:true, icon: 'X'});
                    }
                }}>{this.state.icon}</span>{element}
                    </div>
                </div>
        );
    }else{
        return (
            <></>
        );
    }
} 
}