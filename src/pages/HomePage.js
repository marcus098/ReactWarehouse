import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css';
import BarChart from "../components/BarChart";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ButtonSave from "../components/Elements/ButtonSave";
import Loading from "../components/Loading";
import '../css/Layout.scss';
import CircleMenu from "../components/Elements/CircleMenu";
const baseURL = "http://localhost:8081/api"

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            generalMonthsArray: new Array("Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"),
            actualMonthsArray:new Array("", "", "", "", "", "", "", "", "", "", "", ""),
            orderQuantityArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            orderTotalArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            sellTotalArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
            sellQuantityArray: new Array(0,0,0,0,0,0,0,0,0,0,0,0),
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
            axios.get('http://localhost:8081/api/sells/Months'),
          ])
          .then(axios.spread((response1, response2) => {
            var arrTmp = [];
            var date = new Date(); 
            var start = date.getMonth()+1; 
            this.setState({charged: this.state.charged+1});
            console.log("Charged: " + this.state.charged);
            for(var i = 0; i < 12; i++){
                this.setState({
                    orderTotalArray: this.state.orderTotalArray.splice(i, 1, response1.data[i].total),
                    orderQuantityArray: this.state.orderQuantityArray.splice(i, 1, response1.data[i].quantity),
                    sellTotalArray: this.state.sellTotalArray.splice(i, 1, response2.data[i].total),
                    sellQuantityArray: this.state.sellQuantityArray.splice(i, 1, response2.data[i].quantity),
                });
            }
            
            for(var i = 0; i < 12; i++){
                if(start==12)
                    start = 0;
                arrTmp.push(this.state.generalMonthsArray[start]);
                this.setState({actualMonthsArray: this.state.actualMonthsArray.splice(i, 1, this.state.generalMonthsArray[start])});
                start++;
            }
            this.setState({charged:this.state.charged+1});
          }))
        .catch(this.setState({charged:this.state.charged + 1}) );
      
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
         axios.get("http://localhost:8081/api/orders", {
          headers:{
              userToken: localStorage.getItem("userToken"),
          }
      })
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

          var moreOrder = ( <div class="document">
          <div class="document__title">Prodotto piu' Ordinato</div>
          
          <div class="document__title"><b>{this.state.moreOrder}</b></div>
        </div>);
          var moreSell = ( <div class="document">
          <div class="document__title">Prodotto piu' Venduto</div>
          
          <div class="document__title"><b>{this.state.moreSell}</b></div>
        </div>);

            var ordersElement = [];
            for(var i = 0; i < this.state.orders.length; i++){
                ordersElement.push(
                  <div class="card__main">
                  <div class="card__row">
                    <div class="card__icon"><i class="bi bi-calendar"></i></div>
                    <div class="card__time">
                      <div>{this.state.orders[i].date}</div>
                    </div>
                    <div class="card__detail">
                      <div class="card__source text-bold">{this.state.orders[i].product.name}</div>
                      <div class="card__description">Quantita': {this.state.orders[i].quantity}<br></br>Costo Totale: {this.state.orders[i].total} </div>
                      <div class="card__note">{this.state.orders[i].supplier.name}</div>
                    </div>
                  </div>
                </div>
                );
            }
            var barChart1 = (<></>);
            var barChart2 = (<></>);
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
        barChart2 = (
            <BarChart 
                    months={this.state.actualMonthsArray}
                    firstName="Quantita'"
                    secondName="Totale" 
                    title="Vendite" 
                    firstValues={this.state.sellQuantityArray} 
                    secondValues={this.state.sellTotalArray}/>
            );
        var orderToArrive = (<></>);
        if(this.state.orders.length!=0){
            orderToArrive = (
              <div class="card">
                <div class="card__header">
                  <div class="card__header-title text-light">Ordini in arrivo (<a href="/orders">Vedi tutti</a>)
                  </div>
          
                </div>
               {ordersElement}
              </div>
            );
        }
        }

return(
  <main class="main">
    <div class="main-overview">
      <div class="overviewCard">
        <div class="overviewCard-icon overviewCard-icon">
          <CircleMenu
            add="/AddCategory"
            show="/products"
            delete="/products"
            modify="/products"
          />
        </div>
        <div class="overviewCard-description">
          <h3 class="overviewCard-title t">Gestione <strong>Categorie</strong></h3>
          <p class="overviewCard-subtitle">sottotitolo</p>
        </div>
      </div>
      <div class="overviewCard">
        <div class="overviewCard-icon overviewCard-icon">
        <CircleMenu
            add="/products"
            show="/orders"
            delete="/orders"
            modify="/orders"
          />
        </div>
        <div class="overviewCard-description">
          <h3 class="overviewCard-title ">Gestione <strong>Ordini</strong></h3>
          <p class="overviewCard-subtitle">sottotitolo</p>
        </div>
      </div>
      <div class="overviewCard">
        <div class="overviewCard-icon overviewCard-icon">
          <CircleMenu
            add="/AddProduct"
            show="/products"
            delete="/products"
            modify="/products"
          />
        </div>
        <div class="overviewCard-description">
          <h3 class="overviewCard-title ">Gestione <strong>Prodotti</strong></h3>
          <p class="overviewCard-subtitle">sottotitolo</p>
        </div>
      </div>
      <div class="overviewCard">
        <div class="overviewCard-icon overviewCard-icon">
        <CircleMenu
            add="/position"
            show="/position"
            delete="/position"
            modify="/position"
          />
        </div>
        <div class="overviewCard-description">
          <h3 class="overviewCard-title ">Gestione <strong>Posizioni</strong></h3>
          <p class="overviewCard-subtitle">sottotitolo</p>
        </div>
      </div>
      <div class="overviewCard">
        <div class="overviewCard-icon overviewCard-icon">
        <CircleMenu
            add="/addSupplier"
            show="/suppliers"
            delete="/suppliers"
            modify="/suppliers"
          />
        </div>
        <div class="overviewCard-description">
          <h3 class="overviewCard-title ">Gestione <strong>Fornitori</strong></h3>
          <p class="overviewCard-subtitle">sottotitolo</p>
        </div>
      </div>
      <div class="overviewCard">
        <div class="overviewCard-icon overviewCard-icon">
        <CircleMenu
            add="/AddAccount"
            show="/userControl"
            delete="/userControl"
            modify="/userControl"
          />
        </div>
        <div class="overviewCard-description">
          <h3 class="overviewCard-title ">Gestione <strong>Utenti</strong></h3>
          <p class="overviewCard-subtitle">sottotitolo</p>
        </div>
      </div>
    </div> 
    
    <div class="main__cards">
      {orderToArrive}

    
      <div class="card card--finance">
        <div class="card__header">
          <div class="card__header-title "><strong>Ordini</strong> Mensili
          </div>
          
        </div>
        <div id="chartdiv">
         {barChart1}
        </div>
      </div>

      <div class="card">
        <div class="card__header">
          <div class="card__header-title ">Statistiche
          </div>
          
        </div>
        <div class="card">
          <div class="documents">
            {moreSell}
           {moreOrder}
            
          </div>
        </div>
      </div>


      <div class="card card--finance">
        <div class="card__header">
          <div class="card__header-title "><strong>Vendite</strong> Mensili
          </div>
         
        </div>
        <div id="chartdiv">
          {barChart2}
        </div>
      </div>
    </div> 
  </main>

);

        }else{
            return(<Loading></Loading>)
        }
    }
    }
    