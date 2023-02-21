import React from 'react'
import {app} from '../App'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useSetRecoilState } from 'recoil';
import {user} from '../Recoil/Atoms'
import { useNavigate ,Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


export default function Login() {
  const auth = getAuth(app);
  const setUserName=useSetRecoilState(user)
  const nav=useNavigate()

    function submitVal1(){
        // let e=document.getElementsByTagName('input')[0].value
        // let p=document.getElementsByTagName('input')[1].value
        // console.log(e)
        // console.log(p)
        signInWithEmailAndPassword(auth,'charan@gmail.com', 'Charan@12345')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log('logged in u1')
      setUserName({
        // user.email.substring(0,user.email.length-10), for setting username
        email:user.email,
        uid:user.uid
      })
      nav('/main')
    })
    .catch((error) => {
      console.log(error)
    });
    }

    function submitVal2(){
        // let e=document.getElementsByTagName('input')[0].value
        // let p=document.getElementsByTagName('input')[1].value
        // console.log(e)
        // console.log(p)
        signInWithEmailAndPassword(auth,'bsc@gmail.com','Bsc@12345')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log('logged in u2')
      setUserName({
        email:user.email,
        uid:user.uid
      })
      nav('/main')
    })
    .catch((error) => {
      console.log(error)
    });
    }

    function submitVal3(){
        // let e=document.getElementsByTagName('input')[0].value
        // let p=document.getElementsByTagName('input')[1].value
        // console.log(e)
        // console.log(p)
        signInWithEmailAndPassword(auth,'csb@gmail.com','Csb@12345')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log('logged in ',user.email)
      setUserName({
        email:user.email,
        uid:user.uid
      })
      nav('/main')
    })
    .catch((error) => {
      console.log(error)
    });
    }

  return (
    <div className='my-5'>
    <h2 className='p-3 m'>Login</h2>
    <Stack className='p-4 rounded my-2 col-lg-4 col-10 mx-auto' style={{backgroundColor:'#060644'}} gap={3}>
    <Form.Control type={'text'} placeholder='email' />
    <Form.Control type={'text'} placeholder='password' />
    <Button variant="secondary" onClick={submitVal1}>submit</Button>
    {/* <Button variant="secondary" onClick={submitVal2}>submit2</Button> */}
    {/* <Button variant="secondary" onClick={submitVal3}>submit3</Button> */}
    </Stack>
    <div variant="outline-secondary" >
      <Link className='fs-4' to='/signup'>New User ? Goto SignUp</Link>
    </div>
    </div>
  )
}
