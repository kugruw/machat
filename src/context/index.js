import React, {useState, useEffect} from 'react';
import initialState from './initial-state';
import db, {firebase} from '../config/firebase';

const RootContext = React.createContext();
export const Provider = ({children}) => {
  const [user, setUser] = useState({uid: undefined, ...initialState.user});
  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        const uid = usr.uid;
        db.ref(`users/${uid}`).on('value', snapshot => {
          setUser({uid, data: snapshot.val()});
        });
      }
    });
  }, []);
  return <RootContext.Provider value={{user}}>{children}</RootContext.Provider>;
};

export default RootContext;
