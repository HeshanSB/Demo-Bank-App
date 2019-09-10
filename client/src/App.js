import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import Login from './components/Login';
import AdminSideBar from './components/AdminSideBar';
import UserSideBar from './components/UserSideBar';
 
class App extends Component {
  componentDidMount(){
    console.log(localStorage.getItem("isAuthenticated"))
  }
  render() {
    return (
 
        <Router>
          <div className="App">
            <Switch>
              {localStorage.getItem("isAuthenticated")==="true" && localStorage.getItem("type")==="admin" ?<Route exact path="/admin" component={AdminSideBar}/>:<Route path="/admin" component={()=> "404 NOT FOUND"}/>}
              <Route exact path="/admin/register" component={AdminSideBar}/>
              <Route exact path="/admin/addMoney" component={AdminSideBar}/>
              <Route exact path="/admin/manageUsers" component={AdminSideBar}/>
              <Route path="/user" component={UserSideBar}/>
              <Route exact path="/" component={Login}/>
              {/* <Route path="*" component={()=> "404 NOT FOUND"}/> */}
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
