import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import '../css/Overlay.sass';

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
        if(this.refs.name.value!=''){
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
        if(this.state.idPositionSelected == 0){
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
                <select ref="positionSelect" style={{border:"none", borderBottom: "1px solid silver", margin:"10px", borderRadius:"10px", width:"100px", textAlign: "center", background:"transparent", color: "white"}}>
                    {positionOption}
                </select>
            );
            saveButton = (
                <Button className="buttonOverlay" onClick={this.saveWithExistingIdPosition}>Salva</Button>
            );
        }
        var searched = [];
        if(this.state.positionsSearched.length != 0){
            for(var i = 0; i < this.state.positionsSearched.length; i++){
                var classDivTmp = "selectedPosition";
                if(this.state.idPositionSelected == this.state.positionsSearched[i].id)
                    classDivTmp = "positionOrderOverlaySelected";

                searched.push(
                    <div className="positionOrderOverlay" key={this.state.positionsSearched[i].id} >
                        <div className={classDivTmp} data-idPosition={this.state.positionsSearched[i].id} onClick={this.setPosition}>{this.state.positionsSearched[i].name}</div>
                        <br></br>
                    </div>
                );
        }
    }
        return (
            <section>
                    
                    <form id="msformOverlay">
                    <fieldset>
                       
                    </fieldset>
                    <fieldset>
                       <div className="row nameOrder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                               <h1>{this.props.props.product.name}</h1> 
                            </div>
                        </div>
                        
                        <div className="row supplierOrder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <span className="titleOverlay">Fornitore: </span>
                                <span className="subtitleOverlay">{this.props.props.nameSupplier}</span>
                            </div>
                        </div>
                        <div className="row quantityOrder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <span className="titleOverlay">Quantita': </span>
                                <span className="subtitleOverlay">{this.props.props.quantity}</span>
                            </div>
                        </div>
                        <div className="row dateOrder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <span className="titleOverlay">Data: </span>
                                <span className="subtitleOverlay">{this.props.props.date}</span>
                            </div>
                        </div>
                        <div className="row totalOrder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <span className="titleOverlay">Totale: </span>
                                <span className="subtitleOverlay">€{this.props.props.total}</span>
                            </div>
                        </div>
                        <div className="row descriptionOrder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                {this.props.props.description}
                            </div>
                        </div>
                        {/*inputElements*/}
                        <fieldset>
                            
                        </fieldset>
                        <fieldset>
                            {positionSelect}
                            <i class="bi bi-plus-circle icon clickable next" style={{color:"white"}} onMouseEnter={(e) => e.target.style.color="#2196F3"} onMouseOut={(e) => e.target.style.color="white"}></i>
                            <br></br>
                            <br></br>
                            {saveButton}
                        
                        </fieldset>
                        <fieldset>
                            <input type="text" ref="searchPosition" onChange={this.searchPosition} className="searchPosition" style={{width:"15%", marginLeft: "44px", marginTop:"-10px", marginBottom:"30px", border:"0px", borderBottom:"2px solid white", background:"transparent"}} placeholder="Cerca posizione"></input>
                            <i class="bi bi-plus-circle icon clickable next" style={{color:"white"}} onMouseEnter={(e) => e.target.style.color="#2196F3"} onMouseOut={(e) => e.target.style.color="white"}></i><br></br>
                            {searched}
                            <i class="bi bi-arrow-left-circle iconOverlay clickable previous backOverlay" style={{position:"absolute", left: "-120px", fontSize: "26px"}}></i>
                            <Button className="buttonOverlay" onClick={this.saveNewWithExistingIdPosition}>Salva</Button>
                        </fieldset>
                        <fieldset>
                            <input type="text" className="inputOrderOverlay" placeholder="Nome" ref="name"></input><br></br>
                            <input type="text" className="inputOrderOverlay" placeholder="Descrizione" ref="description"></input><br></br>
                            <i class="bi bi-arrow-left-circle iconOverlay clickable previous backOverlay" style={{position:"absolute", left: "-120px", fontSize: "26px"}}></i>
                           
                            <Button className="buttonOverlay" onClick={this.savePosition}>Salva e Aggiungi</Button>
                        </fieldset>
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