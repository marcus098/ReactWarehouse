import React from "react";

export default class ButtonSave extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.value);
        return(
            <div id="containerSave">
                <button className="learn-more saveButton" data-id={(this.props.value) ? this.props.value : "" } onClick={(e) => this.props.handler(e)}>
                    <span className="circle" aria-hidden="true" data-id={(this.props.value) ? this.props.value : "" }>
                        <span className="icon arrow" data-id={(this.props.value) ? this.props.value : "" }>
                        </span>
                    </span>
                    <span className="button-text" data-id={(this.props.value) ? this.props.value : "" }>{this.props.name}</span>
                </button>
            </div>
        );
    }
}