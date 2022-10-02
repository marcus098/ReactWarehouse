import React from "react";
import { Navbar } from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cart } from "../components/Cart"

class Layout extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log("entro");
        console.log(this.props);
      return (
        <section>
          <Cart></Cart>
          <Navbar role={this.props.role} />
          <main>
            <div className="row spostamento">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 rowContent">
                    {this.props.children}
                </div>
            </div>
        </main>
        </section>
      )
    }
  }
  export default Layout;