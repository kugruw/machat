import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCZsRbsosNzWdEB1eJ_PBvhguLKWcrax7s',
  authDomain: 'maps-chat-a0f47.firebaseapp.com',
  databaseURL: 'https://maps-chat-a0f47.firebaseio.com',
  projectId: 'maps-chat-a0f47',
  storageBucket: 'maps-chat-a0f47.appspot.com',
  messagingSenderId: '156860762483',
  appId: '1:156860762483:web:842778cda94378b8641d06',
  measurementId: 'G-FBRT76VV23',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export {firebase};
export default db;
