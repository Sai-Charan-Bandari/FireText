import React from 'react'
import {app} from '../App'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useSetRecoilState } from 'recoil';
import {user} from '../Recoil/Atoms'
import { useNavigate ,Link} from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../App';

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
    <div>
    Signup
    <input type={'text'} name='email' />
    <input type={'text'} name='password' defaultValue='Abc@12345' />
    <button onClick={submitVal}>submit</button>
    <div>
        <Link to='/'>Goto Login</Link>
    </div>
    </div>
  )
}
