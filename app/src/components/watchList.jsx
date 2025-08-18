import './../util/util.css'
import './../styles/watchlist.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'


function WatchList(){

    const {watchList, watchListIds,cacheWatchList} = productStore()

    useEffect(el=>{
        cacheWatchList()
    }, [])

    return(
        <div className='watchlist'>
            <div className='watch flex flex-3 pad16'>
                <h1 className='head1'>Products you love</h1>
            </div>
            <div className='watchlistone grid grid-2-col gap16 pad16'>
                {watchList?.map(el=>
                    <Link to={`/product/${el._id}`} className='watchlink' >
                        <div className='watchbox flex flex-dir gap16'>
                            <div className='imgWatch'>
                                <div className='bannerP flex flex-2'>
                                    <p className='bannerop'>{el.discount}% off</p>
                                </div>
                                {watchListIds?.includes(el._id) &&
                                    <img src={heart1} className='imageDWatch' alt='img'/>
                                }
                                <img src={mock} className='imageD' alt='img'/>
                            </div>
                            <div className='watchdets flex flex-dir gap8 pad16'>
                                <p className='watchname'>{el.name.slice(0,15)}...</p>
                                <p className='watchprice'>₹{el.price}/-</p>
                                <p className='watchrating'>{el.rating }⭐ ({el.review_count}+)</p>

                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default WatchList;