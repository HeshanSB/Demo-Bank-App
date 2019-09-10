import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBFooter  } from 'mdbreact';
//import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Axios from "axios";
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      type:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    const userData = {
      username : this.state.username,
      password : this.state.password
    }
    console.log(userData);
    Axios.post("http://localhost:8080/authenticate", userData)
    .then(res=>{ 
      const {token}= res.data
      localStorage.setItem('jwttoken',token)
      localStorage.setItem('isAuthenticated', true)
      var decoded = jwt_decode(token)
      console.log(decoded.sub)
      
      Axios.get("http://localhost:8080/bank/users/name/"+decoded.sub,{headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
      .then(res=>{swal({
        title: "Good job!",
        text: "You have succesfully signed in!",
        icon: "success",
      });
        this.state.type = res.data.type
        if(res.data.type==="user"){
          this.props.history.push('/user')
        }
        else if(res.data.type==="admin"){
          this.props.history.push('/admin')
          localStorage.setItem('type', 'admin')
        }
      })
      .catch(err=>{
        swal ( "Oops" , "Username or Password wrong" ,  "error"  )
      })
    })
    .catch(err =>{
      swal ( "Oops" , "Username or Password wrong" ,  "error" )
    })
  }

  render(){
    return (
      <div >
        <Navbar/>
        <div className="container pt-5">  
        <div className="row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-6">
        <MDBContainer>
          <MDBRow>
              <MDBCard className="w-75 p-3">
                <MDBCardBody >
                  <form onSubmit={this.onSubmit}>
                  <div className="form-header blue rounded">
                  <p className="h4 text-center py-4">Login</p>
                  </div>
                    <MDBInput 
                    required
                      label="User Name"  
                      className="w-75 p-3"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}

                      group 
                      type="text"
                      validate
                      error="wrong"
                      success="right" />
                    <MDBInput
                      label="Your password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      group
                      type="password"
                      className="w-75 p-3"
                      validate
                      error="wrong"
                      success="right"
                      containerClass="mb-0"
                      required
                    />
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="primary"
                        type="submit"
                      >
                        Log in
                      </MDBBtn>
                      
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
          </MDBRow>
        </MDBContainer>
      </div>
      </div>
    
      </div>
      <div style={{position: "fixed", left: "0px", width: "100%", bottom: "0px", backgroundColor: "", color: "white",
   textAlign: "center"}}>
      <MDBFooter color="grey" className="font-small pt-4 mt-4" >
    
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
    </div>
    )
  }
}


export default Login;