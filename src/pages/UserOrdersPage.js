import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UsersOrders from '../features/user/components/UsersOrders'
const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className='mx-auto text-2xl'>My Orders</h1>
        <UsersOrders></UsersOrders>
      </Navbar>
    </div>
  )
}

export default UserOrdersPage
