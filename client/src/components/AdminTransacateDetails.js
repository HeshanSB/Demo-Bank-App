import React,{Component } from "react";
import {MDBCard, MDBCardBody} from 'mdbreact';
import { Label, Table } from 'semantic-ui-react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class AdminTransacateDetails extends Component{

    constructor(props){
        super(props)
        this.state={
            transDetails:[]
        }
    }

    componentDidMount(){
        Axios.get("http://localhost:8080/bank/transactions",{headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            const transDetails = res.data
            this.setState({transDetails: transDetails})
            console.log(jwt_decode(localStorage.getItem('jwttoken')).sub)
            console.log(this.state.transDetails)


        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        const{transDetails} = this.state
        return(
            <div>
                <div className="container pt-5">
                    <div className="row">
                        <MDBCard className="w-100 p-3">
                            <MDBCardBody >
                                <p className="h4 text-center py-4">Transaction Details</p>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Transaction No</Table.HeaderCell>
                                            <Table.HeaderCell>Sender Account No</Table.HeaderCell>
                                            <Table.HeaderCell>Receiver Account NO</Table.HeaderCell>
                                            <Table.HeaderCell>Sent Amount(Rs.)</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {transDetails.map(transDetails=>
                                            <Table.Row>
                                                <Table.Cell>{transDetails.id}</Table.Cell>
                                                <Table.Cell>{transDetails.senderAccountNo==1000 ? "Bank" : transDetails.senderAccountNo}</Table.Cell>
                                                <Table.Cell>{transDetails.recieverAccountNo}</Table.Cell>
                                                <Table.Cell>{transDetails.amount}</Table.Cell>
                                             </Table.Row>
                                            )}
                                    </Table.Body>
                                </Table>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
        );
    }
}
export default AdminTransacateDetails;