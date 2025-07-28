
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/home'
import Explore from './components/explore'
import Details from './components/details'
import Cart from './components/cart'

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
      path : "/product/:id",
      element : <Details/>
    }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
