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
            amount:'',
            recieverName:'',
            enterBranch:''
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
        Axios.get('http://localhost:8080/bank/users/'+this.state.accountNo, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            this.state.recieverName=res.data.name
            this.state.enterBranch=res.data.branch
            if(this.state.recieverName!=this.state.name){
                swal ( "Oops" , "Name is incorrect!!" ,  "error"  )
                console.log(this.state.recieverName)
            }
            if(this.state.enterBranch!=this.state.branch){
                swal ( "Oops" , "Please enter correct branch!!" ,  "error"  )
            }
            else if(this.state.amount<=0){
                swal ( "Oops" , "Amount can't be zero or less than zero" ,  "error"  )
            }
            else if(this.state.recieverName==this.state.name && this.state.enterBranch==this.state.branch && this.state.amount>0){
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
        })
        .catch(err=>{
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
                                            type="number"
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