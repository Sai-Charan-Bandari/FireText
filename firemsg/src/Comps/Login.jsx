import React, { useEffect, useState } from 'react'
import {app} from '../App'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {useRecoilState } from 'recoil';
import {user} from '../Recoil/Atoms'
import { useNavigate ,Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


export default function Login() {
  const auth = getAuth(app);
  const [userName,setUserName]=useRecoilState(user)
  const nav=useNavigate()
  const [loading,setloading]=useState(true)
  useEffect(()=>{
    if(userName.email!=''){
      nav('/main')
    }else{
    onAuthStateChanged(auth,(u)=>{
      console.log("called auth.............")
      if(u){
        console.log("user is ",u)
        setUserName({email:u.email,uid:u.uid})
        nav('/main')
      }else{
        console.log("user is not found",u)
      }
      setloading(false)
    })
  }
  },[])

    function submitVal(){
        let e=document.getElementsByTagName('input')[0].value
        let p=document.getElementsByTagName('input')[1].value
        console.log(e)
        console.log(p)
        signInWithEmailAndPassword(auth,e,p)
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
      alert("login error")
    });
    }

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
      alert("login error")
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
      alert("login error")
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
      alert("login error")
    });
    }

  return (
    <div className='my-5'>
    <h2 className='p-3 m'>Login</h2>
    <Stack className='p-4 rounded my-2 col-lg-4 col-10 mx-auto' style={{backgroundColor:'#060644'}} gap={3}>
    <Form.Control type={'text'} placeholder='email' required/>
    <Form.Control type={'text'} placeholder='password' required/>
    <Button variant="secondary" onClick={submitVal} disabled={loading}>{!loading ? 'submit' : 
    <div class="spinner-border text-dark" role="status">
</div>}</Button>
    {/* <Button variant="secondary" onClick={submitVal1}>submit</Button> */}
    {/* <Button variant="secondary" onClick={submitVal2}>submit2</Button> */}
    {/* <Button variant="secondary" onClick={submitVal3}>submit3</Button> */}
    </Stack>
    <div variant="outline-secondary" >
      <Link className='fs-4' to='/signup'>New User ? Goto SignUp</Link>
    </div>
    </div>
  )
}
