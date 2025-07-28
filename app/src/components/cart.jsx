import './../util/util.css'
import './../styles/cart.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import heart from '/heart.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productStore from '../store/products.store';

function Cart(){

    const {extractionWholeCartItems, extractedCart} = productStore();

    useEffect(el=>{
        extractionWholeCartItems()
    }, [])

    return(
        <div className='cart'>
            <div className='carthead flex flex-3 pad16'>
                <h1 className='head2head'>Cart</h1>
            </div>
            
        </div>
    )
}


export default Cart