import React from "react";

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userToken: localStorage.getItem("userToken")
        };
        this.deleteToken();
    }

    //function
    deleteToken = () =>{
        if(this.state.userToken=="" || this.state.userToken == null){
            window.location.replace(`http://localhost:3000/login`);
        }
      localStorage.removeItem("productsCart");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: localStorage.getItem("userToken") })
        };
        fetch('http://localhost:8081/api/logout', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data==0){
                    localStorage.removeItem("userToken");
                    window.location.replace(`http://localhost:3000/login`);
                }
            });
    } 

    //render
    render(){
        return(
            <div></div>
        );
    }
}

export default Logout;