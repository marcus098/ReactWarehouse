import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Pages.css';
import '../css/UserCards.scss';

export default class Supplier extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            modify:false,
            notRender:false
        }
    }

    showIcon = () => {
        this.refs.iconRef.style.display="";
    }
    
    hideIcon = () => {
        this.refs.iconRef.style.display="none";
    }
    
    save = () => {
        axios.post('http://localhost:8081/api/supplier/modify/'+this.props.id, {
            userToken: localStorage.getItem("userToken"),
            name: this.refs.name.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            api: this.refs.api.value
          })
          .then((response) => {        
            if(response.data.bool){
              this.setState({modify: false});
              window.location.replace(`http://localhost:3000/suppliers`);
              //message success
            }else{
              //show error message
              
            }
        })
        .catch((error) => {
            console.log(error);
            //show error message
        });
    }

    delete = () => {
        axios.get('http://localhost:8081/api/supplier/delete/'+this.props.id, {
            headers:{
                userToken: localStorage.getItem("userToken"),
            }
          })
          .then((response) => {        
            if(response.data.bool){
              this.setState({notRender: true});
            }else{
              //show error message
              
            }
        })
        .catch((error) => {
            console.log(error);
            //show error message
        });
    }

    modify = () => {
        this.setState({modify: true});
    }

    render(){
        if(this.state.notRender)
            return(<></>);
        var icons = (<></>);
        var name = (<></>);
        var phone = (<></>);
        var email = (<></>);
        var api = (<></>);
        if(this.state.modify){
            icons = (
            <section>
                <div style={{position:"absolute", top:"5px", left:"-12px", fontSize:"24px"}}><i class="fa fa-check iconUser" aria-hidden="true" onClick={this.save}></i></div>
                <div style={{position:"absolute", top:"5px", right:"0px", fontSize:"24px", color:"red"}}><i class="bi bi-trash iconUser" style={{color:"red"}} onClick={this.delete}></i></div>
            </section>
            );
            name = (<input type="text" ref="name" style={{width:"90%", marginLeft:"3%", textAlign:"center", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center"}} required defaultValue={this.props.name}></input>);
            phone = (<input type="text" ref="phone" style={{width:"80%", marginLeft:"3%", textAlign:"center", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center", margin:"10px"}} required defaultValue={this.props.phone}></input>);
            email = (<input type="text" ref="email" style={{width:"80%", marginLeft:"3%", textAlign:"center", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center", marginBottom:"10px"}} required defaultValue={this.props.email}></input>);
            api = (<input type="text" ref="api" style={{width:"80%", marginLeft:"3%", textAlign:"center", border:"0", borderBottom:"1px solid black", borderRadius:"10px", textAlign:"center"}} required defaultValue={this.props.api}></input>);
        }else{
            name = (<h2>{this.props.name}</h2>);
            phone = (<em><i class="bi bi-telephone"></i> {this.props.phone}</em>);
            email = (<a href="han@rebellion.com" style={{color:"#1E90FF"}}><i class="bi bi-mailbox"></i> {this.props.email}</a>);
            icons = (
                <section>
                    <div style={{position:"absolute", top:"5px", left:"-12px", fontSize:"24px"}}><i class="fa fa-wrench iconUser" aria-hidden="true" onClick={this.modify}></i></div>
                    <div style={{position:"absolute", top:"5px", right:"0px", fontSize:"24px", color:"red"}}><i class="bi bi-trash iconUser" style={{color:"red"}} onClick={this.delete}></i></div>
                </section>
            );
        }
        return(
            <div class="user-cell" onMouseEnter={this.showIcon} onMouseLeave={this.hideIcon}>
                <section ref="iconRef" style={{display:"none"}}>
                    {icons}
                </section>
                <div class="user-profile">
                    <img class="user-photo" src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" />
                    <div class="user-meta noPadding">
                        {name}
                        {phone}
                        {email}
                        {api}
                    </div>
                </div>
                <a href={"/products?supplier="+this.props.id} className="noPadding" style={{background:"#1E90FF"}}>VISUALIZZA PRODOTTI</a>
            </div>
        );
    }
}