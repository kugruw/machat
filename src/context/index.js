import React, {useState, useEffect} from 'react';
import initialState from './initial-state';
import db, {firebase} from '../config/firebase';

const RootContext = React.createContext();
export const Provider = ({children}) => {
  const [user, setUser] = useState({uid: undefined, ...initialState.user});
  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        const {displayName} = usr;
        db.ref(`users/${displayName}`).on('value', snapshot => {
          setUser({uid: displayName, data: snapshot.val()});
        });
      }
    });
  }, []);
  return <RootContext.Provider value={{user}}>{children}</RootContext.Provider>;
};

export default RootContext;
