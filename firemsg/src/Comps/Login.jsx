import React from 'react'
import {app} from '../App'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useSetRecoilState } from 'recoil';
import {user} from '../Recoil/Atoms'
import { useNavigate ,Link} from 'react-router-dom';

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
    <div>
    Login
    <input type={'text'} name='email' />
    <input type={'text'} name='password' />
    <button onClick={submitVal1}>submit1</button>
    <button onClick={submitVal2}>submit2</button>
    <button onClick={submitVal3}>submit3</button>
    <div>
      <Link to='/signup'>Goto SignUp</Link>
    </div>
    </div>
  )
}
