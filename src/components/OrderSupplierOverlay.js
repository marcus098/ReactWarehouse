import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

export default class OrderSupplierOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            suppliers: [],
        }
    }

    componentDidMount = () => {
        this.chargeSuppliers();
    }

    chargeSuppliers = () => {
        axios.post('http://localhost:8081/api/suppliers/getProduct/'+this.props.idProduct, {
            
          })
          .then((response) => {
            if(response.data){
              this.setState({suppliers: response.data});
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        var elements = [];
        for(var i = 0; i < this.state.suppliers.length; i++){
            elements.push(
                    <option ref="supplierId" value={this.state.suppliers[i].id}>
                        {this.state.suppliers[i].name} 
                        {this.state.suppliers[i].email} 
                                           
                        {/*this.state.suppliers[i].price*/}
                    </option>
            );
        }
        return(
            <section>
                <select onChange={(e) => this.props.setSupplierId(e.target.value)}>
                    {elements}
                </select>

                <Button onClick={(e) => {
                    this.props.saveSupplier(this.state.suppliers[i].value)
                } }></Button>
            </section>
        );
    }
}