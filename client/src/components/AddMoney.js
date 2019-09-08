import React,{ Component } from "react";
import {MDBInput, MDBCard, MDBCardBody, MDBBtn} from 'mdbreact';
import Axios from "axios";
import swal from 'sweetalert';

class AddMoney extends Component{
    constructor(props){
        super(props)
        this.state = {
            accountNo:'',
            branch:'',
            name:'',
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
        const transData={
            senderAccountNo : 1000,
            recieverAccountNo : this.state.accountNo,
            amount : this.state.amount
        }
        Axios.post("http://localhost:8080/bank/transactions/trans", transData, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            swal({
                title: "Good job!",
                text: "You have succesfully added money!",
                icon: "success",
              });
        })
        .catch(err=>{
            swal ( "Oops" , "Error" ,  "error"  )
            console.log(err)
        })
        
    }

    render(){

        return(
            <div>
                <div className="container pt-5">
                    <div className="row">
                        <MDBCard className="w-75 p-3">
                            <MDBCardBody >
                                <p className="h4 text-center py-4">Add Money</p>
                                <form onSubmit = {this.onSubmit}>
                                            <MDBInput 
                                                required
                                                label="Account Number"  
                                                className="w-75 p-3"
                                                name="accountNo"
                                                value = {this.state.accountNo}
                                                onChange = {this.onChange}

                                                group 
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right" />
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
                                            label="Amount(LKR.)"  
                                            className="w-75 p-3"
                                            name="amount"
                                            value = {this.state.amount}
                                            onChange = {this.onChange}

                                            group 
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right" />
                                    <div className="text-center mb-2 mt-3">
                                        <MDBBtn
                                            color="primary"
                                            type="submit"
                                        >
                                        ADD
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
export default AddMoney;