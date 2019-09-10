import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import AdminRouteFile from '../AdminRouteFile';
import DashBoardNavBar from './DashBoardNavBar';
// import './NewSideBar.css';

const sideBar={
    backgroundColor : '#302F2F' 
}

class AdminSideBar extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            navbarPadding :''
        }
    }

    // componentDidMount(){
        
    //     if(!(whologgedin()=="pcoordinator")){
    //         this.props.history.push('/login')
    //     }
    // }

    render(){
        return (
            <div>
                
                <div className='navbarFalse'>
                      <DashBoardNavBar className="pb-3"/>   
                </div>     
            
            <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                style={sideBar}
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
                onToggle={(expanded)=>{
                    if(expanded===true){
                        this.state.navbarPadding=1;
                        console.log(this.state.navbarPadding);
                    }
                    else{
                        this.state.navbarPadding=2;
                        console.log(this.state.navbarPadding);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="dashboard">
                    <NavItem eventKey="admin">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Users
                        </NavText>
                    </NavItem>
                   
                    <NavItem eventKey="admin/register">
                        <NavIcon>
                            <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            User Registration
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="admin/addMoney">
                        <NavIcon>
                            <i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Add Money
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="admin/manageUsers">

                        <NavIcon>
                            <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                           Accounts
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <AdminRouteFile/> 
            </main>
        </React.Fragment>
    )}
    />
</Router>
</div>
        );
    }
}
export default AdminSideBar;
