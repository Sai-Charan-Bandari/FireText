import React, { useEffect, useState } from 'react'
import {rdb } from '../App'
import {child, get, onValue, ref, set, update } from "firebase/database";
import { frnd, messageArray, user } from '../Recoil/Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function Messages() {
    let [msgArr,setmsgArr]=useRecoilState(messageArray) 
    let [frndName,setfrndName]=useRecoilState(frnd)
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
        [msgArr.length]:text
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
        <>
    <div>Messages</div>
    {frndName.email!=''
    ?
    <>
    <div>{msgArr.map((e,i)=>
    <div key={i}>{e}</div>
    )}</div>
    <input value={text} onChange={(e)=>settext(e.target.value)}/>
    <button onClick={()=>{
        addMsg(text)
    }}>
    send
    </button>
    </>
    :
    <div>No frnds... pls add some</div>
    }
    </>
  )
}
