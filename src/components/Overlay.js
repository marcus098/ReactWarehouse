import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Layout.css';
import { Button } from "react-bootstrap";

export default class Overlay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderButton: false,
            sellButton: false,
            rowPosition: (<></>),
            modify:false,
            position: [],
            addPosition: false,
            menu: 0,
            namePosition:'',
            descriptionPosition:'',
            notRender:false,
            idPosition:0,
            selected: false
        };
    }

    searchPosition = (value) => {
        var modified = false;
        axios.get("http://localhost:8081/api/position/"+value+"/"+this.props.product.id)
        .then((response) => {
            if(response.data.length!=0)
            {this.setState({position: response.data});
           modified = false;
        }
        })
        .catch(this.setState({position: []}));
        if(modified==false){
            this.setState({position:[]});
        }
    }

    savePosition = () => {
        if(this.state.namePosition!=''){
            //this.setState({menu: 0});
            console.log("salvo");   
            //this.props.handler();
            this.props.confirm(this.state.namePosition, this.state.descriptionPosition);
            this.props.delete();
        }
    }
    //confermo il prodotto in una posizione già esistente
    saveWithExistingIdPosition = () => {
        var id = 0;
        /*if(this.state.idPosition!=0){
            id = this.state.idPosition;
        }else{
            id = this.props.product.positionList[0].id;
        }*/
        id = (this.state.idPosition!=0) ? this.state.idPosition : this.props.product.positionList[0].id;
        this.props.saver(id);
    }

    printRow = () =>{
        var positionElement;
        switch(this.state.menu){
            case 0://schermata iniziale con posizione suggerita
            var selectElement;
            var optionElement = [];
            var buttonSave;
            if(this.props.product.positionList.length != 0){
                this.props.product.positionList.map((pos) => {
                    optionElement.push(<option value={pos.id}>{pos.name}</option>)
                });
                selectElement = (<select onChange={(e) => this.setState({idPosition: e.target.value})}>{optionElement}</select>);
                buttonSave = (
                    <Button onClick={() => this.saveWithExistingIdPosition()}>Salva</Button>
                );
            }

            return  (
                <div className="row position">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        Posizione salvata:
                        {selectElement}
                        <Button onClick={() => this.modifyButton(1)}>Modifica</Button>
                    </div>
                    <span>{buttonSave}</span>
                </div>
            );
                break;
            case 1://ricerca della nuova posizione
            if(this.state.position.length!=0){
                positionElement = (
                    <div>
                        <span 
                            onClick={(e) => {e.currentTarget.className="buttonClicked";this.setState({selected:true})}}>
                            {this.state.position[0].name} {this.state.position[0].description}
                        </span>
                    </div>
                );
            }
            var save;
            if(this.state.selected){
                save = (
                    <Button onClick={() => this.props.saver(this.state.position[0].id)}>Salva</Button>
                );
            }
            var addNew;
            addNew = (<div>
                <Button onClick={() => this.modifyButton(0)}>Indietro</Button>
                <Button onClick={() => this.modifyButton(2)}>Aggiungi nuova</Button>
                <br></br>
            </div>);
        
            return(
            <div className="row position">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    Cerca posizione esistente: <input onChange={(e) => this.searchPosition(e.target.value)}type="text" />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    {positionElement}
                </div>
                    {addNew}
                    {save}
            </div>
            );
                break;
            case 2: // aggiunta di una nuova posizione
            return(
            <div className="row position">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                Nome posizione: <input onChange={(e) => this.setState({namePosition: e.target.value})}type="text" />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                Descrizione: <input onChange={(e) => this.setState({descriptionPosition: e.target.value})}type="text" />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <Button onClick={() => this.savePosition()}>Aggiungi posizione e salva ordine</Button>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                {positionElement}
            </div>
        </div>
            );
                break;
        }
       
    }

    modifyButton = (value) =>{
        this.setState({menu: value});
        console.log(this.state.menu);
        this.printRow();
    }
    
    render(){
        switch(this.props.type){
            case "product":
                var buttonOrder = (
                    <Button onClick={() => {
                        if(this.state.orderButton==false){
                            this.setState({orderButton: true}, () => { 
                                console.log("order true");
                                //this.props.addToCart(this.props.product.id, this.props.product.name, this.props.product.priceSell);
                            });
                        }else{
                            this.setState({orderButton: false}, () => { 
                                console.log("order false");
                                //this.props.addToCart(this.props.product.id, this.props.product.name, this.props.product.priceSell);
                            });
                        }
                    }}>
                        Ordina
                    </Button>
                );
                var buttonSell = (
                    <Button onClick={() => {
                        this.props.addToCart(this.props.product.id, this.props.product.name, this.props.product.priceSell);
                        this.props.handler();
                    }}>
                        Vendi
                    </Button>
                );
    
                var inputElements = [];
                if(this.state.orderButton){
                   inputElements.push(buttonOrder);
                }else if(this.state.sellButton){
                    inputElements.push(buttonSell);
                }else{
                    inputElements = [buttonOrder, buttonSell];
                }
                return (
                    <section>
                        <div className="overlay">
                            <div className="close" onClick={() => this.props.handler()}>X</div>
                            <div className="row title">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">{this.props.product.name} <span>Edit</span></div>
                            </div>
                            <div className="row description">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {this.props.product.description} (Edit)
                                </div>
                            </div>
                            <div className="row price">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">Prezzo? (Edit)</div>
                            </div>
                            <div className="row buttons">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {inputElements}
                                </div>
                            </div>
                        </div>
                    </section>
                    );
                    break;
            case "purchase":
                console.log(this.props);
                var arrElements = [];
                var positionElements = [];
                this.props.purchase.products.map((product) => {
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
                        <div className="overlay">
                            <div className="close" onClick={() => this.props.handler()}>X</div>
                            <div className="row title">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">prova <span>Edit</span></div>
                            </div>
                            <div className="row description">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {arrElements}
                                </div>
                            </div>
                            <div className="row price">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">Prezzo? (Edit)</div>
                            </div>
                            <div className="row buttons">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {inputElements}
                                </div>
                            </div>
                        </div>
                    </section>
                );
                    break;
            case "order":
                console.log("entro");
                var arrElements = [];
                var positionElement;
                if(this.props.product.position!=null || this.props.product.position!=""){
                    positionElement = this.printRow();
                }
                return (
                    <section>
                        <div className="overlay">
                            <div className="close" onClick={() => this.props.handler()}>X</div>
                            <div className="row title">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">Titolo prodotto</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {this.props.id} {this.props.product.name} {this.props.nameSupplier} {this.props.quantity} {this.props.total} {this.props.date}
                                </div>
                            </div>
                            <div className="row description">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    {this.props.description}
                                </div>
                            </div>
                            {positionElement}
                        </div>
                    </section>
                );
        }
       /* if(this.props.type == "product"){
            
            }else if(this.props.type == "purchase"){
                
            } else if(this.props.name=="order"){
                
            }*/
        }
    }
    
    