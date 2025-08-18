import './../util/util.css'
import './../styles/myAcc.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'


function MyAccount(){
    return(
        <div className='myAcc'>
            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>My Account</h1>
            </div>
            <div className='myaccOptions grid grid-2-col gap16 pad16'>
                {["Order-history", "Return-refund", "Complains", "Settings", "Your-concerns"].map(el=>
                    <Link to={`/${el}`} className='linkAcc'>{el}</Link>
                )}
            </div>
        </div>
    )
}

export default MyAccount;