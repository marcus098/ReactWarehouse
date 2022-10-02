import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import User from "../components/User";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    
    render(){var elements = [];
        for(var i = 0; i < 10; i++){
            elements.push(
                <User
                name={"name"+i}
                surname={"surname"+i}
                email={"email"+i}
                phone={"phone"+i}
                role={"phone"+i}
                />
            );
        }

        return (
            <div className="row UserControl noPadding">
                {elements}
            </div>
        );
        }
    }
    export default Home;