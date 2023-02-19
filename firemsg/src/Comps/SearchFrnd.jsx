import React from 'react'
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db,rdb } from '../App';
import { ref, set } from 'firebase/database';
import { useRecoilState, useRecoilValue } from 'recoil';
import { frnd, user } from '../Recoil/Atoms';

export default function SearchFrnd({flist,setflist}) {
  let [frndName,setfrndName]=useRecoilState(frnd)
  const userName=useRecoilValue(user)

  const submitVal=()=>{
    let p=document.getElementsByTagName('input')[0].value
     flist.forEach(element => {
      if(element.email===p){
        //  WE NEED TO OPEN THIS CHAT ...NEEDS TO CHANGE THIS ALERT LATER
        return alert('specified user is already your frnd')
      }
     });
     //it means frnd is not in flist...needs to be added, new chat need to be created with the 2 ids
     //querying and appending flist in state,db
     queryUser(p)
     //now create chat in rdb
     let url = userName.uid > frndName.uid ? userName.uid+frndName.uid : frndName.uid+userName.uid
      set(ref(rdb, `/chats/${url}`), {
        0:'Welcome...'
    });
  }

async function queryUser(p){
  try{
    const Ref = collection(db, "Users");
     const q = query(Ref, where("email", "==", p));
     const querySnapshot = await getDocs(q);
     //this loop executes only once...
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        updateFrndList(doc.id,doc.data())
        
      });
  }catch(e){
    console.log(e)
  }
}

async function updateFrndList(newId,newfrnd){
  console.log("new frnd is ",newfrnd)
  try{
    //appending db frnds list of your NEW FRND
    let Ref2=doc(db, "Users",newId);
    await updateDoc(Ref2, {
      "frnds":arrayUnion({
        email:userName.email,
        uid:userName.uid
      })
    });
    //appending db frnds list OF USER
    let Ref3=doc(db, "Users",userName.uid);
    await updateDoc(Ref3, {
      "frnds":arrayUnion({
        email:newfrnd.email,
        uid:newId
      })
    });
    //appending flist
    setflist([...flist,newfrnd])
  }catch(e){
    console.log(e)
  }
}

  return (
    <>
    <div>SearchFrnd</div>
    <input type={'text'} name='password'/>
    <button onClick={submitVal}>submit</button>
    </>
  )
}
