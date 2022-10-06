import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ArrowPages from "../components/ArrowPages";
import { Button } from "react-bootstrap";
import Product from "../components/Product";
import Overlay from "../components/Overlay";
import AddProduct from "./AddProduct";
import '../css/SearchBar.scss';
import Loading from "../components/Loading";

export default class ProductsPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currantPage: 1,
            data: [],
            totalPages: 1,
            loading:true,
            categories: [],
            showCategories: true,
            overlay:false,
            product: [],
            category: '',
            min:0,
            max:-1,
            filter: false,
            textSearch: '',
            arrow:false,
            addProduct:false,
            idSupplier:this.checkSupplier()
        };
        this.handler = this.handler.bind(this);
    }

    checkSupplier = () => {
        var urlParams = window.location.search;
        var arr = urlParams.split("=");
        var val = 0;
        if(arr[1]!=null){
            this.setState({idSupplier:arr[1]});
            val = arr[1];
        }
        return val;
    }
    
    componentDidMount() {
        this.checkSupplier();
        this.searchCategories();
    }
    
    searchCategories = async () => {
       /* var str = "";
        if(idSupplier == 0){
            str = "http://localhost:8081/api/categories";
        }else{
            str = "http://localhost:8081/api/categoriesSupplier/"+idSupplier;
        }*/
        await axios.get("http://localhost:8081/api/categories/"+this.state.idSupplier)
        .then((response) => {
            this.setState({categories: response.data});
            this.setState({totalPages: Math.ceil(response.data.length/20)});
            if(response.data.length!=0)
                this.setState({loading: false});
        })
        .catch(console.log("errore"));
    }

    deleteCategory = (id) =>{
        axios.get("http://localhost:8081/api/categories/delete/"+id)
        .then((response) => {
            if(response.data)
                window.location.replace(`http://localhost:3000/products`);
        })
        .catch(console.log("errore"));
    }
    
    searchProducts = (nameSearch) => {
        this.setState({textSearch: nameSearch});
        if(nameSearch != ''){
            var url = "http://localhost:8081/api/products/"+nameSearch+"/"+this.state.idSupplier;
            if(this.state.filter == true){
                url += "/"+this.state.min;
                if(this.state.max != -1){
                    url += "/"+this.state.max;
                }
            }
            axios.get(url)
            .then((response) => {
                if(response.data.length!=0){
                    this.loadProducts(response.data);
                }else{
                    this.setState({data: []});
                }
            })
            .catch(console.log("errore"));
        }else{
            this.setState({data: []});
        }
    }
    
    infoProduct = (data) => {
        this.setState({
            overlay: true,
            product: data
            });
    }
    
    closeOverlay = () =>{
        this.setState({
            overlay: false,
            product: []
        });
    }
    
    handler(value) {
        this.setState({
            currantPage: value
        });
    }
    loadProducts = (data) => { 
        this.setState({
            showCategories: false,
            data: data,
            categories: [],
            totalPages: Math.ceil(data.length/20)
        });
    }
    
    loadProductsCategory = (idCategory) => {
        var url = "http://localhost:8081/api/productscat/" + idCategory+"/"+this.state.idSupplier;
        axios.get(url)
        .then((response) => {
            if(response.data.length != 0){
                this.loadProducts(response.data);
            }
        })
        .catch(console.log("errore"));
    }
    
    render(){
        //dichiaro gli elementi da visualizzare
        var arrElements = [];
        var arrowElement;
        var addProductButton;
        var overlayElements = (<></>);
        if(this.state.overlay && this.state.product.length!=0){
            overlayElements = (
                <Overlay
                    type="product"
                    handler={this.closeOverlay}
                    product={this.state.product}
                    sell={this.props.sell}
                    emptyCart={this.props.emptyCart}
                    modifyQuantity={this.props.modifyQuantity}
                    addToCart={this.props.addToCart}
                />
            );
        }
            
        var filterElemts = (
            <div className="row filter">
                <div>
                    Min. <input type="number" min="0" onInput={(e) => {
                       if(e.target.value==""){
                            this.setState({min: 0}, () => { 
                            this.searchProducts(this.state.textSearch);
                            });
                        }else{
                            this.setState({min: e.target.value}, () => { 
                            this.searchProducts(this.state.textSearch);
                            });
                        }
                        }} value={this.state.min}></input>
                </div>
                <div>
                    Max. <input type="number" onChange={(e) => {
                        (e.target.value=="") ? this.setState({max: -1}) : this.setState({max: e.target.value});
                        if(e.target.value==""){
                            this.setState({max: -1}, () => { 
                                this.searchProducts(this.state.textSearch);
                            });
                        }else{
                        this.setState({max: e.target.value}, () => { 
                            this.searchProducts(this.state.textSearch);
                        });
                    }
                        }}></input>
                </div>
            </div>
        );
        var header = []
        header.push(
            <section>
<form class="search-container" action="https://llamaswill.tumblr.com/search">
  <input id="search-box" type="text" class="search-box" name="q" onInput={(e) => this.searchProducts(e.target.value)} /><i class="bi bi-search iconSearch"></i>
  <label for="search-box"><span class="glyphicon glyphicon-search search-icon"></span></label>
  <input type="submit" id="search-submit" />
</form>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 col-6">{addProductButton}</div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 searchText">
                        {//<input type="text" onInput={(e) => this.searchProducts(e.target.value)} value={this.state.textSearch} autoFocus></input>
    }
                        <span onClick={(e) => {
                            e.preventDefault(); 
                            if(this.state.filter){
                                this.setState({filter: false}, () => { 
                                    this.searchProducts(this.state.textSearch);
                                });
                            }else{
                                this.setState({filter: true}, () => { 
                                this.searchProducts(this.state.textSearch);
                                });
                            }}}>Filtra</span>
                    </div>
                </div>
            </section>
            );
            if(this.state.filter)
                header.push(filterElemts);
            //mostro solo le categorie
            if(this.state.showCategories){
                this.state.categories.map((cat) => {
                    arrElements.push(
                        <div key={"category"+cat.id} className="col-lg-3 col-md-3 col-sm-4 col-4 clickable">
                            
                            <div class="card bg-light mb-3">
  
  <div class="card-body">
    <h5 class="card-title" onClick={() => this.loadProductsCategory(cat.id)}>{cat.name}</h5>
    <p class="card-text">{cat.description}</p>
  </div>
  <div class="card-header">
    <Button onClick={(e) => {/*window.location.replace(`http://localhost:3000/AddProduct/`+cat.id)*/this.setState({addProduct:true, c: cat.id})}}>Aggiungi Prodotto</Button>
    <Button onClick={() => {this.deleteCategory(cat.id)}}>Elimina</Button></div>
</div>
                        </div>
                        );
                    });
                    if(this.state.addProduct){
                        return(<AddProduct idCategory={this.state.c}></AddProduct>);
                    }
                    return(
                        
                        <section>
                            
                            <div className="row">
                                {header}
                                {arrElements}
                                {this.state.categories.map((cat) => {
                    
                        <div key={"category"+cat.id} className="col-lg-4 col-md-4 col-sm-4 col-4 clickable" onClick={() => this.loadProductsCategory(cat.id)}>
                            {cat.name}
                        </div>
                                
                    })}
                            </div>
                        </section>
                        );
                    } else {
                        arrowElement = (
                            <Button onClick={() => {this.setState({showCategories: true}); this.componentDidMount()}}>Indietro</Button>
                        );
                        addProductButton = (
                            <Button onClick={() => window.location.replace(`http://localhost:3000/AddProduct`)}>Aggiungi Prodotto</Button>
                        );
                        
                        //mostro i prodotti che sono presenti in data[]
                        if(this.state.data.length != 0){
                            for(var i = ((this.state.currantPage - 1) * 20); i < (this.state.currantPage * 20); i++){
                                if(i < this.state.data.length){
                                    arrElements.push(
                                        <Product
                                            key={"product"+this.state.data[i].id}
                                            id={this.state.data[i].id}
                                            name={this.state.data[i].name}
                                            quantity = {this.state.data[i].quantity}
                                            position = {this.state.data[i].positionList}
                                            priceSell = {this.state.data[i].priceSell}
                                            category = {this.state.data[i].category.name}
                                            description={this.state.data[i].description}
                                            handler={this.infoProduct}
                                        >
                                        </Product>
                                        );
                                    }
                                }
                            }
                            if(this.state.loading==false){
                                return(
                                    <div className="OrdersPage">
                                    {arrowElement}
                                    {/*addProductButton*/}
                                    {header}
                                    <div className="row">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">ID</div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3">Nome</div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">Quantita'</div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3">Prezzo vendita</div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">Posizione</div>
                                    </div>
                                    {arrElements}
                                    <div className="row arrowPages text-center">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                    <ArrowPages elements={this.state.data.length} currentPage={this.state.currantPage} handler={this.handler}></ArrowPages>
                                    </div>
                                    </div>
                                    {overlayElements}
                                    </div>

                                    );
                                }else {
                                    return (<Loading></Loading>)
                                }
                            } 
                        }
                    }