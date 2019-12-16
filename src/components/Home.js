import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import LoadingBar from 'react-top-loading-bar';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import BarChart from './BarChart';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      link : "" ,
      errorMessage: "",
      linkErrorMessage : "" ,
      enable : false
    }
    
  }

  handleChange = (event) => {
    const name = event.target.name ; 
    const value = event.target.value ;
    this.setState({ [name] : value }) 
    this.handleValidations( name , value ) ;
  }

  handleValidations( name , value ) {
    var errorMessage = "" , enable = false ;
    if ( value.length === 0 ){
      errorMessage = "Please enter a link to proceed" ;
      enable = false ;
    }
    else{
      errorMessage = "" ;
      enable = true ;
    }
    if ( enable )
    this.setState( {enable : true , linkErrorMessage : errorMessage } ) ;
    else
    this.setState( {enable : false , linkErrorMessage : errorMessage } ) ;

  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    //var url = "https://textor-app-backend.herokuapp.com/service";
    //var url = "http://localhost:3001/service/postjson";
    //var data = [1, 1, 2, 3, 5, 8, 13, 21];
    this.setState({json:null ,errorMessage : ""})
    var url = this.state.link ;
    this.LoadingBar.continuousStart(5); // START LOADING BAR WHILE WAITING FOR THE RESPONSE FROM SERVER    
    axios.get(url).then(result => {
      console.log("json object recieved=", result.data.message);
      let newOb = {} ;
      newOb["jsonOb"] = result.data.message ; 
      axios.post("https://graphor-app-backend.herokuapp.com/service/postjson", newOb).then( r => {
        this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
        var data = result.data.message ;
        this.setState({ json: data })
      }).catch(err => {
        let msg = "";
        if (err.response)
          msg = err.response.message;
        else
          msg = "Server Not Started , Please Start your Server!";
        this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
        this.setState({ errorMessage: msg });
      });
    }).catch(err => {
      let msg = "";
      if (err.response)
        msg = err.response.message;
      else
        msg = "Server Not Started , Please Start your Server!";
      this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
      this.setState({ errorMessage: msg });
    });
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/* {JSON.stringify(arcs)} */}
        <DocumentTitle title = "Graphor | Convert JSON into Graph"/>
          <div className="row" >
          <LoadingBar height={7} color='grey' onRef={ref => (this.LoadingBar = ref)}/>
            <div className="col-lg-8 offset-lg-2 col-sm-12 col-md-12  text-center" style={{ backgroundColor: "lightblue" }}>
              <div className="card">
                <div className="card-title"><h1 className="display-4"><strong>Convert JSON Data to Graph</strong></h1></div>
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input type="link"  onChange={this.handleChange} placeholder="Please Enter link of the json file" name="link" className="form-control" />
                    <span className = "text-danger"><em>{this.state.linkErrorMessage}</em></span>
                  </div>

                  <div style={{ width: "60px", height: "60px", marginLeft: "250px" }} className="text-center" >
                    {this.state.files ? <img src={this.state.files} alt="selected" className="img-fluid" /> : <span></span>}
                  </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary" disabled={!this.state.enable} >Upload JSON</button>
                    </div>
                </form>
                {/* {this.state.json ? <textarea disabled rows="8" cols="60" value={this.state.json} /> : <span></span>} */}
                {this.state.errorMessage ? <span className="text-danger"><em>{this.state.errorMessage}</em></span> : <span className="text-success"></span>}
              </div>
              <div style={{"backgroundColor":"white"}}>
                  {this.state.json ? <BarChart data={this.state.json} /> : <span></span>  }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


