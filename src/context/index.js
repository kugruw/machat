import React, {useState, useEffect} from 'react';
import initialState from './initial-state';
import db, {firebase} from '../config/firebase';

const RootContext = React.createContext();
export const Provider = ({children}) => {
  const [user, setUser] = useState({uid: '', ...initialState.user});
  const [friends, setFriends] = useState(initialState.friends);
  const [chats, setChats] = useState(initialState.chats);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(usr => {
      if (usr) {
        const {displayName} = usr;

        // Profile
        db.ref(`users/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            setUser({uid: displayName, data: val});
          }
        });

        // Friends
        db.ref(`friends/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            const friend = {};
            for (const key in val) {
              // Friends profile
              db.ref(`users/${key}`).on('value', snapshot => {
                friend[key] = snapshot.val();
                setFriends(friend);
              });
            }
          }
        });

        db.ref(`chats/${displayName}`).on('value', snapshot => {
          const val = snapshot.val();
          if (val !== null) {
            for (const key in val) {
              db.ref(`messages/${key}`).on('value', snapshot => {
                const chat = {[key]: snapshot.val()};
                setChats(chat);
              });
            }
          }
        });
      }
    });
  }, []);
  return (
    <RootContext.Provider value={{user, friends, chats}}>
      {children}
    </RootContext.Provider>
  );
};

export default RootContext;
