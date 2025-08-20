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
import noProd from "/noProd.svg"


function Refunds(){

    const {OrdersHistory, order_history, Loader, cancelled_SKU, cancelledSKUFetching} = productStore()

    useEffect(el=>{
        // OrdersHistory()
        cancelledSKUFetching()
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
                {(cancelled_SKU?.length == 0 && !Loader) &&
                    <div className='flex noProdFound flex-2 flex-dir gap32'>
                        <img src={noProd} className='noProd' alt='no orders'/>
                        <p className='noProdtitle'>No refunds are pending</p>
                    </div>
                }
                
                <div className='flex flex-dir gap16'>
                    {cancelled_SKU?.map(el=>
                        <div className='skucancel grid grid-2-col gap16 pad16'>
                            <div className='contentSku flex flex-dir gap8 '>
                                <p className='orId orIdSKU'><span>{el.name}</span></p>
                                <p className='orId'>Color &mdash; <span>{el.color}</span></p>
                                <p className='orId'>Quanity &mdash; <span>{el.count}</span></p>
                                <p className='orId'>Size &mdash; <span>{el.size}</span></p>
                            </div>
                            <div className='contentSku '>
                                <Link to={`/product/${6556}`} className='odlink'>
                                    <div className='skuimg'>
                                        <img src={mock} className='mockImgOfOrder' alt='sku image'/>
                                    </div>                                                                                          
                                </Link>   
                            </div>
                            <p className='refundStatus orId'>Refund status &mdash; <span className={el.refund == 'Pending' ? "redStatus": "GreenStatus"} >{el.refund}</span></p>
                        </div>
                    )}
                </div>
                    
            </div>
        </div>
    )
}

export default Refunds