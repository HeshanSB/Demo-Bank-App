import React,{ Component } from "react";
import {MDBInput, MDBCard, MDBCardBody, MDBBtn} from 'mdbreact';
import Axios from "axios";
import swal from 'sweetalert';

class Registration extends Component{
    constructor(props){
        super(props)
        this.state = {
            accountNo:'',
            nicNo:'',
            branch:'',
            name:'',
            password:'',
            username:'',
            cpassword:'',
            amount:''   
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const userData = {
            accountNo : this.state.accountNo,
            nicNo : this.state.nicNo,
            branch : this.state.branch,
            name : this.state.name,
            password : this.state.password,
            username : this.state.username
        }

        const accountData={
            accountNo: this.state.accountNo,
            availableBalance: this.state.amount,
        }

        const transData={
            senderAccountNo : 1000,
            recieverAccountNo : this.state.accountNo,
            amount : this.state.amount
        }
        if(this.state.password == this.state.cpassword)
        {
            Axios.post("http://localhost:8080/register", userData)
            .then(res=>{
                Axios.post("http://localhost:8080/bank/accounts", accountData, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
                .then(res=>{
                    Axios.post("http://localhost:8080/bank/transactions/admin", transData, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
                    .then(res=>{
                        swal({
                            title: "Good job!",
                            text: "You have succesfully created account!",
                            icon: "success",
                        });
                    })
                    .catch(err=>{
                        swal ( "Oops" , "Error1" ,  "error"  )
                        console.log(err)
                    })
                })
                .catch(err=>{
                    swal ( "Oops" , "error1" ,  "error"  )
                    console.log(err)
                })
            })
            .catch(err=>{
                swal ( "Oops" , "Email used before" ,  "error"  )
                console.log(err)
            })
        }else{
            swal ( "Oops" , "Confrim password not match to password" ,  "error"  )
        }

    }

    render(){

        return(
            <div>
                <div className="container pt-5">
                    <div className="row">
                        <MDBCard className="w-75 p-3">
                            <MDBCardBody >
                                <p className="h4 text-center py-4">Create Accounts</p>
                                <form onSubmit = {this.onSubmit}>
                                    <MDBInput 
                                        required
                                        label="Name"  
                                        className="w-75 p-3"
                                        name="name"
                                        value = {this.state.name}
                                        onChange = {this.onChange}

                                        group 
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput 
                                        required
                                        label="Email"  
                                        className="w-75 p-3"
                                        name="username"
                                        value = {this.state.username}
                                        onChange = {this.onChange}

                                        group 
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                required
                                                label="Account Number"  
                                                className="w-75 p-3"
                                                name="accountNo"
                                                value = {this.state.accountNo}
                                                onChange = {this.onChange}

                                                group 
                                                type="number"
                                                validate
                                                error="wrong"
                                                success="right" />
                                        </div>
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                required
                                                label="NIC Number"  
                                                className="w-75 p-3"
                                                name="nicNo"
                                                value = {this.state.nicNo}
                                                onChange = {this.onChange}

                                                group 
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right" />
                                        </div>
                                    </div>
                                     <MDBInput 
                                        required
                                        label="Bank Branch"  
                                        className="w-75 p-3"
                                        name="branch"
                                        value = {this.state.branch}
                                        onChange = {this.onChange}

                                        group 
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput 
                                        required
                                        label="Initial saving amount(LKR)"  
                                        className="w-75 p-3"
                                        name="amount"
                                        value = {this.state.amount}
                                        onChange = {this.onChange}

                                        group 
                                        type="number"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                required
                                                label="New Password"  
                                                className="w-75 p-3"
                                                name="password"
                                                value = {this.state.password}
                                                onChange = {this.onChange}

                                                group 
                                                type="password"
                                                validate
                                                error="wrong"
                                                success="right" />
                                        </div>
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                required
                                                label="Confirm Password"  
                                                className="w-75 p-3"
                                                name="cpassword"
                                                value = {this.state.cpassword}
                                                onChange = {this.onChange}

                                                group 
                                                type="password"
                                                validate
                                                error="wrong"
                                                success="right" />
                                        </div>
                                    </div>
                                    <div className="text-center mb-2 mt-3">
                                        <MDBBtn
                                            color="primary"
                                            type="submit"
                                        >
                                            Create Account
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
        );
    }
}
export default Registration;