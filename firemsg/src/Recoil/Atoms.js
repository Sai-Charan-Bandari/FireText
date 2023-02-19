import {atom} from 'recoil'

let user=atom({
    key:'user',
    default:null
})

//actually u dont neeed msgarr as global 
//having frnd obj as gloabal is enough..whenever it changes u can change this arr in messages
let messageArray=atom({
    key:'messageArray',
    default:[]
})

let frnd=atom({
    key:'frnd',
    default:'u2'
})
export {user,messageArray,frnd}