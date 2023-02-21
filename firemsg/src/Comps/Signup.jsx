import React from 'react'
import {app} from '../App'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useSetRecoilState } from 'recoil';
import {user} from '../Recoil/Atoms'
import { useNavigate ,Link} from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

export default function Signup() {
  const auth = getAuth(app);
  const setUserName=useSetRecoilState(user)
  const nav=useNavigate()

    function submitVal(){
        let e=document.getElementsByTagName('input')[0].value
        let p=document.getElementsByTagName('input')[1].value
        // console.log(e)
        // console.log(p)
        createUserWithEmailAndPassword(auth,e,p)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      try{
        //setting up user in firestore
        await setDoc(doc(db, "Users", user.uid), {
           email:e,
           password:p,
           frnds:[]
          });
          setUserName({
            // user.email.substring(0,user.email.length-10), for setting username
            email:user.email,
            uid:user.uid
          })
          nav('/main')
      }catch(e){
          console.log(error)
      }
    })
    .catch((error) => {
      console.log(error)
    });
    }

  return (
    <div className='my-5'>
    <h2 className='p-3'>Signup</h2>
    <Stack className='p-4 rounded my-2 col-lg-4 col-10 mx-auto' style={{backgroundColor:'#060644'}} gap={3}>
    <Form.Control className='w-12' type={'text'} placeholder='email' />
    <Form.Control className='w-12' type={'text'} placeholder='password' defaultValue='Abc@12345'/>
    <Button variant="secondary" onClick={submitVal}>submit</Button>
    </Stack>
    <div variant="outline-secondary" >
      <Link className='fs-4' to='/'>Already registered ? Goto Login</Link>
    </div>
    </div>
  )
}
