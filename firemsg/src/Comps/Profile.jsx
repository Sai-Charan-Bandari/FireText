import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { user } from '../Recoil/Atoms'
import Logout from './Logout'

export default function Profile() {
    const userName=useRecoilValue(user)
  const nav=useNavigate()
  useEffect(()=>{
      if(userName.email=='') nav('/')
  },[])
  return (
    <div>
    Profile
    <div>
logged in as {userName.email}
    </div>
    <div>
uid is {userName.uid}
    </div>
    <Logout/>
    </div>
  )
}
