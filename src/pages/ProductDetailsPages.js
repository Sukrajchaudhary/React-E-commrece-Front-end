import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/Productlist/components/ProductDetails'

const ProductDetailsPages = () => {
  return (
    <div>
      <Navbar>
        <ProductDetails></ProductDetails>
      </Navbar>
    </div>
  )
}

export default ProductDetailsPages
