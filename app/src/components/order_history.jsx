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
import close from '/close.png'

import LoaderComp from './loader';


function OrderHistory(){

    const {order_history, SKUOrdercancellation,OrdersHistory, PaymentModeWhileReturning, setConfrimPanelOpen , setConfrimPanelClose, Loader,confirmRetunsPanel, orderCancellation, nonCancelOrders,order_history_count} = productStore()

    useEffect(el=>{
        OrdersHistory()
        console.log(order_history)
    }, [])

    // useEffect(el=>{
    //     order_history_count(order_history)
    // }, [])

    function Cancel_order(event, id){
        orderCancellation(id)
    }

    const [order_id, setOrder_id] = useState('')
    const [sku_id, setsku_id] = useState('')


    function openPanelConfirmation_of_returns(el, payment, orderID, skuID){
        console.log(payment)
        setOrder_id(order_id=> orderID)
        setsku_id(sku_id=> skuID)

        if(payment==''){
            setConfrimPanelOpen("COD")
        }else{
            setConfrimPanelOpen("ONLINE")
        }
    }

    function closeConfirmReturnPanel(){
        setConfrimPanelClose()
    }

    function confirmCancellation(){
        SKUOrdercancellation(order_id, sku_id)
    }

    return(
        <div className='orders orders_history_com'>
            {confirmRetunsPanel &&
                <div className='returnConfirmation flex pad16 flex-dir gap16'>
                    <div className='flex flex-1'>
                        <h2 className='cofirmHead'>Confirm return</h2>
                        <button onClick={closeConfirmReturnPanel} className='closebarBtn'>
                            <img src={close} alt='close' className='closeImg'/>
                        </button>
                    </div>
                    <p className='batchMode'>Payment mode : <span>{PaymentModeWhileReturning}</span></p>
                    {PaymentModeWhileReturning == 'ONLINE' &&
                        <p className='desReutnr'>Your amount will be refunded in 4-5 business days.</p>
                    }
                    {PaymentModeWhileReturning == 'COD' &&
                        <div className='refundAcc flex flex-dir gap16'>
                            <p className='desReutnr'>Add Bank for receiving refund</p>

                            <div className='flex flex-dir gap8'>
                                <label className='label'>Bank account number</label>
                                <input className='inp' type='number' placeholder='647884.....'/>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>IFSC code</label>
                                <input className='inp' type='text' placeholder='647884.....'/>
                            </div>
                        </div>
                    }
                    {Loader &&
                        <LoaderComp msg="Confirming your return, please wait"/>
                    }
                    <button onClick={confirmCancellation} className='refundBtn'>Confirm return</button>
                </div>
            }


            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>Order history</h1>
            </div>
            <div className='history flex flex-dir gap16 pad16'>
                {Loader &&
                    <LoaderComp msg="Loading Orders"/>
                }
                {(nonCancelOrders == 0 && !Loader) &&
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
                                    <p className='orderdet billhis'>Gross bill &mdash; <span>₹{el.gross_bill.toFixed(2)}/-</span></p>
                                    <p className='orderdet billhis'>Tax &mdash;<span>₹{el.tax.toFixed(2)}/-</span></p>
                                    <p className='orderdet billhis'>Total bill &mdash; <span>₹{el.total_bill.toFixed(2)}/-</span></p>
                                </div>

                                <div className='flex flex-3 gap16'>
                                    <button className='cancelBtn'>Items</button>
                                </div>
                                <div className='orderDetails flex flex-dir gap8'>
                                    {el.order_items.map(item=>
                                        <div className={item.return ? 'ordersku opus' : 'ordersku'}>
                                                <div className='ordeIte grid grid-2-col gap8 pad8'>
                                                    <div className='detsailoforder flex flex-dir gap8'>
                                                        <p className='orId orIdSKU'><span>{item.name}</span></p>
                                                        <p className='orId'>Color &mdash; <span>{item.color}</span></p>
                                                        <p className='orId'>Quanity &mdash; <span>{item.count}</span></p>
                                                        <p className='orId'>Size &mdash; <span>{item.size}</span></p>
                                                        {!item.return &&
                                                            <button onClick={(event)=> openPanelConfirmation_of_returns(event,el.razorpay_payment_id, el._id, item._id)} className='cancelIndbtn'>Return Item</button>
                                                        }
                                                        {item.return &&
                                                            <button className='cancelledIndbtn'>cancelled</button>
                                                        }
                                                    </div>
                                                <Link to={`/product/${item.id}`} className='odlink'>
                                                    <div className='skuimg'>
                                                        <img src={item?.image[0]} className='mockImgOfOrder' alt='sku image'/>
                                                    </div>                                                                                          
                                                </Link>                                                                                                                                                                                                                                                                                                                                                      
                                                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                                        </div>
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