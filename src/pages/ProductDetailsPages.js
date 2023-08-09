import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/Productlist/components/ProductDetails'
import Footer from '../features/common/Footer'

const ProductDetailsPages = () => {
  return (
    <div>
      <Navbar>
        <ProductDetails></ProductDetails>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductDetailsPages
