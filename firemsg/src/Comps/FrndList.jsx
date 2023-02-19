import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { db } from '../App'
import { frnd, user } from '../Recoil/Atoms'
import SearchFrnd from './SearchFrnd'

export default function FrndList() {
    let [frndName,setfrndName]=useRecoilState(frnd)
let [flist,setflist]=useState([])
const userName=useRecoilValue(user)

let getUserData=async()=>{
    const docRef = doc(db, "Users",userName.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        let dataObj=docSnap.data()
      console.log("Document data:", dataObj);
      setflist(dataObj['frnds'])
      //there's a chance that the frnds list is empty...especially for new users
      if(dataObj.frnds.length>0)
      setfrndName(dataObj.frnds[0])
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}
useEffect(()=>{
    if(userName.email!='')
    getUserData()
},[])
  return (
    <>
    <div>FrndList</div>
    <SearchFrnd flist={flist} setflist={setflist} />
    <div>{flist.map((e,i)=>
    <button key={i} style={{display:'block'}} onClick={()=>{
        setfrndName(e)
    }}>{e.email}</button>
    )}</div>
    </>
  )
}
