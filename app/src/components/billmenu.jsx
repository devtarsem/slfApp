import './../util/util.css'
import './../styles/menu.css'
import { Link } from 'react-router-dom';
import productStore from '../store/products.store'
import { useEffect, useState } from 'react'

function BillMenu(){

    const {homeProducts, allProducts,fetchingProducts,filters, openFilters, closeFilters} = productStore()

    function openingClosingFilters(){
        openFilters()
    }

    function closeFiltersFun(){
        closeFilters()
    }

    return(
        <div className='billmenu pad16 flex flex-1 gap16'>
            <div className='billcontext flex flex-3 pad10 gap16'>
                <Link to='/cart' className='sellP checkout standardBtn'>Checkout &mdash; ($7415/-)</Link>
            </div>
            <Link to='/' className='menuLink flex flex-2 flex-dir gap4'>
                <svg className='smallSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 18H9" stroke="#000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                Home
            </Link>
            {filters ?
                <button onClick={closeFiltersFun} className='menuLink filterbtnp flex flex-2 flex-dir gap4'>
                    <svg className='smallSVG' fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>
                    close
                </button>
            :
                <button onClick={openingClosingFilters} className='menuLink filterbtnp flex flex-2 flex-dir gap4'>
                    <svg className='smallSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4L9 12V18L15 21V12L20 4H4Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    Filters
                </button>
            }
        </div>
    )
}

export default BillMenu