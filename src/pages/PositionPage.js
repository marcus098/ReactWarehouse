import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Position from "../components/Position";
import Overlay from "../components/Overlay";
import '../css/Position.scss';
import Loading from "../components/Loading";


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
      this.setState({positionList: []});
      axios.get("http://localhost:8081/api/positions", {
        headers:{
            userToken: localStorage.getItem("userToken"),
        }
    })
      .then((response) => {
          this.setState({
              positionList: response.data, 
              totalPages: Math.ceil(response.data.length/20),
              loading: false
          });
      })
      .catch(console.log("errore"));
    }
    addToPositionList = (position) => {
      this.setState({positionList: this.state.positionList.push(position)});
    }
    handler = (value) => {
      this.setState({
          currantPage: value
      });
  }

    render(){
      
      var arrElements = [];
        if(this.state.positionList.length != 0){
            for(var i = ((this.state.currantPage - 1) * 19); i < (this.state.currantPage * 19); i++){
                if(i<this.state.positionList.length){
                    arrElements.push(
                      <Position
                          new={false}
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
            
    if(this.state.loading==false){
        return (
            <section>
              <ul class="surveys grid" style={{display:"flex", flexWrap: "wrap", justifyContent: "center"}}>
              <Position
                        new={true}
                        newPosition={this.chargePositions}
                      />
                {arrElements}  
                <br></br>
                
              </ul> 
              <ul>

              <div className="row arrowPages text-center" style={{marginTop:"180px"}}>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                <ArrowPages elements={this.state.positionList.length} currentPage={this.state.currantPage} handler={this.handler}></ArrowPages>
                            </div>
                        </div>
                        </ul> 
            </section>
        );
    }else{
      return(<Loading></Loading>)
    }
    }
}
