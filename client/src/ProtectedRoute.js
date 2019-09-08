import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";


export const ProtectedRoute =({component: Component}, ...rest)=>{
    const some=true;
    return(
        <Route
            {...rest}
            render={ props =>{
                if(some==true){
                    return <Component {...props} />
                }
                else{
                    return(
                        <Redirect
                            to={{
                                pathname:"/",
                                state:{
                                    from : props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )
}