import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    let nav=useNavigate()
  return (
        <button className='col-1' style={{backgroundColor:'transparent',border:'none',float:'left'}} onClick={()=>nav(-1)}><img style={{width:'20px'}} src="https://cdn-icons-png.flaticon.com/128/8637/8637590.png" alt="<" /></button>
  )
}
