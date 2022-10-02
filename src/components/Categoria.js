import React from "react";

export default class Categoria extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }

    }

        render(){
            return(
            <section key={"categoria"+this.props.id}>
                <div>{this.props.id}</div>
                <div>{this.props.name}</div>
                <div>{this.props.description}</div>
                <div>--------------</div>
            </section>
            );
        }
    }
