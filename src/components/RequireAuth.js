import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const RequireAuth =  ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    if(localStorage.getItem("userToken") == "" || localStorage.getItem("userToken") == null)
        return (<Navigate to="/login" replace />);
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: localStorage.getItem("userToken"), page: children.props.page })
    };
    if(isLoading==true){
        fetch('http://localhost:8081/api/check', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.bool == false){
                    if(data.message == "Unauthorized"){
                        window.location.replace(`http://localhost:3000/unauthorized`);
                    }else {
                        window.location.replace(`http://localhost:3000/login`);
                    }
                }
                else
                   setIsLoading(false);
            });
    }
    if(isLoading == false)
        return (<div>{children}</div>);
}
export default RequireAuth;
