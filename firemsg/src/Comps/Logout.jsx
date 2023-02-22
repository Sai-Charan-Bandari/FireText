import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/esm/Stack';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { app } from '../App';
import { user } from '../Recoil/Atoms';

export default function Logout() {
    const auth = getAuth(app);
    const setUserName=useSetRecoilState(user)
    const nav=useNavigate()
  return (
    <Stack className='col-lg-5 col-9 mx-auto'>
        <Button onClick={()=>{nav('/main');}} style={{backgroundColor:'#060644'}} className='px-5 py-2 my-2'>
       <h5>Goto Friend list</h5>
</Button>
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
        <h5>Logout</h5>
        </Button>
    </Stack >
  )
}
