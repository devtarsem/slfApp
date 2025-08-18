import './../util/util.css'
import './../styles/auth.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import heart from '/heart.png'
import { useEffect, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';
import productStore from '../store/products.store';
import auth from '/auth.jpg'
import { useNavigate } from 'react-router-dom';
import LoaderComp from './loader';
import Swal from 'sweetalert2'
import { usePop } from '../hook/usePop';

function Auth(){
    const {AccountOpening, Auth, Loader, LoginToAccount} = productStore()
    const [authBool, setAuthBool] = useState(true)
    const navigate = useNavigate()

    // useEffect(el=>{
    //     navigate("/cart")
    // }, [])

    function AuthToggle(){
        setAuthBool(authBool=> !authBool)
    }

    const name  = createRef()
    const email  = createRef()
    const phone  = createRef()
    const password  = createRef()
    const Conpassword  = createRef()
    const city  = createRef()
    const state  = createRef()
    const landmark  = createRef()
    const pincode  = createRef()
    const address  = createRef()

    const LoPhone  = createRef()
    const LoPassword  = createRef()

    // function Pop(title, description){
    //     Swal.fire({
    //         title: title,
    //         text: description,
    //         icon: 'error',
    //         confirmButtonText: 'close'
    //     })
    // }

    const {Pop} = usePop()
    

    function OpenAccount(){

        if(name.current.value == ''){
            Pop("Invalid", "please fill name first")
            return
        }
        if(email.current.value == ''){
            Pop("Invalid", "please fill email first")
            return
        }
        if(phone.current.value.trim().length != 10){
            Pop("Invalid", "Phone number must be off 10 digit long")
            return
        }
        if(password.current.value.trim().length < 8){
            Pop("Invalid", "Password must be 8 digit long")
            return
        }
        if(password.current.value != Conpassword.current.value){
            Pop("Invalid", "Password and confirm password must be same")
            return
        }
        if(city.current.value == ''){
            Pop("Invalid", "please fill city first")
            return
        }
        if(state.current.value == ''){
            Pop("Invalid", "please fill state first")
            return
        }
        if(pincode.current.value == ''){
            Pop("Invalid", "please fill pincode first")
            return
        }
        if(address.current.value == ''){
            Pop("Invalid", "please fill address first")
            return
        }

        const obj = {
            name : name.current.value,
            email : email.current.value,
            phone : phone.current.value,
            city : city.current.value,
            landmark : landmark.current.value,
            state : state.current.value,
            address : address.current.value,
            password : password.current.value,
            pincode : pincode.current.value
        }

        AccountOpening(obj, navigate)
    }

    function Login(){
        if(LoPhone.current.value.trim().length != 10){
            Pop("Invalid", "Phone number must be off 10 digit long")
            return
        }
        if(LoPassword.current.value.trim().length < 8){
            Pop("Invalid", "Password must be 8 digit long")
            return
        }
        const log = {
            phone : LoPhone.current.value,
            password : LoPassword.current.value
        }
        LoginToAccount(log, navigate)
        
    }

    return(
        <div className='auth pad16 flex flex-dir gap16'>
            <img src={auth} className='authimg' alt='auth'/>
            <div className='authcpnt flex flex-dir gap16'>
                <h1 className='head1 center'>Just one more step</h1>
                <div className='flex flex-1 gap16'>
                    <button onClick={AuthToggle} className={authBool ? 'authBtn authBtnActive' : 'authBtn'}>SignUp</button>
                    <button onClick={AuthToggle} className={authBool ? 'authBtn ' : 'authBtn authBtnActive'}>Login</button>
                </div>

                {Loader &&
                    <div className='flex flex-2 flex-dir gap16'>
                        <LoaderComp msg="Please wait, we are prcessing your request."/>
                    </div>
                }

                {(authBool && !Loader) &&
                    <div className='authSignUp flex flex-dir gap16'>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Name</label>
                            <input ref={name} className='inp' placeholder='Name' type='text'/>
                        </div>
                        <div className='grid grid-2-col gap16'>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>Email</label>
                                <input ref={email} className='inp' placeholder='Email' type='Email'/>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>Phone</label>
                                <input ref={phone} className='inp' placeholder='Phone' type='Number'/>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>Password</label>
                                <input ref={password} className='inp' placeholder='Password' type='Password'/>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>Confirm password</label>
                                <input ref={Conpassword} className='inp' placeholder='Confirm password' type='Password'/>
                            </div>
                        </div>
                        <div className='grid grid-2-col gap16'>
                            <div className='authcover flex flex-dir gap8'>
                                <label className='label'>City</label>
                                <input ref={city} className='inp' placeholder='City' type='text'/>
                            </div>
                            <div className='authcover flex flex-dir gap8'>
                                <label className='label'>State</label>
                                <input ref={state} className='inp' placeholder='State' type='text'/>
                            </div>
                            <div className='authcover flex flex-dir gap8'>
                                <label className='label'>Landmark</label>
                                <input ref={landmark} className='inp' placeholder='Landmark' type='text'/>
                            </div>
                            <div className='authcover flex flex-dir gap8'>
                                <label className='label'>Pincode</label>
                                <input ref={pincode} className='inp' placeholder='Pincode' type='Number'/>
                            </div>
                            <div className='address authcover flex flex-dir gap8'>
                                <label className='label'>Address</label>
                                <input ref={address} className='inp' placeholder='address' type='text'/>
                            </div>
                        </div>
                        <button onClick={OpenAccount} className='authBtn authcover authBtnActive auth__'>Open your account</button>
                    </div>
                }

                {(!authBool && !Loader) &&
                    <div className='login flex flex-dir gap16'>
                        <div className='address authcover flex flex-dir gap8'>
                            <label className='label'>Phone</label>
                            <input ref={LoPhone} className='inp' placeholder='Phone' type='Number'/>
                        </div>
                        <div className='address authcover flex flex-dir gap8'>
                            <label className='label'>Password</label>
                            <input ref={LoPassword} className='inp' placeholder='Password' type='Password'/>
                        </div>
                        <button onClick={Login} className='authBtn authcover authBtnActive auth__'>Login your account</button>

                    </div>
                }

            </div>
        </div>
    )
}

export default Auth