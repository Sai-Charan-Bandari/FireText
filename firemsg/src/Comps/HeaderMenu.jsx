import React from 'react'
import Navbar from 'react-bootstrap/Navbar';

export default function HeaderMenu() {
  return (
    <Navbar style={{backgroundColor:'#060644',position:'relative',top:0,left:0}} className='col-12'>
        <Navbar.Brand href="https://github.com/Sai-Charan-Bandari/FireText" style={{color:'white',fontFamily:"'Sansita', sans-serif",fontSize:25}}>
            <img className='img-fluid' style={{marginLeft:6,marginRight:4}} width={50} src='logo.png'></img>
            FireText
        </Navbar.Brand>
            <img className='img-fluid' style={{marginLeft:'auto',marginRight:20}} width={30} src='user.png'></img>
    </Navbar>
  )
}
