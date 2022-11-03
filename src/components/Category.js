import React from "react";

export default class Category extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div key={"category"+this.props.id} className="col-lg-3 col-md-3 col-sm-4 col-4">
                <div class="card bg-light mb-3" style={{minHeight:"0px"}}>
                    <div class="card-body" style={{minHeight:"130px"}}>
                        <h5 class="card-title clickable" onClick={() => this.props.charge(this.props.id)}>{this.props.name}</h5>
                        <p class="card-text">{this.props.description}</p>
                    </div>
                    <div class="card-heade divIcons">
                        <div>Numero Prodotti: </div>{this.props.number}
                        <i class="bi bi-plus-circle icon clickable" onClick={(e) => this.props.addProduct(this.props.id)}></i>
                        <i class="bi bi-trash icon clickable" onClick={(e) => this.props.delete(this.props.id)}></i>
                    </div>
                </div>
            </div>
            );
        }
    }