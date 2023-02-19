import React, { useEffect, useState } from 'react'
import {rdb } from '../App'
import {child, get, onValue, ref, set, update } from "firebase/database";

export default function Messages() {
    let [msgArr,setmsgArr]=useState([])
    let [text,settext]=useState('')
    
// //   READ ONCE AT START
    useEffect(()=>{
    //     let dbref=ref(rdb)
    //     get(child(dbref, `chats/u1andu2`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //           console.log(snapshot.val());
    //         } else {
    //           console.log("No data available");
    //         }
    //       }).catch((error) => {
    //         console.error(error);
    //       });

    // // SNAP
        const sRef = ref(rdb, 'chats/u1andu2');
    onValue(sRef, (snapshot) => {
      const data = snapshot.val();
      setmsgArr(data)
      console.log("updated value using snaps "+data)
    });
    },[])

const writeToDatabase = (text) => {
    // const uuid = 'chats';
    // set(ref(rdb, `/chats/u1andu2`), {
    //     naam:text
    // });
    update(ref(rdb,'/chats/u1andu2'),{
        [msgArr.length]:text
    })
  };

    return (
        <>
    <div>Messages</div>
    <div>{msgArr.map((e,i)=>
    <div key={i}>{e}</div>
    )}</div>
    <input value={text} onChange={(e)=>settext(e.target.value)}/>
    <button onClick={()=>{
        writeToDatabase(text)
    }}>
    send
    </button>
    </>
  )
}
