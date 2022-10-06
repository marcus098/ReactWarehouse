import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Supplier from "../components/Supplier";
import { Button } from "react-bootstrap";

export default class SuppliersPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currantPage: 1,
            suppliers: [],
            totalPages: 1,
            loading:true,
            min:0,
            max:-1,
            textSearch: ''
        };
    }

    componentDidMount = () => {
        this.getAllSuppliers();
    }

    getAllSuppliers = () => {
        axios.get("http://localhost:8081/api/suppliers")
        .then((response) => {
            console.log(response);
            this.setState({
                suppliers: response.data
            });
            if(response.data.length!=0)
                this.setState({loading: false});
        })
        .catch(console.log("errore"));
    }
    
    render(){
        var elements = [];
        console.log(this.state.suppliers);
        for(var i = 0; i < this.state.suppliers.length; i++){
            elements.push(
                <Supplier
                    name={this.state.suppliers[i].name}
                    surname={this.state.suppliers[i].surname}
                    email={this.state.suppliers[i].email}
                    phone={this.state.suppliers[i].phone}
                    api={this.state.suppliers[i].api}
                    id = {this.state.suppliers[i].id}
                />
            );
        }

        return (
            <div className="row UserControl noPadding">
                <span><Link to="/addSupplier" className="element"><Button>Aggiungi fornitore</Button></Link></span>
                <form class="search-container" action="https://llamaswill.tumblr.com/search">
  <input id="search-box" type="text" class="search-box" name="q" onInput={(e) => this.searchProducts(e.target.value)} /><i class="bi bi-search iconSearch"></i>
  <label for="search-box"><span class="glyphicon glyphicon-search search-icon"></span></label>
  <input type="submit" id="search-submit" />
</form>
                <div class="user-grid">

                {elements}
                </div>
            </div>
        );
        }
    }