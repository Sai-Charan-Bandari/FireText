import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { user } from '../Recoil/Atoms';
import { useRecoilValue } from 'recoil';

export default function HeaderMenu() {
  let nav=useNavigate()
  const userName=useRecoilValue(user)
  return (
    <Navbar style={{backgroundColor:'#060644',position:'relative',top:0,left:0}} className='col-12'>
        <Navbar.Brand href="https://github.com/Sai-Charan-Bandari/FireText" style={{color:'white',fontFamily:"'Sansita', sans-serif",fontSize:25}}>
            <img className='img-fluid' style={{marginLeft:6,marginRight:4}} width={50} src='logo.png'></img>
            FireText
        </Navbar.Brand>
        {userName.email!='' &&
<Button onClick={()=>nav('/profile')} className='bg-transparent' style={{marginLeft:'auto',marginRight:20,borderWidth:0}}>
            <img className='img-fluid '  width={30} src='user.png'></img>
</Button>}
    </Navbar>
  )
}
