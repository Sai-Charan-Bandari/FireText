import React, { useEffect } from 'react'
import Messages from './Messages'
import { useRecoilValue } from 'recoil';
import { user } from '../Recoil/Atoms';
import { useNavigate } from 'react-router-dom';
import FrndList from './FrndList';

export default function MainPage() {
  const userName=useRecoilValue(user)
  const nav=useNavigate()
  useEffect(()=>{
      if(userName==null) nav('/')
  },[])

  return (
    <>
    <div>MainPage</div>
    <div style={{display:'flex'}}>
    <div>
    <FrndList />
    </div>
    <div>
    <Messages />
    </div>
    </div>
    </>
  )
}
