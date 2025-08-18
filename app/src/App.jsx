
import './App.css'
import './styles/media.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/home'
import Explore from './components/explore'
import Details from './components/details'
import Cart from './components/cart'
import Auth from './components/Auth'
import WatchList from './components/watchList'
import MyAccount from './components/myAccount'
import OrderHistory from './components/order_history'
import Complains from './components/complains'
import Concerns from './components/your_concerns'
import Refunds from './components/refunds'
import Settings from './components/setting'

const router = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    }
    ,
    {
      path : "/explore",
      element : <Explore/>
    }
    ,
    {
      path : "/cart",
      element : <Cart/>
    }
    ,
    {
      path : "/watchlist",
      element : <WatchList/>
    }
    ,
    {
      path : "/auth",
      element : <Auth/>
    }
    ,
    {
      path : "/acc",
      element : <MyAccount/>
    }
    ,
    {
      path : "/Complains",
      element : <Complains/>
    }
    ,
    {
      path : "/Your-concerns",
      element : <Concerns/>
    }
    ,
    {
      path : "/Settings",
      element : <Settings/>
    }
    ,
    {
      path : "/Return-refund",
      element : <Refunds/>
    }
    ,
    {
      path : "/Order-history",
      element : <OrderHistory/>
    }
    ,
    {
      path : "/product/:id",
      element : <Details/>
    }
])

function App() {

  return (
    <div className='App'>

      <RouterProvider  router={router}/>
    </div>
  )
}

export default App
