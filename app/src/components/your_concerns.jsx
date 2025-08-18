import './../util/util.css'
import './../styles/concerns.css'
import { Link } from 'react-router-dom';
import mock from '/mockup.jpg'
import Menu from './menu'
import BillMenu from './billmenu';
import productStore from '../store/products.store'
import { useEffect, useState, createRef } from 'react'
import heart from '/heart.png'
import heart1 from '/heart1.png'
import LoaderComp from './loader';
import noTic from '/noticket.svg'

function Concerns(){

    const {allTickets, tickets, Loader, SendReplyToTicket} = productStore()

    useEffect(el=>{
        allTickets()
    }, [])

    const reply = createRef()
    function TicketReply(event,  id){
        SendReplyToTicket(reply.current.value, id)
    }


    return( 
        <div className='concerns'>
            <div className='accTop pad16 flex flex-3'>
                <h1 className='head1'>My tickets</h1>
            </div>

            <div className='concernshelp flex flex-dir gap16 pad16'>
                {Loader &&
                    <LoaderComp msg="Loading concerns"/>
                }
                {tickets.length == 0 &&
                    <div className='noTickets flex flex-dir gap16 flex-2'>
                        <img src={noTic} className='noTicket' alt='no tickets found'/>
                        <p className='noticfound'>No ticket found</p>
                    </div>
                }
                {tickets?.map(el=>
                    <div className='tick flex flex-dir gap8'>
                        <div className='statusOfTicket flex flex-2'>
                            <p className='status'>Open</p>
                        </div>
                        <p className='title'><span>Title</span> &mdash; {el.title}</p>
                        <p className='title'><span>Description</span> &mdash; {el.description}</p>
                        <div className='replyPanel flex flex-dir gap8 pad8'>
                            {el?.replies?.map(rep=>
                                <p className='reply title ehanereply'><span className={rep.recipent == 'YOU' ? "": "server"}  >{rep.recipent}</span> &mdash; {rep.reply}.</p>
                            )}
                        </div>
                        <div className='flex flex-1'>
                            <input ref={reply} className='inp' type='text' placeholder='reply'/>
                            <button onClick={(event)=> TicketReply(event, el._id)} className='replybtn'>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Concerns