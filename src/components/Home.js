import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import LoadingBar from 'react-top-loading-bar';
import BarChart from './BarChart';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      object : "",
      link : "" ,
      errorMessage: "",
      linkErrorMessage : "" ,
      objectErrorMessage : "" ,
      linkValid : false ,
      objectValid : false ,
      enableLinkTF : false ,
      enableObjectTA : false ,
      enable : false 
    }
    
  }

  handleChange = (event) => {
    const name = event.target.name ; 
    const value = event.target.value ;
     
    switch (name) {
      case 'radio' :
        if ( event.target.checked && value === "1" )
        this.setState({enableObjectTA : true , enableLinkTF : false , linkErrorMessage : "" , linkValid : false });
        else if ( value === "2" )
        this.setState( { enableLinkTF : true , enableObjectTA : false , objectErrorMessage : "" , linkObject : false } ) ;
        break ;
      
      case 'link' :
        this.setState({ [name] : value , object : null}) ;
        break ;

      case 'object' : 
        //if( !value.match(/[/s (\n)]+/) )
        this.setState( { [name] : value , link : null} ) ;
        break ;

      default :
      break ;

    }
    this.handleValidations( name , value ) ;
  }

  handleValidations( name , value ) {
    var errorMessage = ""  ;
    let {linkValid , objectValid } = this.state ;
    switch ( name ) {
      case 'link' :
        if ( value.length === 0 ){
          errorMessage = "Please enter a link to proceed" ;
          linkValid = false ;
        }
        else{
          errorMessage = "" ;
          linkValid = true ;
        }
        break ;

      case 'object' :
        if ( value.length === 0 ){
          errorMessage = "Please enter an Object to proceed" ;
          objectValid =  false ;
        }
        else{ 
          try{
            var err = JSON.parse(value);           
          }catch(e){
            //console.log("error recieved=",e.message); 
            errorMessage = `Please enter a valid JSON object to proceed= ${e.message}` ;
            objectValid =  false ;
          }
          //console.log("error=",err.message);
          if( err )
         { errorMessage = "" ;
          objectValid =  true ;}
        }
        break ;
       default :
       break ;
    }
    if ( linkValid || objectValid  )
    this.setState( {enable : true , linkErrorMessage : errorMessage , objectErrorMessage : errorMessage } ) ;
    else
    this.setState( {enable : false , linkErrorMessage : errorMessage , objectErrorMessage : errorMessage } ) ;

  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    var urlPostOnline = "https://graphor-app-backend.herokuapp.com/service/postjson";
    var urlPostOffline = "http://localhost:3001/service/postjson" ;
    //var url = "http://localhost:3001/service/postjson";
    //var data = [1, 1, 2, 3, 5, 8, 13, 21];
    this.setState({json:null ,errorMessage : ""}) ;
    
    if ( this.state.enableObjectTA ){
      this.LoadingBar.continuousStart(5); // START LOADING BAR WHILE WAITING FOR THE RESPONSE FROM SERVER 
      var newOb = {} ;
      newOb["jsonOb"] = JSON.parse(this.state.object) ;
      //console.log("object being sent=",newOb , this.state.object);
    
      axios.post(urlPostOnline, newOb).then( r => {
        this.LoadingBar.complete() ;  
        var data = r.data.message ;
        console.log("posted and recieved object=",data);//STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
        this.setState({ json: data })
      }).catch(err => {
        let msg = "";
        if (err.response)
          msg = err.response.message;
        else
          msg = "Server Not Started , Please Start your Server!";
          this.LoadingBar && this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
        this.setState({ errorMessage: msg });
      });


    }
    else {
    var url = this.state.link ;
    this.LoadingBar.continuousStart(5); // START LOADING BAR WHILE WAITING FOR THE RESPONSE FROM SERVER    
    axios.get(url).then(result => {
      console.log("json object recieved=", result.data.message);
      let newOb = {} ;
      newOb["jsonOb"] = result.data.message ; 
      axios.post(urlPostOnline, newOb).then( r => {
        this.LoadingBar && this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
        var data = result.data.message ;
        this.setState({ json: data })
      }).catch(err => {
        let msg = "";
        if (err.response)
          msg = err.response.message;
        else
          msg = "Server Not Started , Please Start your Server!";
        this.LoadingBar && this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
        this.setState({ errorMessage: msg });
      });
    }).catch(err => {
      let msg = "";
      if (err.response)
        msg = err.response.message;
      else
        msg = "Server Not Started , Please Start your Server!";
        this.LoadingBar && this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
      this.setState({ errorMessage: msg });
    });
  } }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/* {JSON.stringify(this.state.enableObjectTA)} */}
        <DocumentTitle title = "Graphor | Convert JSON into Graph"/>
          <div className="row" >
          <LoadingBar height={7} color='grey' onRef={ref => (this.LoadingBar = ref)}/>
            <div className="col-lg-8 offset-lg-2 col-sm-12 col-md-12  text-center" style={{ backgroundColor: "lightblue" }}>
              <div className="card">
                <div className="card-title"><h1 className="display-4"><strong>Convert JSON Data to Graph</strong></h1></div>
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                  {this.state.enableLinkTF ? 
                  <div className="form-group">
                    <input type="link"  onChange={this.handleChange} placeholder="Please Enter link of the json file" name="link" className="form-control" />
                    <span className = "text-danger"><em>{this.state.linkErrorMessage}</em></span>
                  </div>
                  : <span></span>}
                  {this.state.enableObjectTA ? 
                  <div className="form-group">
                      <textarea id="content" value = { this.state.object } name="object" rows="5" onChange={this.handleChange} className="form-control" placeholder="Enter a JSON Object array of type [{'food':'xyz' , 'quantity':20} , { 'food' :... }  ,..]"/>
                      <span className="text-danger"><em>{this.state.objectErrorMessage}</em></span>
                  </div> : <span></span> }

                  <div className="form-check-inline">
                    <label className="form-check-label">JSON Object</label>
                    <input onChange={this.handleChange} className="form-check-input" type="radio" name = "radio" id="radio1" value="1" />
                  </div>
                  <div className="form-check-inline">
                    <label className="form-check-label">JSON Object Web Link</label>
                    <input onChange={this.handleChange} className="form-check-input" type="radio" name = "radio" id="radio2" value="2" />
                  </div>

                  {/* <div className="form-group">
                      <textarea value = { this.state.json } id="json" name="post" rows="5" onChange={this.handleChange} className="form-control"></textarea>
                      <span className="text-danger">{this.state.formErrorMessage.post}</span>
                  </div>               */}
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


