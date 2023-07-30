import React, { useEffect } from 'react'
import { signOutUserAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoginuserInfo } from '../../user/userSlice'

const LogOut = () => {
    const dispatch=useDispatch()
    const user=useSelector(selectLoginuserInfo)
    useEffect(()=>{
        dispatch(signOutUserAsync())
    },[])
  return (
    <div>
      {!user &&<Navigate to='/login' replace={true}></Navigate>}
    </div>
  )
}

export default LogOut;
