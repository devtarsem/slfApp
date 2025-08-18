import './../util/util.css'
import './../styles/setting.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState, createRef } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'


function Settings(){
    const {SetNewpassword} = productStore()
    const oldPass = createRef()
    const newPass = createRef()
    const ConPass = createRef()

    function setNewPasswordFun(){
        SetNewpassword(oldPass.current.value, newPass.current.value)
    }


    return(
        <div className='settings'>
            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>Settings</h1>
            </div>
            <div className='settingapne pad16 flex flex-dir gap16'>
                <div className='password_reset flex flex-dir gap16'>
                    <label className='label'>Set new password</label>
                    <input ref={oldPass} className='inp' type='password' placeholder='Old password'/>
                    <input ref={newPass} className='inp' type='password' placeholder='New password'/>
                    <input ref={ConPass} className='inp' type='password' placeholder='Confirm password'/>
                    <button onClick={setNewPasswordFun} className='passbtn'>Set new password</button>
                </div>
            </div>
        </div>
    )
}

export default Settings