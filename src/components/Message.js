import React from "react";
import '../css/Message.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          notRender: false,
        }
    }

    componentDidMount = () => {
      var interval = setInterval(() => {this.setState({notRender:true}); clearInterval(interval); this.props.handler(); this.clear()}, 3000);      
    }

    clear = () => {
      for(var i = 0; i < 20; i++){
        clearInterval(i);
      }
    }

    render(){
      if(this.state.notRender==false){
        var redMessage = (
          <div class="Message Message--red">
            <div class="Message-icon">
              <i class="fa fa-times"></i>
            </div>
            <div class="Message-body">
              <p>{this.props.message}</p>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
          </div>
        );
        var greenMessage = (
          <div class="Message Message--green">
            <div class="Message-icon">
              <i class="fa fa-check"></i>
            </div>
            <div class="Message-body">
              <p>{this.props.message}</p>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
          </div>
        );
        return(
          <section className="sectionMessage" ref="message">
            {(this.props.error) ? redMessage : greenMessage}
          </section>
        );
      }
    }
}