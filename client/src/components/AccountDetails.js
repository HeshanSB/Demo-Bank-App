import React,{ Component } from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCardText} from 'mdbreact';
import { Label, Table } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

class AccountDetails extends Component{

    constructor(props){
        super(props)
        this.state={
            userDetails:[],
            accountDetails:[],
            senderDetails:[],
            receiverDetails:[]
        }
    }

    componentDidMount(){

        Axios.get("http://localhost:8080/bank/users/name/"+jwt_decode(localStorage.getItem('jwttoken')).sub,{headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            const userDetails = res.data
            this.setState({userDetails: userDetails})
            Axios.get("http://localhost:8080/bank/accounts/"+userDetails.accountNo, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
            .then(res=>{
                const accountDetails = res.data
                this.setState({accountDetails : accountDetails})
            })
            .catch(error=>{
                console.log(error)
            })

            Axios.get("http://localhost:8080/bank/transactions/sender/"+userDetails.accountNo, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
            .then(res=>{
                const senderDetails = res.data
                this.setState({senderDetails:senderDetails})
            })
            .catch(error=>{
                console.log(error)
            })

            Axios.get("http://localhost:8080/bank/transactions/receiver/"+userDetails.accountNo, {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
            .then(res=>{
                const receiverDetails = res.data
                this.setState({receiverDetails:receiverDetails})
            })
            .catch(error=>{
                console.log(error)
            })

        })
        .catch(error => {
            console.log(error);
        });


    }
    render(){
        const {userDetails, accountDetails, senderDetails, receiverDetails} = this.state
        return(
            <div>
                <div className="container pt-5">
                    <div className="row">
                        <MDBCard className="w-75 p-3">
                            <MDBCardBody >
                                <MDBCardHeader>
                                    <MDBCardTitle>
                                        Account Details
                                    </MDBCardTitle>
                                </MDBCardHeader>
                                <MDBCardText>
                                    <div className="row pt-3 text-left">
                                        <div className="col-sm-4 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b> Account Number</b> 
                                            </div>
                                        </div>
                                        <div className="col-sm-2 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b>:</b> 
                                            </div>
                                        </div>
                                        <div className="col-sm-6 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                                {userDetails.accountNo}
                                            </div>
                                        </div>
                                        <div className="col-sm-4 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b> Owner Name</b>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b>:</b> 
                                            </div>
                                        </div>
                                        <div className="col-sm-6 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                                {userDetails.name} 
                                            </div>
                                        </div>
                                        <div className="col-sm-4 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b> NIC number</b>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b>:</b> 
                                            </div>
                                        </div>
                                        <div className="col-sm-6 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                                {userDetails.nicNo}
                                            </div>
                                        </div>
                                        <div className="col-sm-4 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b> Branch Name </b>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b>:</b> 
                                            </div>
                                        </div>
                                        <div className="col-sm-6 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                                {userDetails.branch}
                                            </div>
                                        </div>
                                        <div className="col-sm-4 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b> Available Balance(LKR) </b>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                               <b>:</b> 
                                            </div>
                                        </div>
                                        <div className="col-sm-6 pt-3">
                                            <div style={{fontSize:'20px'}}>
                                                {accountDetails.availableBalance}
                                            </div>
                                        </div>
                                    </div>
                                </MDBCardText>  
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    <div className="row pt-3">
                        <MDBCard className="w-100 p-3">
                            <MDBCardBody >
                                <MDBCardHeader>
                                    <MDBCardTitle>
                                        Sent Details
                                    </MDBCardTitle>
                                </MDBCardHeader>
                                <MDBCardText>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Transaction No</Table.HeaderCell>
                                                <Table.HeaderCell>Receiver Account NO</Table.HeaderCell>
                                                <Table.HeaderCell>Sent Amount</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {senderDetails.map(senderDetails=>
                                            <Table.Row>
                                                <Table.Cell>{senderDetails.id}</Table.Cell>
                                                <Table.Cell>{senderDetails.recieverAccountNo}</Table.Cell>
                                                <Table.Cell>{senderDetails.amount}</Table.Cell>
                                            </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </MDBCardText>  
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    <div className="row pt-3">
                        <MDBCard className="w-100 p-3">
                            <MDBCardBody >
                                <MDBCardHeader>
                                    <MDBCardTitle>
                                        Received Details
                                    </MDBCardTitle>
                                </MDBCardHeader>
                                <MDBCardText>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Transaction No</Table.HeaderCell>
                                                <Table.HeaderCell>Sender Account No</Table.HeaderCell>
                                                <Table.HeaderCell>Received Amount</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {receiverDetails.map(receiverDetails=>
                                            <Table.Row>
                                                <Table.Cell>{receiverDetails.id}</Table.Cell>
                                                <Table.Cell>{receiverDetails.senderAccountNo==1000? "Bank": receiverDetails.senderAccountNo}</Table.Cell>
                                                <Table.Cell>{receiverDetails.amount}</Table.Cell>
                                            </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </MDBCardText>  
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
        );
    }
}
export default AccountDetails;
