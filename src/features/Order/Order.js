import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  placeOrderAsync
} from './counterSlice';


export default function  Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();


  return (
    <div>
      
    </div>
  );
}