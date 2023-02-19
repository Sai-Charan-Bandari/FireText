import React from 'react'
import {app} from '../App'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from 'recoil';
import {user} from '../Recoil/Atoms'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const auth = getAuth(app);
  const [userName,setUserName]=useRecoilState(user)
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
      console.log('logged in u1')
      setUserName('u1')
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
      console.log('logged in u2')
      setUserName('u2')
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
      console.log('logged in u3')
      setUserName('u3')
      nav('/main')
    })
    .catch((error) => {
      console.log(error)
    });
    }

  return (
    <div>
    Login
    {userName}
    <input type={'text'} name='email' />
    <input type={'text'} name='password' />
    <button onClick={submitVal1}>submit1</button>
    <button onClick={submitVal2}>submit2</button>
    <button onClick={submitVal3}>submit3</button>
    </div>
  )
}
