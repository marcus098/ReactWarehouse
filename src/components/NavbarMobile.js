import React from "react";
import '../css/Navbar.css';

export class NavbarMobile extends React.Component{
    constructor(props){
        super(props);
        this.state = {toRender: (<></>)};
    }
    //functions

    render(){
        return(
            <div className="navbarMobile">
                <div>Menu1</div>
                <div>Menu2</div>
                <div>Menu3</div>
                <div>Menu4</div>
                <div>Menu5</div>
            </div>
        );
    }
}