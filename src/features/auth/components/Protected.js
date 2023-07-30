import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUsr } from '../authSlice'
import { Navigate } from 'react-router-dom';
const Protected = ({children}) => {
    const user=useSelector(selectLoggedInUsr);
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
  return children
}

export default Protected
