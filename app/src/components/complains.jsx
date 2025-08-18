import './../util/util.css'
import './../styles/complain.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState, createRef } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'
import darrow from "/darrow.png"



function Complains(){

    const title = createRef()
    const description = createRef()
    const attach = createRef()


    const {raiseTicket} = productStore()

    function Raise(){
        raiseTicket(title.current.value, description.current.value)
        title.current.value = ''
        description.current.value = ''
    }


    return(
        <div className='complain'>
            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>Raise ticket</h1>
            </div>
            <div className='complainForm pad16 flex flex-dir gap16'>
                <div className='flex flex-dir gap8'>
                    <label className='label'>Title</label>
                    <input ref={title} className='inp' type='text' placeholder='Title'/>
                </div>
                <div className='flex flex-dir gap8'>
                    <label className='label'>Description</label>
                    <textarea ref={description} className='inp' type='text' placeholder='Title'/>
                </div>
                {/* <div className='flex flex-dir gap8'>
                    <label className='label'>Attachments (MAX - 2)</label>
                    <input ref={attach} className='inp' type='file' placeholder='Title'/>
                </div> */}
                <button onClick={Raise} className='standardbtn complainBtn'>Submit</button>
            </div>
        </div>
    )
}

export default Complains