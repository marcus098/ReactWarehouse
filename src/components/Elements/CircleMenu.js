import React from "react";

export default class CircleMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
    <div id="yuvarlak">
        <span class="carpi"></span>
        <div id="icerik">

            <a href={this.props.modify}><span className="bi bi-pencil a" style={{fontSize: "25px", width:"30px", height:"30px"}}></span></a>
              <a href={this.props.add}><span className="bi bi-plus b" style={{fontSize: "25px", width:"30px", height:"30px"}}></span></a>
              <a href={this.props.show}><span className="fa fa-eye c" style={{fontSize: "25px", width:"30px", height:"30px"}}></span></a>
              <a href={this.props.delete}><span className="bi bi-trash d" style={{fontSize: "25px", width:"30px", height:"30px"}}></span></a>
        </div>
    </div>
        );
    }
}