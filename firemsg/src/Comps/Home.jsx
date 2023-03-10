import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import Login from './Login'
import MainPage from './MainPage'
import Messages from './Messages'
import Profile from './Profile'
import Signup from './Signup'

export default function Home() {
  return (
    <BrowserRouter>
    <HeaderMenu />
        <Routes >
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/main' element={<MainPage />}></Route>
            <Route path='/msg' element={<Messages />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='*' element={<PgNotFound />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

function PgNotFound(){
    return(
        <div>Pg not found</div>
    )
}