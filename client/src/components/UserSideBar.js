import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import{BrowserRouter as Router , Route} from 'react-router-dom'
import React,{Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import UserRouteFile from '../UserRouteFile';
import DashBoardNavBar from './DashBoardNavBar';
// import './NewSideBar.css';

const sideBar={
    backgroundColor : '#302F2F' 
}

class UserSideBar extends Component{
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
                    if(expanded==true){
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
                    <NavItem eventKey="user">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Account Details
                        </NavText>
                    </NavItem>
                   
                    <NavItem eventKey="user/transaction">
                        <NavIcon>
                            <i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Transaction
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <UserRouteFile/> 
            </main>
        </React.Fragment>
    )}
    />
</Router>
</div>
        );
    }
}
export default UserSideBar;
