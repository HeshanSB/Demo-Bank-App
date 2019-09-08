import React,{Component } from "react";
import {MDBCard, MDBCardBody} from 'mdbreact';
import { Label, Table } from 'semantic-ui-react';
import Axios from 'axios';

class ManageUsers extends Component{
    constructor(props){
        super(props)
        this.state={
            userAccounts:[]
        }
    }
    componentDidMount(){
        Axios.get("http://localhost:8080/bank/users",{headers:{"Authorization" : `Bearer ${localStorage.getItem('jwttoken')}`}})
        .then(res=>{
            const userAccounts = res.data
            this.setState({userAccounts: userAccounts})
            console.log(this.state.userAccounts)
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        const { userAccounts} = this.state;
        return(
            <div>
                <div className="container pt-5">
                    <div className="row">
                        <MDBCard className="w-100 p-3">
                            <MDBCardBody >
                                <p className="h4 text-center py-4"> Accounts</p>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Account No</Table.HeaderCell>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>NIC No</Table.HeaderCell>
                                            <Table.HeaderCell>Branch</Table.HeaderCell>
                                            <Table.HeaderCell>Email(username)</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {userAccounts.map(userAccounts=>
                                            <Table.Row>
                                                <Table.Cell>{userAccounts.accountNo}</Table.Cell>
                                                <Table.Cell>{userAccounts.name}</Table.Cell>
                                                <Table.Cell>{userAccounts.nicNo}</Table.Cell>
                                                <Table.Cell>{userAccounts.branch}</Table.Cell>
                                                <Table.Cell>{userAccounts.username}</Table.Cell>
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
export default ManageUsers;