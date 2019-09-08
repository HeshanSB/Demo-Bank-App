import{Route} from 'react-router-dom'
import React, {Component}from 'react'

import AccountDetails from './components/AccountDetails'
import TransactionForm from './components/TransactionForm'

class UserRouteFile extends Component{
    render(){
        return(
            <div>
                <Route exact path="/user" component={props=><AccountDetails/>}/>
                <Route path="/user/transaction" component={props=><TransactionForm/>}/>
            </div>
        );
    }
}
export default UserRouteFile;
