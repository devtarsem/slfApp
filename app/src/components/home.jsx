import './../util/util.css'
import './../styles/home.css'
import cloth from '/tshirt.png'
import pod from '/pod.png'
import order from '/order.png'
// import { Link } from 'react-router'
import { Link } from 'react-router-dom';
import heart1 from '/heart1.png'
import mock from '/mockup.jpg'
import Menu from './menu'
import productStore from '../store/products.store'
import { useEffect, useState } from 'react'
import LoaderComp from './loader'
import newArr from '/newArr.svg'
import LazyImage from './lazy'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
function Home(){

    const {homeProducts, settingUpCart, fetchingProducts, watchListIds, Loader} = productStore()

    useEffect(el=>{
        fetchingProducts()
    },[])

    useEffect(el=>{
        settingUpCart()
    }, [])

    const [status, setStatus] = useState("Loading")


    return(
        <div className="home">
            <div className='topMost'>
                <div className='top pad16 flex flex-dir gap16'>
                    <img  onLoad={()=> setStatus("Loaded")} src={`https://firebasestorage.googleapis.com/v0/b/imageprocess-bb374.firebasestorage.app/o/fabio-alves-eAUE_FmclYE-unsplash.jpg?alt=media&token=bc717a7a-e11d-447c-aec6-0fc65b628ec7`} className='topslider hidden' alt='brand cloths'/>

                    {status == 'Loaded' &&
                        <img  onLoad={()=> setStatus("Loaded")} src={`https://firebasestorage.googleapis.com/v0/b/imageprocess-bb374.firebasestorage.app/o/fabio-alves-eAUE_FmclYE-unsplash.jpg?alt=media&token=bc717a7a-e11d-447c-aec6-0fc65b628ec7`} className='topslider' alt='brand cloths'/>
                    }

                    {status == 'Loading' &&
                        <div className='lazyblur flex flex-2 topslider bg-animate'>
                            <LoaderComp msg="Loading..."/>
                        </div>
                    }

                   
                    <Link to='/explore' className='exploreBtn'>Explore now</Link>
                    <div className='flex flex-1 priority'>
                        <svg className='smallSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.0009 5C13.4331 5 14.8066 5.50571 15.8193 6.40589C16.832 7.30606 17.4009 8.52696 17.4009 9.8C17.4009 11.7691 17.846 13.2436 18.4232 14.3279C19.1606 15.7133 19.5293 16.406 19.5088 16.5642C19.4849 16.7489 19.4544 16.7997 19.3026 16.9075C19.1725 17 18.5254 17 17.2311 17H6.77066C5.47638 17 4.82925 17 4.69916 16.9075C4.54741 16.7997 4.51692 16.7489 4.493 16.5642C4.47249 16.406 4.8412 15.7133 5.57863 14.3279C6.1558 13.2436 6.60089 11.7691 6.60089 9.8C6.60089 8.52696 7.16982 7.30606 8.18251 6.40589C9.19521 5.50571 10.5687 5 12.0009 5ZM12.0009 5V3M9.35489 20C10.0611 20.6233 10.9888 21.0016 12.0049 21.0016C13.0209 21.0016 13.9486 20.6233 14.6549 20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <h1 className='head1'>Skylite fashions</h1>
                        <Link to='/cart' className='homecart' >
                            <p className='homecartCount'>0</p>
                            <svg className='smallSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </Link>
                    </div>
                    <div className='searchbox priority'>
                        <p className='homehaed'>New series is live !</p>
                    </div>
                    {/* <div className='catagory flex flex-2 gap32'>
                        {[["T-shirts", cloth], ["Print on demand", pod], ["Bulk orders", order]].map(el=>
                            <button className='catabtn flex flex-2 flex-dir gap8'>
                                <img src={el[1]} className='catagoryicon' alt='icon'/>
                                <p className='cataName'>{el[0]}</p>
                            </button>
                        )}
                    </div> */}
                </div>
                <div className='middle flex flex-dir pad16 gap16'>
                    <div className='flex flex-1 '>
                        <h2 className='head2home'>Recommended products</h2>
                        <Link to='/explore' className='linkmore'>See more</Link>
                    </div>
                    
                    <div className='productsHome grid grid-2-col gap16'>
                        {Loader &&
                            <div className='loaderGr flex flex-2'>
                                <LoaderComp msg="Loading products"/>
                            </div>
                        }
                        {homeProducts?.map(el=>
                            <Link to={`/product/${el._id}`} className='homelink'>
                                <div className='prod flex flex-dir gap8'>
                                    {watchListIds?.includes(el._id) &&
                                        <img src={heart1} className="smallIcon loveprod" alt='heart'/>
        
                                    }
                                    <div className='banner flex flex-2'>
                                        <p className='bannerop'>{el.discount}% off</p>
                                    </div>
                                    <img src={mock} className='mockups' alt='mockup'/>
                                    <div className='pad8 flex flex-dir gap8'>
                                        <p className='name'>{el.name.slice(0,15)}...</p>
                                        <p className='price'>₹{el.price}/-</p>
                                        <p className='name'>{el.rating}⭐({el.review_count}+)</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <Menu/>
            </div>
        </div>
    )
}


export default Home;