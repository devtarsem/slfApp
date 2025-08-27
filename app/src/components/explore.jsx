import './../util/util.css'
import './../styles/explore.css'
import './../styles/media.css'

import { Link } from 'react-router-dom';
import mock from '/mock1.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState, createRef } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'
import LoaderComp from './loader';


function Explore(){
    const {homeProducts, cart, Loader, cacheWatchList, resetFilters ,filterByPrice, filterByColor, filterBySize ,watchList, watchListIds, watchlistAdditionToSys, cart_item_ids ,settingUpCart, searchProducts,nextProductsToPagination, prevProductsToPagination,allProducts,fetchingProducts,filters, start, end, openFilters, closeFilters} = productStore()

    function searchProd(el){
        console.log("je")
        searchProducts(el.target.value)
        console.log(cart_item_ids)
    }

    useEffect(el=>{
        settingUpCart()
    }, [])
    useEffect(el=>{
        fetchingProducts()
    },[])
    useEffect(el=>{
        cacheWatchList()
    },[])

    const to = createRef()
    const from = createRef()
    const color = createRef()
    const size = createRef()



    function FilterByPrice(){
        filterByPrice(from.current.value, to.current.value)
    }

    function FilterByColor(){
        filterByColor(color.current.value)
    }

    function FilterBySize(){
        filterBySize(size.current.value)
    }

    function ResetFilters(){
        resetFilters()
    }
    

    return(
        <div className='products'>

            <div className='paginationBox flex flex-1 pad16'>
                <p className='pagi'>Products - <span>{start}</span> &mdash; <span>{end}</span> </p>
                <div className='btns flex flex-1 gap16'>
                    <button onClick={prevProductsToPagination} className='nextbtn'>prev</button>
                    <button onClick={nextProductsToPagination} className='nextbtn'>Next</button>

                </div>
            </div>
            
            <div className={filters ?'filtersActive pad16 flex flex-dir gap16' :'filtersInactive pad16 flex flex-dir gap16'}>
                <h2 className='head1'>Filters</h2>
                <div className='filttt flex flex-dir gap16'>
                    <label className='label'>Filter by price</label>
                    <div className='flex flex-3 gap16'>
                        <input ref={from} className='inp inp_border' type='number' placeholder='299'/>
                        <label className='label' >To</label>
                        <input ref={to} className='inp inp_border' type='number' placeholder='999'/> 
                        <button onClick={FilterByPrice} className='Gobtn'>Go</button>
                    </div>
                </div>

                <hr className='filttt' />

                <div className='filttt flex flex-dir gap16'>
                    <label className='label'>Filter by color</label>
                    <div className='flex flex-3 gap16'>
                        <select ref={color} className='inp'>
                            <option className='opt' value="choose color">Choose color</option>
                            {["Pink", "Green","Black", "White","Orange"].map(el=>
                                <option className='opt' value={el}>{el}</option>
                            )}
                        </select>
                        <button onClick={FilterByColor} className='Gobtn'>Go</button>

                    </div>
                </div>

                <hr className='filttt' />


                <div className='filttt flex flex-dir gap16'>
                    <label className='label'>Filter by size</label>
                    <div className='flex flex-3 gap16'>
                        <select ref={size} className='inp'>
                            <option className='opt' value="choose size">Choose size</option>
                            {["XS", "SL","M", "L","XL", "XXL"].map(el=>
                                <option className='opt' value={el}>{el}</option>
                            )}
                        </select>
                        <button onClick={FilterBySize} className='Gobtn'>Go</button>

                    </div>
                </div>

                <button onClick={ResetFilters} className='btnReset'>Reset filters</button>

            </div>
            

            <div className='exploreprods flex flex-1 pad16'>
                <h2 className='head1'>Explore products</h2>
                <Link to='/cart' className='caart'>
                    <p className='cartCount'>{cart?.length}</p>
                    <svg className='smallSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </Link>
            </div>
            
            <div className='catalogProds grid grid-2-col gap16 pad16'>
                <div className='searchboxexplore'>
                    <input onChange={searchProd} className='inp' placeholder='Search' type='text'/>
                </div>
                {Loader &&
                    <div className='loaderEX flex flex-2'>
                        <LoaderComp msg="Loading products"/>
                    </div>
                }
                {(allProducts?.length == 0 && !Loader) &&
                    <div className='noproductsBox flex flex-2 flex-dir gap16'>
                        <svg className='largeSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <p className='noproducts'>No products found <br/>or<br/> product limit excceds</p>
                    </div>
                }
                {allProducts?.map(el=>
                    <Link to={`/product/${el._id}`} className='proddets' >
                        <div className='prod flex flex-dir gap8'>
                            <div className='banner flex flex-2'>
                                <p className='bannerop'>{el.discount}% off</p>
                            </div>
                            {watchListIds?.includes(el._id) &&
                                <img src={heart1} className="smallIcon loveprod" alt='heart'/>

                            }
                            {/* <svg  className='smallSVG ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> */}
                            <img src={el.Images[0]} className='mockups' alt='mockup'/>
                            <div className='pad8 flex flex-dir gap8'>
                                <p className='name'>{el.name.slice(0,15)}...</p>
                                <p className='price'>₹{el.price}/-</p>
                                <p className='name'>{el.rating}⭐({el.review_count}+)</p>

                            </div>
                            {cart_item_ids?.includes(el._id) &&
                                <button className='standardBtn'>Added</button>
                            }
                        </div>
                    </Link>
                )}

            </div>
            <div className='menup'>
                <BillMenu/>
            </div>
        </div>
    )
}

export default Explore