import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/Productlist/components/ProductList'
import Footer from '../features/common/Footer'
const Homepage = () => {
  return (
    <div>
      <Navbar>
         <ProductList></ProductList>
      </Navbar>
     <Footer></Footer>
    </div>
  )
}

export default Homepage
