import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Comps/Home'
import { RecoilRoot } from 'recoil';
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_K,
  authDomain: import.meta.env.VITE_D,
  projectId: import.meta.env.VITE_ID,
  storageBucket: import.meta.env.VITE_BUCK,
  messagingSenderId: import.meta.env.VITE_MSID,
  appId: import.meta.env.VITE_AID,
  // databaseURL:import.meta.env.VITE_REALTIMEDB
};

const app = initializeApp(firebaseConfig);
const rdb = getDatabase(app);
const db = getFirestore(app)

function App() {
  return (
    <RecoilRoot>
    <Home />
    </RecoilRoot>
  )
}

export default App
export {app,rdb,db}