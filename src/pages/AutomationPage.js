import React from "react";
import { Link } from "react-router-dom";
import '../css/Pages.css';
import '../css/Layout.scss';
import Loading from "../components/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Message from "../components/Message";
import { Button } from "react-bootstrap";
import ButtonSave from "../components/Elements/ButtonSave";

export default class AutomationPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            permission: true,
            isLoading: true,
            automations: [],
            messageBox: null,
            min:false,
            max:false
        };
    }
    
    emptyMessageBox = () => {
        this.setState({messageBox: null});
    }
    
    check = (event) => {
        this.setState({isLoading: true});
        var str = "";
        str = (event.target.checked) ? "active" : "disable";
        axios.post('http://localhost:8081/api/automation/'+str, {
            userToken: localStorage.getItem("userToken"),
            id: event.target.value
        })
        .then((response) => {
            if(response.data.bool){
                var arr = this.state.automations;
                arr[event.target.value-1].active = event.target.checked;
                this.setState({automations: arr, messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
            }
            this.setState({isLoading: false});
        })
        .catch(function (error) {
            this.setState({isLoading: false});
        });
    }

    componentDidMount = () => {
        this.setState({isLoading:true, automations:[]});
        axios.post('http://localhost:8081/api/auto', {
            userToken: localStorage.getItem("userToken")
        })
        .then((response) => {
            console.log(response.data);
           this.setState({isLoading: false, automations: response.data});
        })
        .catch(function (error) {
            this.setState({isLoading: false});
        });
    }

    saveDiscount = () => {
        if(this.refs.period.value!="" && this.refs.percentage.value!="" && this.refs.typePeriod != ""){
            this.setState({isLoading: true});
            axios.post('http://localhost:8081/api/discountRule/add', {
            userToken: localStorage.getItem("userToken"),
            percentage: this.refs.percentage.value,
            period: this.refs.period.value,
            typePeriod: this.refs.typePeriod.value
        })
        .then((response) => {
            console.log(response);
        
        if(response.data.bool){
            this.componentDidMount();
            this.setState({isLoading: false, messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
        }else{
            this.setState({isLoading: false, messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
        }
    })
    .catch((error) => {
        this.setState({isLoading: false/*,  messageBox: (<Message message='Errore' error={true} handler={this.emptyMessageBox}></Message>)*/});
    });   
  }
}

removeDiscountRule = (event) => {
   console.log(event.target.value);
   if(event.target.value != 0 && event.target.value != ""){
    this.setState({isLoading: true});
    axios.post('http://localhost:8081/api/discountRule/delete', {
        userToken: localStorage.getItem("userToken"),
        id: event.target.value
    })
    .then((response) => {
        this.setState({isLoading: false, automations: response.data});
        var arr = [];
        for(var i = 0; i < this.state.automations[0].discountRulesList.length; i++){
            if(this.state.automations[0].discountRulesList[i].id != event.target.value)
                arr.push(this.state.automations[0].discountRulesList[i]);
        }
        var newAuto = this.state.automations;
        newAuto[0].discountRulesList = arr;
        this.setState({automations: newAuto, messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
        })
    .catch((error) => {
        this.setState({isLoading: false,  messageBox: (<Message message='Errore' error={true} handler={this.emptyMessageBox}></Message>)});
    });   
  }
}

save = (event) => {
    this.setState({isLoading: true});
    var num;
    if(event.target.dataset.id == "1"){// imposto il minimo
        num = this.refs.minNumber.value;
    }else{//imposto il massimo
        num = this.refs.maxNumber.value;
    }
    
    axios.post('http://localhost:8081/api/stockRule/modify', {
        userToken: localStorage.getItem("userToken"),
        id: event.target.dataset.id,
        number: num
    })
    .then((response) => {
        if(response.data.bool){
            var arr = this.state.automations;
            arr[1].stocksRulesList[event.target.dataset.id-1].number = num;
            this.setState({isLoading: false, automations: arr, messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
        }else{
            this.setState({isLoading: false, messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)});
        }
    })
    .catch(function (error) {
        this.setState({isLoading: false,  messageBox: (<Message message='Errore' error={true} handler={this.emptyMessageBox}></Message>)});
    });
}

render(){
    var automationElements = [];
    var fieldSetDiscount;
    var fieldSetStock;
    for(var i = 0; i < this.state.automations.length; i++){
        automationElements.push(
            <div>
                <span>{this.state.automations[i].name} </span>
                <label className="switch">
                    <input ref={"check"+i} onChange={this.check} value={i+1} type="checkbox" checked={this.state.automations[i].active}/>
                    <span className="slider round"></span>
                </label>
            </div>
            );
        if(i == 0 && this.state.automations[i].active){
            var discounts = [];
            for(var j = 0; j < this.state.automations[i].discountRulesList.length; j++){
                var typePeriod = this.state.automations[i].discountRulesList[j].typePeriod;
                var str = "";
                if(typePeriod == 0)
                    str = "Giorni";
                else if(typePeriod == 1)
                    str = "Mesi";
                else 
                    str = "Anni";
                discounts.push(
                  <section>
                    <span>{this.state.automations[i].discountRulesList[j].percentage+"%"} se non ci sono acquisti per {this.state.automations[i].discountRulesList[j].period + " " + str}</span>
                    
                    <Button className="fa fa-trash-o buttonAutomation" value={this.state.automations[i].discountRulesList[j].id} onClick={this.removeDiscountRule}></Button>
                  </section>
                );
            }
            fieldSetDiscount=(
                <fieldset>
                    <legend>Gestione Sconti</legend>
                    {discounts}
                    <br></br>
                    <input type="number" placeholder="%" ref="percentage"></input> se non ci sono acquisti per <input min="1" ref="period" type="number" placeholder="periodo"></input>
                    <select ref="typePeriod">
                        <option value="0">Giorni</option>
                        <option value="1">Mesi</option>
                        <option value="2">Anni</option>
                    </select>
                    <Button className="fa fa-plus-circle buttonAutomation" onClick={this.saveDiscount}></Button>
                </fieldset>
            );
        }
        var stocks = [];
        if(i == 1 && this.state.automations[i].active){
            for(var j = 0; j < this.state.automations[i].stocksRulesList.length; j++){
                var element = this.state.automations[i].stocksRulesList[j];
                var number = "Default";
                var str = "Scorte minime per ordinare: ";
                var placeholder = "Min";
                var refObject = "minNumber"
                if(element.id == 2){
                    str = "Quantita' massima ordinabile: ";
                    placeholder = "Max";
                    refObject = "maxNumber";
                }
                if(element.number != -1){
                    number = element.number + "";
                }
                
                stocks.push(
                    <section className="stocks">
                        <span>{str}</span>
                        <input type="number" ref={refObject} min="0" defaultValue={number} />
                        <span className="save"><ButtonSave name="Salva" value={element.id} handler={this.save}></ButtonSave></span>
                    </section>
                );
            }
            fieldSetStock=(
                <fieldset>
                    <legend>Gestione Ordini</legend>
                    {stocks}
                </fieldset>
            );
        }
    }
    if(this.state.isLoading)
        return(<Loading></Loading>);
    else{
        if(this.state.automations.length<3){
            return(<div>Errore caricamento</div>);
        }else{
            return(   
                <div className="AutomationPage">
                    {this.state.messageBox}
                    <div className="divAutomationElements">
                        {automationElements}
                    </div>
                    <div className="divFieldsets">
                        <div className="divFieldsetDiscount">
                            {fieldSetDiscount}
                        </div>
                        <div className="divFieldsetStock">
                            {fieldSetStock}
                        </div>
                    </div>
                </div>
                );
            }
        }
    }
}