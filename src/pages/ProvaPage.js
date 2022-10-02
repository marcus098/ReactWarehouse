import React from "react";
import { Button } from "react-bootstrap";
import Categoria from "../components/Categoria";
import axios from "axios";
import Overlay from "../components/Overlay";

export default class ProvaPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            increment: 0,
            categorie: []
        };
    }
    
    /*componentDidMount(){
        this.doFetch();
    }*/

    doFetch = () =>{
        axios.get("http://localhost:8081/api/categories")
            .then((response) => {
                if(response.data.length != 0){
                    this.setState({categorie: response.data});
                }
            })
            .catch(  
            );
    }
    //render
    render(){
        var arrElements = [];
        /*this.state.categorie.map((riga) => {
            arrElements.push(
               <Categoria 
                    id={riga.id}
                    name={riga.name}
                    description={riga.description}
                    />
                );
        });*/
        return(
            <section>
                <Button id="but" onClick={() => this.doFetch()} value={this.state.increment}>mostra</Button>
                <div>
                    {arrElements}
                    zz
                </div>
                <Overlay></Overlay>
            </section>
        );
    }
}
