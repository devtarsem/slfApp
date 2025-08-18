import './../util/util.css'
import './../styles/refunds.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'
import LoaderComp from './loader';
import noTic from '/noticket.svg'

function Refunds(){

    const {OrdersHistory, order_history, Loader} = productStore()

    useEffect(el=>{
        OrdersHistory()
    }, [])

    const [zeroCancellation, setZeroCancellation] = useState(false);

    useEffect(res=>{
        let count = 0;
        order_history.forEach(el=>{
            if(el.cancel_status == 'cancelled'){
                count++;
            }
        })
        if(count == 0){
            setZeroCancellation(zeroCancellation=> true)
        }else{
            setZeroCancellation(zeroCancellation=> false)

        }
    }, [])

    return(
        <div className='refunds'>
            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>Refunds</h1>
            </div>
            <div className='refundsOrders pad16 flex flex-dir gap16'>
                {Loader &&
                    <LoaderComp msg="Loading your refunds & returns"/>
                }
                {zeroCancellation &&
                    <div className='noTickets flex flex-dir gap16 flex-2'>
                        <img src={noTic} className='noTicket' alt='no tickets found'/>
                        <p className='noticfound'>No refund / return orders</p>
                    </div>
                }
                {order_history?.map(el=>
                    <>
                    {el.cancel_status == 'cancelled' &&
                        <div className='orderCode pad16 flex flex-dir gap8'>
                            <div className='datedesign'>
                                <p className='dateeedes'>Order Date &mdash; {el.created_at}</p>
                            </div>
                            <div className='flex flex-1'>
                                <p className='orderdet'>Number of items &mdash; <span>{el.order_items.length}</span></p>
                                <button className='cancelBtn'>Order cancelled</button>
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
                            <div className='flex flex-3 gap16'>
                                <button className='cancelBtn'>Refund status &mdash; refunded</button>
                            </div>
                        </div>
                    }
                    </>
                )}
            </div>
        </div>
    )
}

export default Refunds