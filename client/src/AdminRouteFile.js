import{BrowserRouter as Router , Route, Switch, Redirect} from 'react-router-dom'
import React, {Component}from 'react'

import Registration from './components/Registration'
import AdminTransacateDetails from './components/AdminTransacateDetails'
import ManageUsers from './components/ManageUsers'
import AddMoney from './components/AddMoney'

class AdminRouteFile extends Component{
    componentDidMount(){
        console.log(localStorage.getItem("isAuthenticated"))
    }
    render(){
        return(
            <div>
                <Route exact path="/admin" component={props=><AdminTransacateDetails/>}/>
                <Route path="/admin/register" component={props=><Registration/>}/>
                <Route path="/admin/manageUsers" component={props=><ManageUsers/>}/>
                <Route path="/admin/addMoney" component={props=><AddMoney/>}/>
            </div>
        );
    }
}
export default AdminRouteFile;