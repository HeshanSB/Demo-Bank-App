import React,{ Component } from "react";
import {MDBInput, MDBCard, MDBCardBody, MDBBtn} from 'mdbreact';
import Axios from "axios";
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

class TransactionForm extends Component{
    constructor(props){
        super(props)
        this.state={
            senderAccountNo:'',
            recieverAccountNo:'',
            amount:'',
            password:'',
            recieverBranch:'',
            name:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    componentDidMount(){

        Axios.get("http://localhost:8080/bank/users/name/"+jwt_decode(localStorage.getItem('jwttoken')).sub,{headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            this.state.senderAccountNo = res.data.accountNo
            console.log(this.state.senderAccountNo)
        })
        .catch(error=>{
            console.log(error.data)
        })
    }

    onSubmit(e){
        e.preventDefault();
        const transcateData={
            senderAccountNo: this.state.senderAccountNo,
            recieverAccountNo: this.state.recieverAccountNo,
            amount: this.state.amount
        }
        console.log(transcateData)
        Axios.post("http://localhost:8080/bank/transactions", transcateData, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            if(res.data.receiver=="not Found"){
                swal ( "Oops" , "There is no account number" ,  "error"  )
            }
            else if(res.data.amount=="less amount"){
                swal ( "Oops" , "Available balance is less" ,  "error"  )
            }
            else if(res.data.amount=="ok" && res.data.receiver=="found")
                swal("Good job!" , "You have succesfully sent money!" , "success")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render(){

        return(
            <div>
                <div className="container pt-5">
                    <div className="row">
                        <MDBCard className="w-75 p-3">
                            <MDBCardBody >
                                <p className="h4 text-center py-4">Transaction Form</p>
                                <form onSubmit={this.onSubmit}>
                                    <MDBInput 
                                        required
                                        label="Reciever's Account Number"  
                                        className="w-75 p-3"
                                        name="recieverAccountNo"
                                        onChange={this.onChange}
                                        value={this.state.recieverAccountNo}

                                        group 
                                        type="number"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput 
                                        required
                                        label="Reciever's Bank Branch"  
                                        className="w-75 p-3"
                                        name="recieverBranch"
                                        onChange={this.onChange}
                                        value={this.state.recieverBranch}

                                        group 
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput 
                                        required
                                        label="Reciever Name"  
                                        className="w-75 p-3"
                                        name="name"
                                        onChange={this.onChange}
                                        value={this.state.name}

                                        group 
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput 
                                        required
                                        label="Sending Amount"  
                                        className="w-75 p-3"
                                        name="amount"
                                        onChange={this.onChange}
                                        value={this.state.amount}

                                        group 
                                        type="number"
                                        validate
                                        error="wrong"
                                        success="right" />
                                        <div className="text-center mb-4 mt-5">
                                            <MDBBtn
                                                color="primary"
                                                type="submit"
                                            >
                                                Transcate Money
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
export default TransactionForm;