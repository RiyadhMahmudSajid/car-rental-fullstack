import React, { useContext } from 'react';
import { AuthContex } from '../Contex/AuthProvider';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import Loading from '../Component/Loading/Loading';

const PrivateRoute = ({ children }) => {

    const location = useLocation()
    

    const {user,loading} = useContext(AuthContex)
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){

        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;