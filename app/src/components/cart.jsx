import './../util/util.css'
import './../styles/cart.css'
import { Link, Navigate } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import heart from '/heart.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productStore from '../store/products.store';
import LoaderComp from './loader';
// id = 
// secret = 

function Cart(){

    const {extractionWholeCartItems,Loader, continueShopAfterOrderPalced,placingOnlinePaidOrder,cart,PlacingOrderToDb ,order_placed ,checkingAuth, Auth, billingTheCart, gross_bill, tax, total, extractedCart, deletingItemFromCart} = productStore();

    useEffect(el=>{
        extractionWholeCartItems()
    }, [])

    useEffect(el=>{
        billingTheCart()

    }, [])

    useEffect(el=>{
        checkingAuth()
    }, [])

    function DeleteItem(event, id){
        deletingItemFromCart(id)
    }

    function PlacingOrder(){
        PlacingOrderToDb(cart, tax, gross_bill)
    }

    function payOnline(){
        placingOnlinePaidOrder(total,Navigate, cart, tax, gross_bill)
    }

    function SettingBackTheThings(){
        continueShopAfterOrderPalced()
    }

    return(
        <div className='cart'>

            {order_placed &&

                <div className='order_placed flex flex-2 flex-dir gap16'>
                    <svg className='largeSVG extraLarge' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.56499 12.4068C4.29258 12.0947 3.81879 12.0626 3.50676 12.335C3.19472 12.6074 3.1626 13.0812 3.43501 13.3932L4.56499 12.4068ZM7.14286 16.5L6.57787 16.9932C6.7203 17.1564 6.92629 17.25 7.14286 17.25C7.35942 17.25 7.56542 17.1564 7.70784 16.9932L7.14286 16.5ZM15.565 7.99324C15.8374 7.68121 15.8053 7.20742 15.4932 6.93501C15.1812 6.6626 14.7074 6.69472 14.435 7.00676L15.565 7.99324ZM10.5064 11.5068C10.234 11.8188 10.2662 12.2926 10.5782 12.565C10.8902 12.8374 11.364 12.8053 11.6364 12.4932L10.5064 11.5068ZM9.67213 14.7432C9.94454 14.4312 9.91242 13.9574 9.60039 13.685C9.28835 13.4126 8.81457 13.4447 8.54215 13.7568L9.67213 14.7432ZM3.43501 13.3932L6.57787 16.9932L7.70784 16.0068L4.56499 12.4068L3.43501 13.3932ZM7.70784 16.9932L9.67213 14.7432L8.54215 13.7568L6.57787 16.0068L7.70784 16.9932ZM11.6364 12.4932L13.6007 10.2432L12.4707 9.25676L10.5064 11.5068L11.6364 12.4932ZM13.6007 10.2432L15.565 7.99324L14.435 7.00676L12.4707 9.25676L13.6007 10.2432Z" fill="#fff"></path> <path d="M20.0002 7.5625L15.7144 12.0625M11.0002 16L11.4286 16.5625L13.5715 14.3125" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <h1 className='head1 headplaced'>Your order is placed</h1>
                    <Link onClick={SettingBackTheThings} to='/' className='linktohome'>Continue shopping</Link>
                </div>

            }

            <div className='carthead flex flex-3 pad16'>
                <h1 className='head1'>Cart</h1>
            </div>
            {Loader &&
                <LoaderComp msg="Please wait, we are processing your payment"/>
            }
            {!Loader &&
                <div className='cartItems flex flex-dir gap16 pad16'>
                    {extractedCart?.map(el=>
                        <div className='cartrbox flex flex-dir pad16 gap16'>
                            <div className='leftbox flex flex-3 gap8'>
                                <img src={mock} className='smallIcon' alt='icon'/>
                                <div className='cartval flex flex-dir gap16'>
                                    <p className='namevart'>{el.item.name}</p>
                                    <p className='cartProce'>₹{el.item.price}/-</p>
                                </div>
                            </div>
                            <hr/>
                            <div className='grid grid-2-col gap16'>
                                <p className='unitscart'>Quantity &mdash; {el.creds.units}</p>
                                <p className='unitscart'>Color &mdash; {el.creds.color}</p>
                                <p className='unitscart'>Size &mdash; {el.creds.size}</p>

                            </div>
                            <div className='flex flex-3 gap16'>
                                <Link to={`/product/${el.item._id}`} className='linkpro' >See product</Link>
                                <button onClick={(event)=> DeleteItem(event, el.item._id)} className='deleteBtn'>Remove</button>
                            </div>
                        </div>
                    )}

                    <div className='cartBilling pad16 flex flex-dir gap16'>
                        <p className='grossBill'>Number of items &mdash; <span>{extractedCart.length}</span></p>
                        <p className='grossBill'>Gross bill &mdash; <span>₹{gross_bill}/-</span></p>
                        <p className='grossBill'>Tax &mdash; <span>{tax}% (₹{tax * gross_bill/100}/-) </span></p>
                        <p className='grossBill'>Total bill &mdash; <span>₹{total}/-</span></p>
                        {Auth 
                            ?
                            <Link to='/auth' className='placeOrderBtn'>Login to place order</Link>
                            
                            :
                            <div className='pays flex flex-1 gap16'>
                                <button onClick={PlacingOrder} className='placeOrderBtn'>Place COD order</button>
                                <button onClick={payOnline} className='placeOrderBtn'>Pay via online</button>

                            </div>

                        }
                    </div>

                </div>
            }
            
        </div>
    )
}


export default Cart