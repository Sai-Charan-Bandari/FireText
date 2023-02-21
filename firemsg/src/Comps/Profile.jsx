import React from 'react'
import { useRecoilValue } from 'recoil'
import { user } from '../Recoil/Atoms'
import Logout from './Logout'

export default function Profile() {
    const userName=useRecoilValue(user)
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
