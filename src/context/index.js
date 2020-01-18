import React, {useState, useEffect} from 'react';
import initialState from './initial-state';
import db, {firebase} from '../config/firebase';

const RootContext = React.createContext();
export const Provider = ({children}) => {
  const [user, setUser] = useState({uid: '', ...initialState.user});
  const [friends, setFriends] = useState(initialState.friends);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        const {displayName} = usr;

        db.ref(`users/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            setUser({uid: displayName, data: val});
          }
        });
        
        db.ref(`friends/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            const friend = {};
            for (const key in val) {
              db.ref(`users/${key}`).on('value', snapshot => {
                friend[key] = snapshot.val()
                setFriends(friend);
              });
            }

          }
        });
      }
    });
  }, []);
  return <RootContext.Provider value={{user, friends}}>{children}</RootContext.Provider>;
};

export default RootContext;
