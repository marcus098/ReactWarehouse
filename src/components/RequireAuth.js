import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const RequireAuth =  ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    if(sessionStorage.getItem("userToken")=="" || sessionStorage.getItem("userToken")==null)
        return (<Navigate to="/login" replace />);
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: sessionStorage.getItem("userToken") })
    };
    if(isLoading==true){
        fetch('http://localhost:8081/api/check', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data!=0)
                    window.location.replace(`http://localhost:3000/login`);
                else
                    setIsLoading(false);
            });
    }
    if(isLoading==false)
        return (<div>{children}</div>);
}
export default RequireAuth;
