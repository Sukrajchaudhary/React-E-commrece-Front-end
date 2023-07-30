import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/Productlist/components/ProductList'
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div>
      <Navbar>
         <ProductList></ProductList>
      </Navbar>
      <Link to='/admin'>Admin</Link>
    </div>
  )
}

export default Homepage
