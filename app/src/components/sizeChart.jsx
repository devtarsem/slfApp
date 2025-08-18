import './../util/util.css'
import './../styles/explore.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import heart from '/heart.png'
import heart1 from '/heart1.png'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productStore from '../store/products.store';
import { usePop } from '../hook/usePop';
import chest from '/chest.png'
import sholder from '/sholder.png'
import length from '/length.png'
import sleeve from '/sleeve.png'
import click from '/click.png'
import close from '/close.png'




import SizesTable from '../assets/sizes';


function Sizes(){

    const {CloseSizeChart} = productStore()

    const [size, setSize] = useState("M")
    const [sizeExtract, setSizeExtract] = useState({})


    function AdjustSize(event, val){
        setSize(size=> val)
        SizesTable.forEach(el=>{
            if(el[0]==val){
                setSizeExtract(sizeExtract=> el[1])
            }
        })
        setCatagory(catagory=> '')
    }

    const [catagory, setCatagory] = useState("")
    const [sizeval, setSizeval] = useState(0)


    function AdjustCatagory(event, val){
        setCatagory(catagory=> val)
        if(val=='Chest'){
            setSizeval(sizeval=> sizeExtract.chest)
        }
        if(val=='Length'){
            setSizeval(sizeval=> sizeExtract.Lenght)
        }
        if(val=='Sholder'){
            setSizeval(sizeval=> sizeExtract.Sholder)
        }
        if(val=='Sleeve'){
            setSizeval(sizeval=> sizeExtract.Sleeve)
        }
    }

    function Close(){
        CloseSizeChart()
    }

    

    return(
        <div className='sizeChart '>
            <div className='carthead flex flex-1 pad16'>
                <h1 className='head1'>Size chart</h1>
                <button onClick={Close} className='closebarBtn'>
                    <img src={close} alt='close' className='closeImg'/>
                </button>
            </div>
            <div className='grid grid-5-col'>
                <div className='navs flex flex-3 flex-dir gap16 pad16'>
                    {["M", "L", "S", "XL", "XXL"].map(el=>
                        <button onClick={(event)=> AdjustSize(event, el)} className={size==el ? 'btnSize btnSizeColor' : 'btnSize'}>{el}</button>
                    )}
                </div>
                <div className='dsiplaysizes '>
                    <div className='innerNav grid grid-4-col '>
                        {["Chest", "Length", "Sholder", "Sleeve"].map(el=>
                            <button onClick={(event)=> AdjustCatagory(event, el)} className={catagory==el ? 'btnSize btnSizeColor smallSize' : 'btnSize smallSize'}>{el}</button>
                        )}
                    </div>
                    <div className='sizeelemets flex flex-3 flex-dir gap16 pad16'>
                        {catagory == '' &&
                            <>
                                <img src={click} className='clickimg' alt='measure scale'/>
                                <p className='sizeInfo'>Select body part</p>
                            </>
                        }
                        {catagory == 'Chest' &&
                            <>
                                <img src={chest} className='catagoryImg' alt='measure scale'/>
                                <p className='sizeInfo'>{sizeval} inches</p>
                            </>
                        }
                        {catagory == 'Sholder' &&
                            <>
                                <img src={sholder} className='catagoryImg' alt='measure scale'/>
                                <p className='sizeInfo'>{sizeval} inches</p>
                            </>
                        }
                        {catagory == 'Length' &&
                            <>
                                <img src={length} className='catagoryImg' alt='measure scale'/>
                                <p className='sizeInfo'>{sizeval} inches</p>
                            </>
                        }
                        {catagory == 'Sleeve' &&
                            <>
                                <img src={sleeve} className='catagoryImg' alt='measure scale'/>
                                <p className='sizeInfo'>{sizeval} inches</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sizes