import React from 'react'
import UserProfiles from '../features/user/components/UserProfile'
import Navbar from '../features/navbar/Navbar'
const UserProfile = () => {
  return (
    <div>
      <Navbar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfiles></UserProfiles>
      </Navbar>
    </div>
  )
}

export default UserProfile
