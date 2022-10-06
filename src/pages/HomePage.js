import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';
import BarChart from "../components/BarChart";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "../components/Loading";

const baseURL = "http://localhost:8081/api"

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            generalMonthsArray: new Array("Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"),
            actualMonthsArray:new Array("", "", "", "", "", "", "", "", "", "", "", ""),
            //orderQuantityArray: new Array(700,433,30,244,400,300,400,900,100,234,233,456),
           /* orderTotalArray: new Array(700,433,30,244,400,300,400,900,100,234,233,456),
            sellTotalArray: new Array(700,433,30,244,400,300,400,900,100,23,233,456),
            sellQuantityArray: new Array(100,200,300,150,180,300,400,900,100,234,233,456),*/
            orderQuantityArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            orderTotalArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            sellTotalArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            sellQuantityArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),

            finalOrderQuantityArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            finalOrderTotalArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            finalSellTotalArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            finalSellQuantityArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            orders: [],
            moreSell: '',
            moreOrder: '',
            charged: 0,
        };
    }
    componentDidMount() {
        this.setState({charged: this.state.charged+1}, () => { 
            this.calculateData();
            this.doFetch();
            this.moreSellOrder();
        });
    }

    calculateData(){
        axios.all([
            axios.get('http://localhost:8081/api/orders/Months'), 
            axios.get('http://localhost:8081/api/orders/Months'),
          ])
          .then(axios.spread((response1, response2) => {
            var arrTmp = [];
            var date = new Date(); 
            var start = date.getMonth()+1; 
            console.log(response1.data);
            for(var i = 0; i < 12; i++){
                this.setState({
                    orderTotalArray: this.state.orderTotalArray.splice(i,1,response1.data[i].total),
                    orderQuantityArray: this.state.orderQuantityArray.splice(i,1,response2.data[i].quantity),
                });
            }
            
            for(var i = 0; i < 12; i++){
                if(start==12)
                    start = 0;
                arrTmp.push(this.state.generalMonthsArray[start]);
                this.setState({actualMonthsArray: this.state.actualMonthsArray.splice(i,1,this.state.generalMonthsArray[start])});
                start++;
            }
            console.log(this.state.orderQuantityArray);
            console.log(this.state.orderTotalArray);
            console.log(this.state.actualMonthsArray);
            this.setState({charged:this.state.charged+1});
          }))
        .catch(this.setState({charged:this.state.charged+1}) );
      
    }


    moreSellOrder = () => {
        axios.get("http://localhost:8081/api/products/moreSell")
        .then((response) => {
            this.setState({
                moreSell: response.data.name
            });
        })
        .catch(console.log("Errore"));

        axios.get("http://localhost:8081/api/products/moreOrder")
        .then((response) => {
            this.setState({
                moreOrder: response.data.name
            });
        })
        .catch(console.log("Errore"));
    }
   
    doFetch = () => {
         axios.get("http://localhost:8081/api/orders")
        .then((response) => {
            this.setState({
                orders: response.data.slice(0,3),
                totalPages: Math.ceil(response.data.length/20),
            });
            if(response.data.length!=0)
                this.setState({loading: false});
        })
        .catch(console.log("errore"));
    }

    render(){
        if(this.state.charged>2){
        console.log(this.state.orderQuantityArray);
            console.log(this.state.orderTotalArray);
            console.log(this.state.actualMonthsArray);
        var ordersElement = [];
        for(var i = 0; i < this.state.orders.length; i++){
            ordersElement.push(
                <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                    {"#"+this.state.orders[i].id + " " + this.state.orders[i].date + " €" + this.state.orders[i].total}
                </div>
            );
        }
        var barChart1 = (<></>);
        if(this.state.charged >2){
        barChart1 = (
            <BarChart 
                    months={this.state.actualMonthsArray}
                    firstName="Quantita'"
                    secondName="Totale" 
                    title="Ordini" 
                    firstValues={this.state.orderQuantityArray} 
                    secondValues={this.state.orderTotalArray}/>
        );
        }
        return(
          <div className="Home">
            
            <div>Benvenuto nella Home!</div>
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12 col-12">
                {barChart1}
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12 col-12">
                    <BarChart 
                        months={this.state.actualMonthsArray}
                        firstName="Quantita'"
                        secondName="Totale"
                        title="Vendite" 
                        firstValues={this.state.sellQuantityArray} 
                        secondValues={this.state.sellTotalArray}></BarChart>
                </div>
            </div>
            <div className="row list">
                <div className="col-md-6 col-lg-6 col-sm-12 col-12">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                        Prodotto piu' ordinato l'ultimo mese: {this.state.moreOrder};
                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                        Prodotto piu' venduto l'ultimo mese: {this.state.moreSell};
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12 col-12">
                <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                        Ordini in arrivo
                    </div>
                    {ordersElement}
                    <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                    <div><Link to="/orders">Vedi tutti</Link></div>
                    </div>
                </div>
            </div>
          </div>
            );
        }else{
            return(<Loading></Loading>)
        }
    }
    }
    