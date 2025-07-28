import './../util/util.css'
import './../styles/explore.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import heart from '/heart.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productStore from '../store/products.store';

function Details(){

    const params = useParams()
    const {details_of_product, updatingCart,extracted_item_FromCart ,extratingItemPresentInCartOrNot ,cart_item_ids,fetchDetailsOfProduct, addingItemstoCart} = productStore()

    useEffect(el=>{
        console.log(params)
        fetchDetailsOfProduct(params.id)
        extratingItemPresentInCartOrNot(params.id)
    }, [])

    const [units, setunits] = useState(1)
    const [size, setSize] = useState('')
    const [color, setcolor] = useState('')
    useEffect(el=>{
        setunits(units => extracted_item_FromCart.units ? extracted_item_FromCart.units : 1)
        
    }, [])
    
    useEffect(el=>{
        setSize(size => extracted_item_FromCart.size)
        
    }, [])
    useEffect(el=>{
        setcolor(color => extracted_item_FromCart.color)

    }, [])


    function selectSize(el, sizeVal){
        console.log(sizeVal)
        setSize(size=> sizeVal)
    }


    function selectColor(el, colorval){
        setcolor(color=> colorval)
    }


    function selectUnitsAdd(){
        setunits(units=> units+1)
    }

    function selectUnitsMinus(){
        if(units-1 <= 0){
            return
        }
        setunits(units=> units-1)
    }

    function addingItemToCart(event,id, sku){
        const itemDetails = {
            size : size,
            units : units,
            color : color,
            productId : id,
            sku : sku
        }
        addingItemstoCart(itemDetails)
    }

    function UpdateCart(event, id,sku){
        const itemDetails = {
            size : size,
            units : units,
            color : color,
            productId : id,
            sku : sku
        }
        updatingCart(itemDetails)
    }

    return(
        <div className='details flex flex-dir '>
            <div className='images detailImaages'>
                <div className='flexofDiscont flex flex-2 gap16'>
                    <p className='dos'>{details_of_product?.discount}% off</p>
                </div>
                <img src={mock} className='mockImg' alt='moock'/>
            </div>
            <div className='productDetails flex flex-dir gap16 pad16'>
                <div className='flex gap16'>
                    {details_of_product?.tags?.map(el=>
                        <button className='btns sizesbox tagsbox'>{el}</button>
                    )}
                </div>
                <div className='flex flex-1'>
                    <p className='nameProd'>{details_of_product?.name}</p>
                    <button className='heartbtn'>
                        <img src={heart} className='iconHeart' alt='icon'/>
                    </button>
                </div>
                <p className='Description'>{details_of_product?.description}.</p>
                <div className='flex flex-1'>
                    <p className='nameProd priceProd'>₹{details_of_product?.price}/-</p>
                    <p className='nameProd'>{details_of_product?.review_count}+ ({details_of_product?.rating}⭐)</p>
                </div>
                <div className='sizes flex flex-dir gap8'>
                    <p className='sizes label'>Size</p>
                    <div className='flex gap16'>
                        {details_of_product?.sizes?.map(el=>
                            <button onClick={(event)=> selectSize(event, el)} className={size == el ? 'btns sizesbox activeBoxSize' : 'btns sizesbox'}>{el}</button>
                        )}
                    </div>
                </div>
                <div className='sizes flex flex-dir gap8'>
                    <p className='sizes label'>Color</p>
                    <div className='flex gap16'>
                        {details_of_product?.colors?.map(el=>
                            <button onClick={(event)=> selectColor(event, el)} className={color==el ? 'btns sizesbox activeBoxSize' : 'btns sizesbox'} style={{backgroundColor : el}} ></button>
                        )}
                    </div>
                </div>
                <div className='flex flex-1 gap16'>
                    <div className='unitssets flex flex-1 gap16 pad16'>
                        <button onClick={selectUnitsMinus} className='minus'>
                            &mdash;
                        </button>
                        <p className='units'>{units}</p>
                        <button onClick={selectUnitsAdd} className='add'>
                            <svg className='smallSVG' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                        </button>
                    </div>
                    {extracted_item_FromCart.productId == details_of_product?._id 
                        ?
                        <button onClick={(event) => UpdateCart(event, details_of_product._id, details_of_product.sku)} className='addtocartBtn standardBtn'>Update</button>
                        :
                        <button onClick={(event) => addingItemToCart(event, details_of_product._id, details_of_product.sku)} className='addtocartBtn standardBtn'>Add to cart</button>

                    }
                </div>
            </div>

        </div>
    )
}

export default Details;