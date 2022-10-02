import React from "react";
import '../css/Layout.css';
import { Button } from "react-bootstrap";

export default class arrowPages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: parseInt(this.props.currentPage),
            pages: Math.ceil(this.props.elements / 20),
        };
    }
    createButton = (i) => {
        if(i == this.state.currentPage)
           return(<Button onClick={(e) => { this.props.handler(parseInt(e.target.value))}} value={i} className="currentBoxPage">{i}</Button>);
        else
            return(<Button onClick={(e) => { this.setState({currentPage: parseInt(e.target.value)});this.props.handler(parseInt(e.target.value))}} value={i} className="boxPage">{i}</Button>);
    }
    render(){
        var element = [];
        element.push(<Button onClick={(e) => { 
            if(this.state.currentPage != 1){
                this.setState({currentPage: parseInt(e.target.value)});
                this.props.handler(parseInt(e.target.value))
            }
        }} value={this.state.currentPage - 1} className="boxPage">&#60;</Button>);
        
        if(this.state.pages == 0){
            element.push(<Button onClick={(e) => { this.props.handler(parseInt(e.target.value))}} value="1" className="currentBoxPage">1</Button>);
        } else if(this.state.pages <= 10){
            for(var i = 1; i <= this.state.pages; i++)
                element.push(this.createButton(i));

        }else{
            if(this.state.currentPage + 10 <= this.state.pages){
                for(var i = this.state.currentPage; i < this.state.currentPage+10; i++)
                    element.push(this.createButton(i));
            }else{
                for(var i = this.state.pages - 9; i <= this.state.pages; i++)
                    element.push(this.createButton(i));
            }
        }
            
        element.push(<Button onClick={(e) => { 
            
            if((this.state.currentPage!=this.state.pages || this.state.pages != 0) && this.state.currentPage<this.state.pages){
                this.setState({currentPage: parseInt(e.target.value)});
                this.props.handler(parseInt(e.target.value))
            }
        }} value={this.state.currentPage+1} className="boxPage">&#62;</Button>);
        return (
            <div className="ArrowPages">
            {element}
            </div>
            );
            
        }
    }