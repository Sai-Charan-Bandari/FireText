import {atom} from 'recoil'

let user=atom({
    key:'user',
    default:{
        email:'',
        uid:''
    }
})

//actually u dont neeed msgarr as global 
//having frnd obj as gloabal is enough..whenever it changes u can change this arr in messages
let messageArray=atom({
    key:'messageArray',
    default:[]
})

let frnd=atom({
    key:'frnd',
    default:{
        email:'',
        uid:''
    }
})
export {user,messageArray,frnd}