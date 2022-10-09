import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

export default class OrderOverlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            positionsSearched: [],
            idPositionSelected: 0,
            positionsProduct: []
        }
    }

    searchPosition = () => {
        var modified = false;
        console.log(this.refs);
        axios.get("http://localhost:8081/api/position/" + this.refs.searchPosition.value + "/" + this.props.props.product.id)
        .then((response) => {
            if(response.data.length != 0){
                this.setState({positionsSearched: response.data});
                modified = true;
            }
        })
        .catch(this.setState({positionsSearched: []}));
        if(modified==false){
            this.setState({positionsSearched:[]});
        }
    }

    componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "./functions.js";
        script.async = true;
        document.body.appendChild(script);
        this.chargeData();
    }

    chargeData = () => {
        axios.get("http://localhost:8081/api/position/"+this.props.props.product.id)
        .then((response) => {
            if(response.data.length!=0){
                this.setState({positionsProduct: response.data});
            }
        })
        .catch(this.setState({positionsProduct: []}));
    }

    savePosition = () => {
        if(this.refs.name!=''){
            this.props.props.confirm(this.refs.name.value, this.refs.description.value);
            //this.props.props.delete();
        }else{
            //Show error message
        }
    }
    //confermo il prodotto in una posizione già esistente
    saveWithExistingIdPosition = () => {
        this.props.props.saver(this.refs.positionSelect.value);
    }

    saveNewWithExistingIdPosition = () => {
        if(this.state.idPositionSelected==0){
            //Show error message
        }else{
            this.props.props.saver(this.state.idPositionSelected);
        }
    }

    setPosition = (event) => {
        this.setState({idPositionSelected: event.target.dataset.idposition});
    }

    render(){
        var positionSelect;
        var positionOption = [];
        var saveButton;
        if(this.state.positionsProduct.length!=0){
            for(var i = 0; i < this.state.positionsProduct.length; i++){
                positionOption.push(
                    <option value={this.state.positionsProduct[i].id}>
                        {this.state.positionsProduct[i].name}
                    </option>
                );
            }
            positionSelect=(
                <select ref="positionSelect" onChange={(e) => {  }}>
                    {positionOption}
                </select>
            );
            saveButton = (
                <Button onClick={this.saveWithExistingIdPosition}>Salva</Button>
            );
        }
        console.log(this.state.positionsSearched);
        var searched = [];
        if(this.state.positionsSearched.length != 0){
            for(var i = 0; i < this.state.positionsSearched.length; i++){
            searched.push(
                <span key={this.state.positionsSearched[i].id} data-idPosition={this.state.positionsSearched[i].id} onClick={this.setPosition}>
                    {this.state.positionsSearched[i].name}
                    {console.log(this.state.positionsSearched[i])}
                    <br></br>
                </span>
            );
        }
    }
        console.log("Id Position: " + this.state.idPositionSelected);
        return (
            <section>
                    
                    <form id="msformOverlay">
                    <fieldset>
                       
                    </fieldset>
                    <fieldset>
                       
                        <div className="row title">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">Titolo prodotto</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                {this.props.props.id} {this.props.props.product.name} {this.props.props.nameSupplier} {this.props.props.quantity} {this.props.props.total} {this.props.props.date}
                            </div>
                        </div>
                        <div className="row description">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                {this.props.props.description}
                            </div>
                        </div>
                        {/*inputElements*/}
                        <fieldset>
                            
                        </fieldset>
                        <fieldset>
                            {positionSelect}
                            {saveButton}
                            <br></br>
                        <Button className="next ">Nuova Posizione</Button>
                        </fieldset>
                        <fieldset>
                            <input type="text" ref="searchPosition" onChange={this.searchPosition} placeholder="Nome posizione"></input>
                            {searched}
                            <Button className="previous">Indietro</Button>
                            <Button onClick={this.saveNewWithExistingIdPosition}>Salva</Button>
                            <Button className="next">Crea Nuova</Button>
                        </fieldset>
                        <fieldset>
                            <input type="text" placeholder="Nome" ref="name"></input>
                            <input type="text" placeholder="Descrizione" ref="description"></input>
                            <Button className="previous">Indietro</Button>
                            <Button onClick={this.savePosition}>Salva e Aggiungi</Button>
                        </fieldset>
                        {/*fine*/}
                    </fieldset>
            
                    <fieldset>
                       
                          
                    </fieldset>
                </form>
            </section>
        );
    }
}

/*
                <div className="row title">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">Titolo prodotto</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            {this.props.props.id} {this.props.props.product.name} {this.props.props.nameSupplier} {this.props.props.quantity} {this.props.props.total} {this.props.props.date}
                        </div>
                    </div>
                    <div className="row description">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            {this.props.props.description}
                        </div>
                    </div>
                    {positionElement}*/