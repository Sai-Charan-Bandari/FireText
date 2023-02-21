import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { app } from '../App';
import { user } from '../Recoil/Atoms';

export default function Logout() {
    const auth = getAuth(app);
    const setUserName=useSetRecoilState(user)
    const nav=useNavigate()
  return (
    <div>
        <Button onClick={()=>{
signOut(auth).then(() => {
    setUserName({
        email:'',
        uid:''
    })
  nav('/')
}).catch((error) => {
  console.log('error in logging out ',error)
});
        }} style={{backgroundColor:'#060644'}} className='px-5 py-2'>
        Logout
        </Button>
    </div>
  )
}
