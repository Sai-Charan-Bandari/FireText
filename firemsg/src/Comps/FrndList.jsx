import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { frnd } from '../Recoil/Atoms'
import SearchFrnd from './SearchFrnd'

export default function FrndList() {
    let [frndName,setfrndName]=useRecoilState(frnd)
let [flist,setflist]=useState(['u2','u3'])

  return (
    <>
    <div>FrndList</div>
    <SearchFrnd />
    <div>{flist.map((e,i)=>
    <button key={i} style={{display:'block'}} onClick={()=>{
        setfrndName(e)
    }}>{e}</button>
    )}</div>
    </>
  )
}
