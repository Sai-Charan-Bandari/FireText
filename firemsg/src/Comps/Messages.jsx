import React, { useEffect, useState } from 'react'
import {rdb } from '../App'
import {child, get, onValue, ref, set, update } from "firebase/database";
import { frnd, messageArray, user } from '../Recoil/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default function Messages() {
    let [msgArr,setmsgArr]=useRecoilState(messageArray) 
    let frndName=useRecoilValue(frnd)
    let [text,settext]=useState('')
    const userName=useRecoilValue(user)

// //   READ ONCE AT START

    useEffect(()=>{

    // // SNAP
    if(userName.email!='' && frndName.email!=''){ //frndName obj is empty => frndslist is empty
    console.log("frnd naem is ",frndName)
        const sRef = ref(rdb, `chats`);
        // onValue will be called whenever a snapshot is generated in chats/ irrespective of change in frndName
        //but due to useeffect the frndName in the onValue func will be update whenever it changes
    onValue(sRef, (snapshot) => {
        // console.log("useername",userName.uid)
        // console.log("frndnaame",frndName.uid)
        let url = userName.uid > frndName.uid ? userName.uid+frndName.uid : frndName.uid+userName.uid
        // console.log("useeffect url",url)

      const data = snapshot.val();
      setmsgArr(data[url])
    //   console.log("useeffect data",data)
      console.log("useeffect data url",data[url])
    });
    }
    //it is observed that if we did not set this useEffect for frndName then the frndName in onValue func did not get updated
    },[frndName])

const addMsg = (text) => {
    let url = userName.uid > frndName.uid ? userName.uid+frndName.uid : frndName.uid+userName.uid
    update(ref(rdb,`/chats/${url}`),{
        [msgArr.length]:{text:text, email:userName.email}
    })
  };

// const getMsgs=()=>{
//     let dbref=ref(rdb)
//             console.log("payh is : ",`chats/${url}`)
//             get(child(dbref, `chats/${url}`)).then((snapshot) => {
//                     if (snapshot.exists()) {
//                         const data = snapshot.val();
//                         setmsgArr(data)
//                         console.log("fetched value is ",data)
//                         } else {
//                               console.log("No data available");
//                             }
//                           }).catch((error) => {
//                                 console.error(error);
//                               });
// }  

    return (
      // <h2 className='p-3'>Signup</h2>
    // <Stack className='p-4 rounded my-2 col-lg-4 col-10 mx-auto' style={{backgroundColor:'#060644'}} gap={3}>
    // <Form.Control className='w-12' type={'text'} placeholder='email' />
    // <Form.Control className='w-12' type={'text'} placeholder='password' defaultValue='Abc@12345'/>
    // <Button variant="secondary" onClick={submitVal}>submit</Button>
    // </Stack>
    // <div variant="outline-secondary" >
    //   <Link className='fs-4' to='/'>Already registered ? Goto Login</Link>
    // </div>
    // </div>
      <div className='m-3'>
    <h2 className='p-3'>Messages</h2>
    {frndName.email!=''
    ?
    <>
    <div className='p-4 rounded my-2 col-lg-8 col-10 mx-auto' style={{backgroundColor:'#060644'}}>{msgArr.map((e,i)=>
      <Button className='my-1' key={i} style={e.email==userName.email ? {float:'right',backgroundColor:'#060644',color:'white',clear:'both'} : {float:'left',backgroundColor:'white',color:'#060644',clear:'both'}}>{e.text}</Button>
    )}</div>
    {/* input and search */}
    <Stack direction="horizontal" gap={3}>
      <div className="vr" />
      <Button variant="outline-danger">Reset</Button>
      <Form.Control className="me-auto" style={{clear:'both'}} value={text} onChange={(e)=>settext(e.target.value)}/>
      <Button variant="secondary"  onClick={()=>{
        addMsg(text)
        settext('')
    }}>Submit</Button>
    </Stack>
    </>
    :
    <div>No frnds... pls add some</div>
    }
    </div>
  )
}
