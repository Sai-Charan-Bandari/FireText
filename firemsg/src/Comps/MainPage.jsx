import React, { useEffect } from 'react'
import Messages from './Messages'
import { useRecoilValue } from 'recoil';
import { user } from '../Recoil/Atoms';
import { useNavigate } from 'react-router-dom';
import FrndList from './FrndList';
import Stack from 'react-bootstrap/Stack';

export default function MainPage() {
  const userName=useRecoilValue(user)
  const nav=useNavigate()
  useEffect(()=>{
      if(userName.email=='') nav('/')
  },[])

// FOR BIG SCREENS THE FRNDLIST AND MESSAGES COMP MUST BE DISPLAYED TOGETHER

  return (
    <>
    {/* <div>{userName.email}</div> */}
    <Stack className='col-12 mx-auto' gap={3}>
    <FrndList />
    {/* <div>
    <Messages />
    </div> */}
    </Stack>
    </>
  )
}
