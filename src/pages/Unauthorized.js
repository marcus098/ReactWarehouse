import React from "react";
import { Link } from "react-router-dom"
import Loading from "../components/Loading";
import '../css/Missing.css';

export default class Unauthorized extends React.Component{
    constructor(props){
        super(props);
        this.props = {

        }
    }

    randomNum = () => {
        return Math.floor(Math.random() * 9)+1;
    }

    call = () => {
        var loop1,loop2,loop3,time=30, i=0, number, selector3 = this.refs.third, selector2 = this.refs.second,
            selector1 = this.refs.first;
        loop3 = setInterval(() =>
        {
            if(i > 40)
            {
                clearInterval(loop3);
                selector3.innerHTML = 4;
            }else
            {
                selector3.innerHTML = this.randomNum();
                i++;
            }
        }, time);
        loop2 = setInterval(() =>
        {
            if(i > 80)
            {
                clearInterval(loop2);
                selector2.innerHTML = 0;
            }else
            {
                selector2.innerHTML = this.randomNum();
                i++;
            }
        }, time);
        loop1 = setInterval(() =>
        {
            if(i > 100)
            {
                clearInterval(loop1);
                selector1.innerHTML = 1;
            }else
            {
                selector1.innerHTML = this.randomNum();
                i++;
            }
        }, time);
}

componentDidMount = () => {
    
}


componentWillUnmount = () => {
    this.call();
}

    render(){
        return (
            <section>
            <div class="error">
                <div class="container-floud">
                    <div class="col-xs-12 ground-color text-center">
                        <div class="container-error-404">
                            <div class="clip"><div class="shadow"><span class="digit thirdDigit" ref="third"></span></div></div>
                            <div class="clip"><div class="shadow"><span class="digit secondDigit" ref="second"></span></div></div>
                            <div class="clip"><div class="shadow"><span ref="first" class="digit firstDigit"></span></div></div>
                        </div>
                        <h2 class="h1">Ops... Non hai l'autorizzazione!</h2>
                    </div>
                </div>
            </div>
            </section>
        );
    }
}
