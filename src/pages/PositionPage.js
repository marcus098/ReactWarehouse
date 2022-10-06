import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Position from "../components/Position";
import Overlay from "../components/Overlay";
import '../css/Position.scss';


export default class PositionPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          positionList: [],
          totalPages: 1,
          currantPage: 1,
          loading: true,
          
        }
    }

    componentDidMount = () => {
      if(this.state.positionList.length == 0){
        this.chargePositions();
      }
    }

    chargePositions = () => {
      axios.get("http://localhost:8081/api/positions")
      .then((response) => {
       
          this.setState({
              positionList: response.data, 
              totalPages: Math.ceil(response.data.length/20),
              loading: false
          });
      })
      .catch(console.log("errore"));
    }

    render(){
      console.log(this.state.positionList);
      var arrElements = [];
        if(this.state.positionList.length!=0){
            for(var i = ((this.state.currantPage-1)*20); i < (this.state.currantPage*20); i++){
                if(i<this.state.positionList.length){
                    arrElements.push(
                      <Position
                      id={this.state.positionList[i].id}
                      name={this.state.positionList[i].name}
                      description={this.state.positionList[i].description}
                      productId={(this.state.positionList[i].product) ? this.state.positionList[i].product.id : ""}
                      productName={(this.state.positionList[i].product) ? this.state.positionList[i].product.name : ""}
                      />
                        );
                    }
                }
            }
        return (
            <section>
              <ul class="surveys grid">
                {arrElements}  
              </ul>  
            </section>
        );
    }
}
