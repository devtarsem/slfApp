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
import darrow from "/darrow.png"
import noProd from "/noProd.svg"

import LoaderComp from './loader';


function OrderHistory(){

    const {order_history, OrdersHistory, Loader, orderCancellation, nonCancelOrders,order_history_count} = productStore()

    useEffect(el=>{
        OrdersHistory()
    }, [])

    // useEffect(el=>{
    //     order_history_count(order_history)
    // }, [])

    function Cancel_order(event, id){
        orderCancellation(id)
    }


    return(
        <div className='orders'>
            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>Order history</h1>
            </div>
            <div className='history flex flex-dir gap16 pad16'>
                {Loader &&
                    <LoaderComp msg="Loading Orders"/>
                }
                {nonCancelOrders == 0 &&
                    <div className='flex noProdFound flex-2 flex-dir gap32'>
                        <img src={noProd} className='noProd' alt='no orders'/>
                        <p className='noProdtitle'>No Orders are there yet!</p>
                    </div>
                }
                {order_history?.map(el=>
                    <>
                        {el.cancel_status != "cancelled" &&
                            <div className='orderCode pad16 flex flex-dir gap8'>
                                <div className='datedesign'>
                                    <p className='dateeedes'>Order Date &mdash; {el.created_at}</p>
                                </div>
                                <div className='flex flex-1'>
                                    <p className='orderdet'>Number of items &mdash; <span>{el.order_items.length}</span></p>
                                    {el.transit_status == "Not dispatched" &&
                                        <button onClick={(event)=> Cancel_order(event,el._id)} className='cancelBtn'>Cancel order</button>
                                    }
                                </div>
                                <p className='orderdet'>Order id &mdash; <span>{el._id}</span></p>
                                <div className='grid grid-1-col gap8'>
                                    <p className='orderdet delspan'>Payment status &mdash; <span>{el.payment_status}</span> </p>
                                    <p className='orderdet delspan'>Transit status &mdash; <span>{el.transit_status}</span></p>
                                    <p className='orderdet  delspan'>Delivery status &mdash; <span>{el.delivery_status}</span></p>
                                </div>
                                <div className='grid grid-2-col gap8'>
                                    <p className='orderdet billhis'>Gross bill &mdash; <span>₹{el.gross_bill}/-</span></p>
                                    <p className='orderdet billhis'>Tax &mdash;<span>₹{el.tax}/-</span></p>
                                    <p className='orderdet billhis'>Total bill &mdash; <span>₹{el.total_bill}/-</span></p>
                                </div>
                                
                                <div className='flex flex-3 gap16'>
                                    <button className='cancelBtn'>Items</button>
                                </div>
                                <div className='orderDetails'>
                                    {el.order_items.map(item=>
                                        <Link to={`/product/${item.id}`} className='odlink'>
                                            <div className='ordeIte grid grid-3-col gap8 pad8'>
                                                <p className='orId orIdSKU'>SKU code &mdash; <span>{item.id}</span></p>
                                                <p className='orId'>Color &mdash; <span>{item.color}</span></p>
                                                <p className='orId'>Quanity &mdash; <span>{item.count}</span></p>
                                                <p className='orId'>Size &mdash; <span>{item.size}</span></p>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderHistory;