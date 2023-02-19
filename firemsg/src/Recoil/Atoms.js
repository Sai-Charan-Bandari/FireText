import {atom} from 'recoil'

let user=atom({
    key:'user',
    default:null
})

export {user}