import './../util/util.css'
import './../styles/loader.css'
import { Link } from 'react-router-dom';


function LoaderComp(props){
    return(
        <div className='flex flex-dir flex-2 gap16'>
            <div className='loader'></div>
            <p className='msgLoader'>{props.msg}</p>
        </div>
    )
}


export default LoaderComp