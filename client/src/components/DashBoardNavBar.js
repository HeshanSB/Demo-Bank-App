import React, { Component } from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";

import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';  
class DashBoardNavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      username: props.username,
      requestcount: props.requestcount,
      requests: []
    };
    console.log(props)
  }
  logout(){
    localStorage.removeItem('jwttoken')
    localStorage.setItem('isAuthenticated', false)
    localStorage.setItem('type', 'none')
  }

  render() {
    return (
      <MDBNavbar color="light" dark expand="md">
        <MDBNavbarBrand>
          <strong className='title' style={{ color: '#000000', marginLeft:'60px'}}>Welcome To Demo-Bank App</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavItem active>
                <NotificationBadge count={this.state.requestcount} effect={Effect.SCALE} />

               
              </MDBNavItem>
            </MDBNavItem>
            <MDBNavItem active>
              <MDBNavLink to="/"><b onClick={this.logout} style={{ color: '#000000' }}>log out </b></MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>

    );
  }
}

export default DashBoardNavBar;
