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
import Category from "../components/Category";
import Message from "../components/Message";

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
            idSupplier:this.checkSupplier(),
            messageBox : (<></>)
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
        await axios.get("http://localhost:8081/api/categories/"+this.state.idSupplier, {
            headers:{
                userToken: localStorage.getItem("userToken"),
            }
        })
        .then((response) => {
            this.setState({categories: response.data});
            this.setState({totalPages: Math.ceil(response.data.length/20)});
            if(response.data.length!=0)
            this.setState({loading: false});
        })
        .catch(console.log("errore"));
    }
    
    deleteCategory = (id) =>{
        axios.get("http://localhost:8081/api/categories/delete/"+id, {
            headers:{
                userToken: localStorage.getItem("userToken"),
            }
        })
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
        console.log(this.props);
        this.props.showRowContent();
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
    
    addProductByCategory = (id) => {
        this.setState({addProduct:true, c: id})
    }

    emptyMessageBox = () => {
        this.setState({messageBox: null});
    }

    delete = (idProduct) => {
        var url = "http://localhost:8081/api/product/delete/" + idProduct;
        axios.post(url, {
            userToken: localStorage.getItem("userToken")
        })
        .then((response) => {
            if(response.data.isBool){
                this.closeOverlay();
                this.setState({
                    overlay: false,
                    product: []
                });
            }
            this.setState({messageBox: (<Message message={response.data.message} error={!response.data.bool} handler={this.emptyMessageBox}></Message>)})
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
            this.props.hideRowContent();
            overlayElements = ( 
                <Overlay
                    delete={this.delete}
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
                <div className="row filter" style={{display:"flex", padding:"20px"}}>
                    <div style={{width:"100px"}}>
                    Min. <input type="number" min="0" style={{width:"60px", border:"0px", borderBottom:"1px solid silver"}} onInput={(e) => {
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
                <div style={{width:"100px"}}>
                Max. <input type="number" style={{width:"60px", border:"0px", borderBottom:"1px solid silver"}} onChange={(e) => {
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
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">{/*addProductButton*/}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 searchText" style={{display:"flex", paddingLeft:"30px", paddingBottom:"20px"}}>
                    
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
                                }}}>Filtra
                                </span>
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
                                    <Category
                                        id={cat.id}
                                        name={cat.name}
                                        description={cat.description}
                                        number={cat.numberProducts}
                                        addProduct={this.addProductByCategory}
                                        delete={this.deleteCategory}
                                        charge={this.loadProductsCategory}
                                    ></Category>
                                    );
                                });
                                if(this.state.addProduct){
                                    return(<AddProduct idCategory={this.state.c}></AddProduct>);
                                }

                                return(   
                                    
                                    <section style={{padding: "20px"}}>
                                        <div className="row">
                                            {header}
                                            {arrElements}
                                        </div>
                                    </section>
                                    );
                                } else {
                                    arrowElement = (
                                        <i class="bi bi-arrow-left-circle icon clickable" style={{position:"absolute", left:"65px", top:"65px"}} onClick={() => {this.setState({showCategories: true, currantPage: 1}); this.componentDidMount()}}></i>
                                        /*<Button >Indietro</Button>*/
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
                                                        discount = {this.state.data[i].discount}
                                                        handler={this.infoProduct}
                                                    >
                                                    </Product>
                                                );
                                            }
                                        }
                                    }
                                    if(this.state.loading == false){
                                        return(
                                            <div className="productsPage">
                                                {arrowElement}
                                                {header}
                                                <div className="row headerProductsPage">
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