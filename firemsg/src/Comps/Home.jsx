import React from 'react'
import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import MainPage from './MainPage'

export default function Home() {
    const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
        <Routes >
            <Route path='/' element={<Login />}></Route>
            <Route path='/main' element={<MainPage />}></Route>
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