import React, { useEffect, useRef, useState } from 'react'
import {rdb } from '../App'
import { onValue, ref, update } from "firebase/database";
import { frnd, messageArray, user } from '../Recoil/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import Picker from 'emoji-picker-react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default function Messages() {
  let ref1=useRef() //for scrolling to bottom
    let [msgArr,setmsgArr]=useRecoilState(messageArray) 
    let frndName=useRecoilValue(frnd)
    let [text,settext]=useState('')
    let [showEmoji,setShowEmoji]=useState(false)
    const userName=useRecoilValue(user)
    const nav=useNavigate()
    useEffect(()=>{
        if(userName.email=='') nav('/')
    },[])

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

      //WHENEVER WE RECEIVE A NEW MSG WE WILL SCROLL DOWN
      ref1.current.scrollIntoView({behavior:'smooth'})
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
      <div className='my-2'>
    <h2 className='px-3' style={{wordBreak:'break-all'}}>
      <BackButton/>
    {frndName.email}</h2>
      <hr/>
    {frndName.email!=''
    ?
    <div  className='px-4 rounded my-2 col-lg-10 col-12 mx-auto h-50' >
    {/* id is assigned to hide scroll bar */}
   <div id='scr'> 
   {msgArr.map((e,i)=>
      <Button ref={ref1} className='my-1' key={i} style={e.email==userName.email ? {float:'right',backgroundColor:'#060644',color:'white',clear:'both'} : {float:'left',backgroundColor:'white',color:'#060644',clear:'both'}}>{e.text}</Button>
    )}
    </div>
    {/* input and search */}
      {showEmoji && <Picker width={300} onEmojiClick={(emojiObject,event) => addMsg(emojiObject.emoji)}/>}
    <Stack className='col-lg-10 col-8 my-2' direction="horizontal" gap={2} style={{clear:'both'}}>
      <Button className='col-2 col-lg-1 px-0' variant="outline-danger" onClick={()=>setShowEmoji(!showEmoji)}><img width={20} height={20} src="https://cdn-icons-png.flaticon.com/128/3106/3106048.png" alt="" /></Button>
      <Form.Control className="me-auto col-lg-7 col-6" style={{clear:'both'}} value={text} onChange={(e)=>settext(e.target.value)}  
      onKeyDown={(event)=>{
      if (event.key === 'Enter'){
        addMsg(text)
        settext('')} }}/>
      <Button variant="success" className='col-lg-1 col-3' onClick={()=>{
        addMsg(text)
        settext('')
    }}>Send</Button>
    </Stack>
    </div>
    :
    <div>No frnds... pls add some</div>
    }
    </div>
  )
}
